from fastapi import APIRouter, WebSocket, WebSocketDisconnect


router = APIRouter()


# ============================================================
# WEBSOCKET CONNECTION MANAGER
# ============================================================

class ConnectionManager:

    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):

        await websocket.accept()

        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):

        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):

        for connection in self.active_connections:

            try:
                await connection.send_text(message)

            except Exception:
                self.disconnect(connection)


manager = ConnectionManager()


# ============================================================
# ALLOCATION WEBSOCKET
# ============================================================

@router.websocket("/ws/allocations")
async def allocation_websocket(websocket: WebSocket):

    await manager.connect(websocket)

    try:

        while True:

            message = await websocket.receive_text()

            await manager.broadcast(
                f"Allocation Update: {message}"
            )

    except WebSocketDisconnect:

        manager.disconnect(websocket)