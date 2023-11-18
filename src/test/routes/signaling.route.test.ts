import { SignalingRoutes } from "../../routes/signaling.route";
import { SignalingController } from "../../controllers/signaling.controller";

describe("SignalingRoutes", () => {
  let wss: any;
  let controller: SignalingController;
  let ws: any;
  let onMessageCallback: any;
  let onCloseCallback: any;

  beforeEach(() => {
    wss = {
      on: jest.fn((event: string, callback: any) => {
        if (event === "connection") {
          callback(ws);
        }
      }),
    };
    controller = new SignalingController();
    jest.spyOn(controller, 'handleJoin');
    jest.spyOn(controller, 'handleLeave');
    jest.spyOn(controller, 'handleMessage');
    ws = {
      on: jest.fn((event: string, callback: any) => {
        if (event === "message") {
          onMessageCallback = callback;
        } else if (event === "close") {
          onCloseCallback = callback;
        }
      }),
      send: jest.fn(),
    };
  });

  it("should handle 'join' message", () => {
    const roomId = "room1";
    const message = JSON.stringify({ type: "join", roomId });
    SignalingRoutes(wss, controller);
    onMessageCallback(message);
    expect(controller.handleJoin).toHaveBeenCalledWith(ws, roomId);
  });

  it("should handle 'leave' message", () => {
    const roomId = "room1";
    const message = JSON.stringify({ type: "leave", roomId });
    SignalingRoutes(wss, controller);
    onMessageCallback(message);
    expect(controller.handleLeave).toHaveBeenCalledWith(ws, roomId);
  });

  it("should handle 'message' message", () => {
    const roomId = "room1";
    const message = JSON.stringify({ type: "message", roomId, data: "Hello" });
    SignalingRoutes(wss, controller);
    onMessageCallback(message);
    expect(controller.handleMessage).toHaveBeenCalledWith(ws, roomId, JSON.parse(message));
  });

  it("should handle unknown message type", () => {
    const message = JSON.stringify({ type: "unknown" });
    SignalingRoutes(wss, controller);
    onMessageCallback(message);
    expect(ws.send).toHaveBeenCalledWith(JSON.stringify({ error: "Unknown type" }));
  });

  it("should handle 'close' event", () => {
    SignalingRoutes(wss, controller);
    onCloseCallback();
    // TODO: Add your assertions here
  });
});