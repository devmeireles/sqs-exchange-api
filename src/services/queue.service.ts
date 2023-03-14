import { Message, Squiss } from 'squiss-ts';
import IConversionRequest from '../interfaces/conversion-request.interface';
import MailService from './mail.service';
import CurrencyService from './currency.service';

class QueueService extends Squiss {
  constructor() {
    super({
      awsConfig: {
        accessKeyId: `dummy`,
        secretAccessKey: `dummy`,
        region: `dummy`,
        endpoint: `http://sqs:9324`,
      },
      queueName: `exchange-rate`,
      bodyFormat: `json`,
      maxInFlight: 15,
    });
  }

  /**
   * Manages the queue message
   * @param message the message body as {@link Message}
   */
  public async manageExchangeMessages(message: Message): Promise<void> {
    const conversionRequest = message.body as unknown as IConversionRequest;
    const conversionService = new CurrencyService(conversionRequest);
    const conversionResponse = await conversionService.rateExchange();

    if (conversionResponse) {
      const mailer = new MailService();
      const sentMessage = await mailer.sendMessage(conversionResponse);
      if (sentMessage) message.del();
    }
  }
}

export default QueueService;
