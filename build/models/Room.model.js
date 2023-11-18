"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
/* The Room class represents a chat room and provides methods for adding and removing clients,
broadcasting messages, and retrieving the room ID. */
const ws_1 = __importDefault(require("ws"));
class Room {
    constructor(roomId) {
        this.roomId = roomId;
        this.clients = [];
    }
    addClient(client) {
        this.clients.push(client);
    }
    removeClient(client) {
        this.clients = this.clients.filter(c => c !== client);
    }
    broadcast(senderId, data) {
        this.clients.forEach(client => {
            if (client.id !== senderId && client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    }
    getRoomId() {
        return this.roomId;
    }
    sendToClient(targetPeerId, data) {
        console.log("enviando mensaje a cliente", targetPeerId, data);
        this.clients.forEach(client => {
            if (client.id === targetPeerId && client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    }
}
exports.Room = Room;
