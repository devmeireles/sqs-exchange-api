import { Router } from 'express';
import currencyController from '../controllers/currency.controller';

const currencyRoute = Router();
currencyRoute.post(`/conversion`, currencyController.conversionRate);

export default currencyRoute;
