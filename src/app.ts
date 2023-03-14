import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import currencyRoute from './routes/currency.route';
import QueueService from './services/queue.service';
import { Message } from 'squiss-ts';

dotenv.config();

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.setQueue();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(`/currency`, currencyRoute);
  }

  private setQueue(): void {
    const queue = new QueueService();
    queue.start();

    queue.on(`message`, (message: Message) => queue.manageExchangeMessages(message));
  }
}

export default new App().express;
