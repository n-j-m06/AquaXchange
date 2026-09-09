import asyncio
import websockets


async def test():

   uri = "wss://aquaxchange-backend.onrender.com/ws/allocations"

    async with websockets.connect(uri) as websocket:

        print("WebSocket connected!")
        print("Waiting for allocation updates...")

        while True:

            message = await websocket.recv()

            print("REAL-TIME UPDATE:", message)


asyncio.run(test())