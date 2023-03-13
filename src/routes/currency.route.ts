import { Router } from 'express';
import currencyController from '../controllers/currency.controller';

const currencyRoute = Router();

currencyRoute.get(`/`, currencyController.index);

export default currencyRoute;
