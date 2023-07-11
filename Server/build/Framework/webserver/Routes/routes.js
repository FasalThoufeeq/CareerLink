"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("./authRoute"));
const seekerRouter_1 = __importDefault(require("./seekerRouter"));
const recuiterRoute_1 = __importDefault(require("./recuiterRoute"));
const routes = (app) => {
    app.use('/api/auth', (0, authRoute_1.default)());
    app.use('/api/recruiter', (0, recuiterRoute_1.default)());
    app.use('/api/', seekerRouter_1.default);
};
exports.default = routes;
