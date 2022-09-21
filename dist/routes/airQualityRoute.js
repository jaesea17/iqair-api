"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const airQualityController_1 = require("../controller/airQualityController");
const router = express_1.default.Router();
router.get('/ip', airQualityController_1.getAirQualityIp);
router.get('/gps', airQualityController_1.getAirQualityGps);
exports.default = router;
