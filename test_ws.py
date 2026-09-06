import asyncio
import websockets


async def test():

    uri = "ws://127.0.0.1:8000/ws/allocations"

    async with websockets.connect(uri) as websocket:

        print("WebSocket connected!")
        print("Waiting for allocation updates...")

        while True:

            message = await websocket.recv()

            print("REAL-TIME UPDATE:", message)


asyncio.run(test())