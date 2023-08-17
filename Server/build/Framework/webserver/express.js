"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const expressConfig = (app) => {
    const corsOptions = {
        origin: ['https://careerlink.cloud', 'https://careerlink.cloud'],
        exposedHeaders: [
            'Cross-Origin-Opener-Policy',
            'Cross-Origin-Resource-Policy',
        ],
    };
    app.use(express_1.default.json());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)(corsOptions));
};
exports.default = expressConfig;
