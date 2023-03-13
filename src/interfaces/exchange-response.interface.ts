export default interface IExchangerResponse {
  disclaimer: string;
  timestamp: number;
  base: string;
  rates: Record<string, number>;
}
