"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.patch('/:id', (0, validateRequestHandler_1.default)(user_validation_1.UserValidation.updatedUserZodSchema), user_controller_1.UserController.updateUser);
router.delete('/:id', user_controller_1.UserController.deleteUser);
router.get('/:id', user_controller_1.UserController.getSingleUser);
router.get('/', user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
