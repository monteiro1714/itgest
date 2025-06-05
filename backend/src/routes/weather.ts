import {Router} from 'express';
import fetchWeather from '../middleware/fetchWeather';

const router = Router();

// GET /api/weather/city
router.get('/:city', fetchWeather);

export default router;