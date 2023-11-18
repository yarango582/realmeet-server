"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* The code is setting up an Express server with WebSocket functionality. */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const signaling_route_1 = require("../routes/signaling.route");
const signaling_controller_1 = require("../controllers/signaling.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const controller = new signaling_controller_1.SignalingController();
(0, signaling_route_1.SignalingRoutes)(wss, controller);
exports.default = server;
