"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./Framework/webserver/server"));
const express_2 = __importDefault(require("./Framework/webserver/express"));
const Connection_1 = __importDefault(require("./Framework/Database/MongoDB/Connection"));
const routes_1 = __importDefault(require("./Framework/webserver/Routes/routes"));
const ErrorHandlingMiddleware_1 = __importDefault(require("./Framework/webserver/Middlewares/ErrorHandlingMiddleware"));
const AppError_1 = __importDefault(require("./Utils/AppError"));
const socket_1 = __importDefault(require("./Framework/webSocket/socket"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, socket_1.default)(io);
(0, express_2.default)(app);
(0, routes_1.default)(app);
(0, Connection_1.default)();
app.use(ErrorHandlingMiddleware_1.default);
app.all("*", (req, res, next) => {
    next(new AppError_1.default("Not found", 404));
});
(0, server_1.default)(server).startServer();
