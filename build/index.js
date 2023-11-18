"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* The code is importing the `AddressInfo` type from the `net` module and the `server` object from the
`./server/server` file. */
const dotenv_1 = require("dotenv");
const server_1 = __importDefault(require("./server/server"));
(0, dotenv_1.config)();
server_1.default.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at ${process.env.PORT || 3000}`);
});
