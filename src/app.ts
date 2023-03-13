import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Message } from 'squiss-ts';

import currencyRoute from './routes/currency.route';
import QueueService from './services/queue.service';
import MailService from './services/mail.service';
import IConversionResponse from './interfaces/conversion-response.interface';

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
    const mailer = new MailService();
    queue.start();

    queue.on(`message`, async (message: Message) => {
      await mailer.sendMessage(message.body as unknown as IConversionResponse);
      message.del();
    });
  }
}

export default new App().express;
