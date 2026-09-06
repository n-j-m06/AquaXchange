from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import (
    OAuth2PasswordRequestForm,
    OAuth2PasswordBearer
)
from jose import jwt, JWTError
from pwdlib import PasswordHash
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ============================================================
# PASSWORD HASHING
# ============================================================

password_hash = PasswordHash.recommended()


# ============================================================
# JWT SETTINGS
# ============================================================

SECRET_KEY = "aquaxchange-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ============================================================
# OAUTH2
# ============================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


# ============================================================
# REGISTER SCHEMA
# ============================================================

class RegisterRequest(BaseModel):

    name: str
    email: EmailStr
    password: str
    role: str
    organization: str | None = None
    phone: str | None = None


# ============================================================
# REGISTER USER
# ============================================================

@router.post("/register")
def register_user(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):

    # Check whether email already exists
    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Allowed roles
    allowed_roles = [
        "FARMER",
        "INDUSTRY",
        "MUNICIPALITY",
        "GOVERNMENT"
    ]

    role = data.role.upper()

    if role not in allowed_roles:
        raise HTTPException(
            status_code=400,
            detail="Invalid role"
        )

    # Hash password
    hashed_password = password_hash.hash(
        data.password
    )

    # Create user
    user = User(
        name=data.name,
        email=data.email,
        password_hash=hashed_password,
        role=role,
        organization=data.organization,
        phone=data.phone
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User registered successfully",
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }


# ============================================================
# LOGIN
# ============================================================

@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # Find user using email
    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify password
    if not password_hash.verify(
        form_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Token expiration
    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # JWT payload
    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
        "exp": expire
    }

    # Create JWT
    access_token = jwt.encode(
        token_data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role
    }


# ============================================================
# GET CURRENT USER FROM JWT
# ============================================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    # Decode JWT
    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    # Find user in database
    user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


# ============================================================
# GET CURRENT USER
# ============================================================

@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "user_id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "organization": current_user.organization,
        "phone": current_user.phone
    }


# ============================================================
# GOVERNMENT ROLE CHECK
# ============================================================

def require_government(
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "GOVERNMENT":

        raise HTTPException(
            status_code=403,
            detail="Government access required"
        )

    return current_user