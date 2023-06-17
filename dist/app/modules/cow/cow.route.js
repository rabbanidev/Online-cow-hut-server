"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const validateRequestHandler_1 = __importDefault(require("../../middlewares/validateRequestHandler"));
const cow_validation_1 = require("./cow.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestHandler_1.default)(cow_validation_1.CowValidation.createCowZodSchema), cow_controller_1.CowController.createCow);
router.patch('/:id', (0, validateRequestHandler_1.default)(cow_validation_1.CowValidation.updateCowZodSchema), cow_controller_1.CowController.updateCow);
router.delete('/:id', cow_controller_1.CowController.deleteCow);
router.get('/:id', cow_controller_1.CowController.getSingleCow);
router.get('/', cow_controller_1.CowController.getAllCows);
exports.CowRoutes = router;
