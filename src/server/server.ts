/* The code is setting up an Express server with WebSocket functionality. */
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { SignalingRoutes } from '../routes/signaling.route';
import { SignalingController } from '../controllers/signaling.controller';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const controller = new SignalingController();

SignalingRoutes(wss, controller);


export default server;