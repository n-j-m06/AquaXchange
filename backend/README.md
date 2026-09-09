# AquaXchange Backend

### Smarter Water. Smarter Decisions.

The AquaXchange backend is a FastAPI-based REST API that powers the application's authentication, water resource management, water demand management, dashboard statistics, and AI-assisted water allocation recommendations.

It acts as the core application layer between the AquaXchange frontend and the PostgreSQL database.

---

## 🚀 Overview

The backend provides APIs for managing and analyzing water resources across different demand sectors.

The main responsibilities of the backend are:

- User registration and authentication
- JWT-based login
- Water source management
- Water request management
- Dashboard statistics
- AI-powered water source recommendations
- Water allocation management
- Water passport management
- Database interaction through SQLAlchemy

---

# 🏗️ Backend Architecture

```text
                    ┌──────────────────────┐
                    │   Next.js Frontend   │
                    └──────────┬───────────┘
                               │
                         REST API / HTTP
                               │
                               ▼
                    ┌──────────────────────┐
                    │       FastAPI        │
                    │      main.py         │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       Authentication    Water Management    AI Services
             │                 │                 │
             ▼                 ▼                 ▼
          Users         Sources / Requests   Recommendation
             │                 │                 Engine
             └─────────────────┼─────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      SQLAlchemy      │
                    │         ORM          │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ PostgreSQL / Neon DB  │
                    └──────────────────────┘