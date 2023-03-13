import axios from 'axios';
import IExchangerResponse from '../interfaces/exchange-response.interface';
import IConversionResponse from '../interfaces/conversion-response.interface';
import IConversionRequest from '../interfaces/conversion-request.interface';

class CurrencyService {
  private from: string;
  private to: string;
  private amout: number;
  private ratesBasedUSD!: Record<string, number>;

  constructor(data: IConversionRequest) {
    this.amout = data.amount;
    this.from = data.from;
    this.to = data.to;
  }

  /**
   * Builds the URL request
   * @returns a request URL as string
   */
  private buildURLRequest(): string {
    return `${process.env.EXCHANGER_BASE_URL}=${process.env.API_ID}`;
  }

  /**
   * Based on USD rate it exchanges the entry amount
   * @returns the exchanged amout
   */
  private exchangeBasedUSD(): number {
    const fromCurrencyRate = this.getCurrencyRate(this.from);
    const toCurrencyRate = this.getCurrencyRate(this.to);
    const value = (this.amout * toCurrencyRate) / fromCurrencyRate;

    return value;
  }

  /**
   * Exchanges the conversion rate
   * @returns returns {@link IConversionResponse} object
   */
  public async rateExchange(): Promise<IConversionResponse> {
    const requestURL = this.buildURLRequest();
    const response = await axios.get(requestURL);

    if (response && response.data) {
      const data: IExchangerResponse = response.data;
      this.ratesBasedUSD = data.rates;

      const exchangedAmount = this.exchangeBasedUSD();

      const conversionResponse: IConversionResponse = {
        from: this.from,
        to: this.to,
        amount: this.amout,
        value: exchangedAmount,
        rate: this.getCurrencyRate(this.to),
      };

      return conversionResponse;
    }

    throw new Error(`Please retry your request`);
  }

  /**
   * Based on a list of currencies placed on {@link this.ratesBasedUSD} and an search
   * currency returns an individual currency rate
   * @param searchVal the searched currency
   * @returns the searched currency rate
   */
  public getCurrencyRate(searchVal: string): number {
    return Number(this.ratesBasedUSD[searchVal]).valueOf();
  }
}

export default CurrencyService;
