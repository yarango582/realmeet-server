/* The Room class represents a chat room and provides methods for adding and removing clients,
broadcasting messages, and retrieving the room ID. */
import WebSocket from 'ws';

export class Room {
  private roomId: string;
  clients: WebSocket[];

  constructor(roomId: string) {
    this.roomId = roomId;
    this.clients = [];
  }

  public addClient(client: WebSocket): void {
    this.clients.push(client);
  }

  public removeClient(client: WebSocket): void {
    this.clients = this.clients.filter(c => c !== client);
  }

  public broadcast(sender: WebSocket, data: string): void {
    this.clients.forEach(client => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  public getRoomId(): string {
    return this.roomId;
  }
}
