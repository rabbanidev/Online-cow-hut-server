"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequestHandler_1.default)(user_validation_1.UserValidation.createUserZodSchema), auth_controller_1.AuthController.signup);
exports.AuthRoutes = router;
