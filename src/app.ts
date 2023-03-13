import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import currencyRoute from './routes/currency.route';

dotenv.config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(`/currency`, currencyRoute);
  }
}

export default new App().express;
