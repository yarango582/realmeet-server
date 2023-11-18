import { SignalingController } from "../../controllers/signaling.controller";
import { Room } from "../../models/Room.model";

describe("SignalingController", () => {
  let signalingController: SignalingController;
  let ws: any;

  beforeEach(() => {
    signalingController = new SignalingController();
    ws = {};
  });

  describe("handleJoin", () => {
    it("should create a new room if it does not exist", () => {
      const roomId = "room1";
      signalingController.handleJoin(ws, roomId);
      expect(signalingController["rooms"].has(roomId)).toBe(true);
    });

    it("should add the client to an existing room", () => {
      const roomId = "room1";
      signalingController.handleJoin(ws, roomId);
      signalingController.handleJoin(ws, roomId);
      const room = signalingController["rooms"].get(roomId);
      if (room) {
        expect(room.clients.length).toBe(2);
      } else {
        fail("Room does not exist");
      }
    });
  });

  describe("handleLeave", () => {
    it("should remove the client from the room", () => {
      const roomId = "room1";
      signalingController.handleJoin(ws, roomId);
      signalingController.handleLeave(ws, roomId);
      const room = signalingController["rooms"].get(roomId);
      console.log({ room, rooms: signalingController["rooms"], roomId });
      expect(room).toBeUndefined(); // Check if room is defined
      if (room) {
        expect(room.clients.length).toBe(0);
      }
    });

    it("should delete the room if it becomes empty", () => {
      const roomId = "room1";
      signalingController.handleJoin(ws, roomId);
      signalingController.handleLeave(ws, roomId);
      expect(signalingController["rooms"].has(roomId)).toBe(false);
    });
  });

  describe("handleMessage", () => {
    it("should broadcast the message to all clients in the room", () => {
      const roomId = "room1";
      const message = "Hello, world!";
      const mockBroadcast = jest.fn();
      const room = new Room(roomId); // Create a new instance of the Room class
      room.broadcast = mockBroadcast; // Assign the mockBroadcast function to the broadcast property
      signalingController["rooms"].set(roomId, room);
      signalingController.handleMessage(ws, roomId, message);
      expect(mockBroadcast).toHaveBeenCalledWith(ws, message);
    });
  });
});
