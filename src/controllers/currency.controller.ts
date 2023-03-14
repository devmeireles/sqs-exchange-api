import { Request, Response } from 'express';
import IConversionRequest from '../interfaces/conversion-request.interface';
import QueueService from '../services/queue.service';

class CurrencyController {
  public async conversionRate(req: Request, res: Response): Promise<Response> {
    try {
      const conversionRequest: IConversionRequest = req.body;

      const queue = new QueueService();
      queue.sendMessage(conversionRequest);

      return res.status(201).json({
        success: true,
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
