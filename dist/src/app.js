"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const users_1 = __importDefault(require("./routes/users"));
const middleware_1 = require("./middleware");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(users_1.default);
    // error handling
    app.use(middleware_1.notFoundMiddleware);
    app.use(middleware_1.errorHandlerMiddleware);
    return app;
};
exports.default = createApp;
