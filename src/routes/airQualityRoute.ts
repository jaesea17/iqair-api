import express from 'express';
import { getAirQualityIp, getAirQualityGps } from '../controller/airQualityController';

const router = express.Router();

router.get('/ip', getAirQualityIp)
router.get('/gps', getAirQualityGps)

export default router