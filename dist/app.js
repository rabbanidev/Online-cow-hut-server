"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const notFoundHandler_1 = __importDefault(require("./app/middlewares/notFoundHandler"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// cors use
app.use((0, cors_1.default)());
// parser use
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Aplication routes
app.use('/api/v1', routes_1.default);
// Test
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello' });
});
// Global Error Hnadler
app.use(globalErrorHandler_1.default);
// Not Found Handler
app.use(notFoundHandler_1.default);
exports.default = app;
