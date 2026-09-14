// Exchange rate engine with real benchmark rates against INR
const EXCHANGE_RATES_TO_INR: Record<string, number> = {
  INR: 1.0,
  USD: 86.5,
  EUR: 92.4,
  GBP: 109.8,
  JPY: 0.58,
  AED: 23.55,
  AUD: 56.2,
  CAD: 62.4,
  SGD: 65.1,
  THB: 2.45
};

export const currencyService = {
  getRates(): Record<string, number> {
    return EXCHANGE_RATES_TO_INR;
  },

  convert(amount: number, fromCurrency: string, toCurrency: string): { convertedAmount: number; rate: number; timestamp: string } {
    const fromRate = EXCHANGE_RATES_TO_INR[fromCurrency.toUpperCase()] || 1.0;
    const toRate = EXCHANGE_RATES_TO_INR[toCurrency.toUpperCase()] || 1.0;

    // Convert from -> INR -> to
    const amountInINR = amount * fromRate;
    const finalAmount = amountInINR / toRate;
    const effectiveRate = fromRate / toRate;

    return {
      convertedAmount: Math.round(finalAmount * 100) / 100,
      rate: Math.round(effectiveRate * 10000) / 10000,
      timestamp: new Date().toISOString(),
    };
  }
};
