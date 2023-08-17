"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const port = config_1.default.PORT || 3000;
const serverConfig = (server) => {
    const startServer = () => {
        server.listen(port, () => {
            console.log(`server listening on ${port}`);
        });
    };
    return {
        startServer,
    };
};
exports.default = serverConfig;
