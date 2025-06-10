import {Router} from 'express';
import fetchWeather from '../middleware/fetchWeather';
import fetchCityImage from '../middleware/fetchCityImage';

const router = Router();

// GET /api/weather/city
router.get('/:city', fetchWeather);
router.get('/:city/image', fetchCityImage); // nova rota para imagem

export default router;