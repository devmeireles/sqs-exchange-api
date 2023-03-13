import { Request, Response } from 'express';
import CurrencyService from '../services/currency.service';
import IConversionRequest from '../interfaces/conversion-request.interface';

class CurrencyController {
  public async conversionRate(req: Request, res: Response): Promise<Response> {
    try {
      const conversionRequest: IConversionRequest = req.body;
      const conversionService = new CurrencyService(conversionRequest);
      const conversionResponse = await conversionService.rateExchange();

      return res.json({
        success: true,
        data: conversionResponse,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }
}

export default new CurrencyController();
