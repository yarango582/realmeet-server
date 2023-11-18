"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalingRoutes = void 0;
const uuid_1 = require("uuid"); // Asegúrate de instalar la librería 'uuid' para esto
const SignalingRoutes = (wss, controller) => {
    wss.on('connection', (ws) => {
        const uniqueID = (0, uuid_1.v4)(); // Esta función necesita ser implementada para generar un ID único
        console.log("cliente conectado");
        ws.id = uniqueID;
        ws.on('message', (message) => {
            const parsedMessage = JSON.parse(message.toString());
            const { type, roomId } = parsedMessage;
            console.log("mensaje recibido", parsedMessage, type, roomId);
            switch (type) {
                case 'join':
                    controller.handleJoin(ws, roomId);
                    break;
                case 'leave':
                    controller.handleLeave(ws, roomId);
                    break;
                case 'message':
                    controller.handleMessage(ws, roomId, parsedMessage);
                    break;
                default:
                    ws.send(JSON.stringify({ error: 'Unknown type' }));
            }
        });
        ws.on('close', () => {
            // TODO: handle close
        });
    });
};
exports.SignalingRoutes = SignalingRoutes;
