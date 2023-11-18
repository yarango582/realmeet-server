/**
 * The SignalingRoutes function handles WebSocket connections and routes incoming messages to the
 * appropriate controller methods based on the message type.
 * @param {WebSocketServer} wss - The parameter `wss` is an instance of the `WebSocketServer` class
 * from the 'ws' library. It represents the WebSocket server that handles incoming connections and
 * messages.
 * @param {SignalingController} controller - The `controller` parameter is an instance of the
 * `SignalingController` class. It is responsible for handling various signaling events such as joining
 * a room, leaving a room, and sending messages within a room.
 */
import { WebSocketServer } from 'ws';
import { SignalingController } from '../controllers/signaling.controller';

export const SignalingRoutes = (wss: WebSocketServer, controller: SignalingController): void => {
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      const parsedMessage = JSON.parse(message.toString());
      const { type, roomId } = parsedMessage;

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
