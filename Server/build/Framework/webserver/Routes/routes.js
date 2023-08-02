"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("./authRoute"));
const seekerRouter_1 = __importDefault(require("./seekerRouter"));
const recuiterRoute_1 = __importDefault(require("./recuiterRoute"));
const authMiddleware_1 = __importDefault(require("../Middlewares/authMiddleware"));
const chatRoute_1 = __importDefault(require("./chatRoute"));
const messageRoute_1 = __importDefault(require("./messageRoute"));
const routes = (app) => {
    app.use('/api/auth', (0, authRoute_1.default)());
    app.use('/api/recruiter', authMiddleware_1.default, (0, recuiterRoute_1.default)());
    app.use('/api/', (0, seekerRouter_1.default)());
    app.use('/api/chat', (0, chatRoute_1.default)());
    app.use('/api/message', (0, messageRoute_1.default)());
};
exports.default = routes;
