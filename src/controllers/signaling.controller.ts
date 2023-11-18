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
      console.log("creando sala", roomId);
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

  public handleMessage(ws: WebSocket, roomId: string, message: any): void {
    const room = this.rooms.get(roomId);
    if (room) {
      const target = message.target;
      const sender = (ws as any).id; // Asignamos el ID en el momento de la conexión
      console.log("enviando mensaje", target, sender, message);
      switch (message.type) {
        case 'offer':
        case 'answer':
          // Enviar oferta o respuesta al cliente específico
          room.sendToClient(target, JSON.stringify(message));
          break;
        case 'candidate':
          // Enviar candidatos ICE a todos en la sala excepto al remitente
          room.broadcast(sender, JSON.stringify(message));
          break;
        // Aquí puedes manejar más casos de mensajes como 'leave' o 'disconnect'
      }
    } else {
      ws.send(JSON.stringify({ error: 'Room not found or peer not found' }));
    }
  }
}
