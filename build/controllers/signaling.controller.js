"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalingController = void 0;
const Room_model_1 = require("../models/Room.model");
class SignalingController {
    constructor() {
        this.rooms = new Map();
    }
    handleJoin(ws, roomId) {
        if (!this.rooms.has(roomId)) {
            console.log("creando sala", roomId);
            this.rooms.set(roomId, new Room_model_1.Room(roomId));
        }
        const room = this.rooms.get(roomId);
        room?.addClient(ws);
    }
    handleLeave(ws, roomId) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.removeClient(ws);
            if (room.clients.length === 0) {
                this.rooms.delete(roomId);
            }
        }
    }
    handleMessage(ws, roomId, message) {
        const room = this.rooms.get(roomId);
        if (room) {
            const target = message.target;
            const sender = ws.id; // Asignamos el ID en el momento de la conexión
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
        }
        else {
            ws.send(JSON.stringify({ error: 'Room not found or peer not found' }));
        }
    }
}
exports.SignalingController = SignalingController;
