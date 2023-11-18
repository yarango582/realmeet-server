/* The SignalingController class manages WebSocket connections and handles joining, leaving, and
broadcasting messages in a room. */
// controllers/signalingController.ts
import WebSocket from 'ws';
import { Room } from '../models/Room.model';

export class SignalingController {
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map();
  }

  public handleJoin(ws: WebSocket, roomId: string): void {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Room(roomId));
    }
    const room = this.rooms.get(roomId);
    room?.addClient(ws);
  }

  public handleLeave(ws: WebSocket, roomId: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.removeClient(ws);
      if (room.clients.length === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  public handleMessage(ws: WebSocket, roomId: string, message: string): void {
    const room = this.rooms.get(roomId);
    room?.broadcast(ws, message);
  }
}
