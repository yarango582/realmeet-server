import { Room } from "../../models/Room.model";
import { WebSocket } from "ws";

describe("Room", () => {
  let room: Room;
  let clientWS1: any;
  let clientWS2: any;

  beforeEach(() => {
    room = new Room("room1");
    clientWS1 = {};
    clientWS2 = {}
  });

  describe("addClient", () => {
    it("should add a client to the room", () => {
      room.addClient(clientWS1);
      expect(room.clients).toContain(clientWS1);
    });
  });

  describe("removeClient", () => {
    it("should remove a client from the room", () => {
      room.addClient(clientWS1);
      room.addClient(clientWS2);
      room.removeClient(clientWS1);
      expect(room.clients).not.toContain(clientWS1);
      expect(room.clients).toContain(clientWS2);
    });
  });

  describe("broadcast", () => {
    it("should send data to all clients except the sender", () => {
        const mockClient1 = { send: jest.fn(), readyState: WebSocket.OPEN } as unknown as WebSocket;
        const mockClient2 = { send: jest.fn(), readyState: WebSocket.OPEN } as unknown as WebSocket;
        room.addClient(mockClient1 as any);
        room.addClient(mockClient2 as any);
        const sender = mockClient1 as any;
        const data = "Hello, world!";
        room.broadcast(sender, data);
        expect(mockClient1.send).not.toHaveBeenCalledWith(data);
        expect(mockClient2.send).toHaveBeenCalledWith(data);
    });

    it("should not send data to clients with closed connection", () => {
        const mockClient1 = { send: jest.fn(), readyState: WebSocket.OPEN } as unknown as WebSocket;
        const mockClient2 = { send: jest.fn(), readyState: WebSocket.CLOSED } as unknown as WebSocket;
        room.addClient(mockClient1);
        room.addClient(mockClient2);
        const sender = mockClient1;
        const data = "Hello, world!";
        room.broadcast(sender, data);
        expect(mockClient1.send).not.toHaveBeenCalledWith(data);
        expect(mockClient2.send).not.toHaveBeenCalledWith(data);
      expect(mockClient2.send).not.toHaveBeenCalledWith(data);
    });
  });

  describe("getRoomId", () => {
    it("should return the room ID", () => {
      expect(room.getRoomId()).toBe("room1");
    });
  });
});