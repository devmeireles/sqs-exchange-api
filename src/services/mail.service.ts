import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import IConversionResponse from '../interfaces/conversion-response.interface';

class MailService {
  transporter: Transporter<SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: `sandbox.smtp.mailtrap.io`,
      port: 2525,
      auth: {
        user: `141cc982941a58`,
        pass: `6c0e7edefec696`,
      },
    });
  }

  async sendMessage(data: IConversionResponse): Promise<boolean> {
    const subject = `Rate Friend: ${data.from} to ${data.to}`;
    const message = `${data.from} ${data.amount} to ${data.to} is currently ${data.value.toFixed(2)} based on ${
      data.rate
    } rate`;

    const sent = await this.transporter.sendMail({
      to: {
        name: `Client name`,
        address: `client@mail.com`,
      },
      from: {
        name: `Rate Friend`,
        address: `noreply@mail.com`,
      },
      subject,
      text: message,
    });

    return !!sent;
  }
}

export default MailService;
