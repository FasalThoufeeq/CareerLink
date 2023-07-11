"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandlingMidlleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.statusCode === 404) {
        res
            .json({ errors: err.status, errorMessage: err.message });
    }
    else {
        res.json({
            status: err.status,
            message: err.message,
        });
    }
};
exports.default = errorHandlingMidlleware;
