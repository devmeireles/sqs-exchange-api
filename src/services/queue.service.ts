import { Squiss } from 'squiss-ts';

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
}

export default QueueService;
