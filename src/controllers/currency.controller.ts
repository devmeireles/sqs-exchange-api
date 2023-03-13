import { Request, Response } from 'express';

class CurrencyController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json({
      success: `true`,
      data: `so far so good`,
    });
  }
}

export default new CurrencyController();
