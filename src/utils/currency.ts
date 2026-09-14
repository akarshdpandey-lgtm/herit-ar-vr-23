// Currency formatting and real exchange rates relative to base INR
export const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AED: 'AED ',
  AUD: 'A$',
  CAD: 'C$',
  SGD: 'S$',
  THB: '฿',
};

// Exchange rates benchmark against 1 unit = X INR
export const EXCHANGE_RATES_TO_INR: Record<string, number> = {
  INR: 1.0,
  USD: 86.5,
  EUR: 92.4,
  GBP: 109.8,
  JPY: 0.58,
  AED: 23.55,
  AUD: 56.2,
  CAD: 62.4,
  SGD: 65.1,
  THB: 2.45,
};

export const SUPPORTED_CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'INR (₹ - भारतीय रुपया)' },
  { code: 'USD', symbol: '$', name: 'USD ($ - US Dollar)' },
  { code: 'EUR', symbol: '€', name: 'EUR (€ - Euro)' },
  { code: 'GBP', symbol: '£', name: 'GBP (£ - British Pound)' },
  { code: 'JPY', symbol: '¥', name: 'JPY (¥ - Japanese Yen)' },
  { code: 'AED', symbol: 'AED', name: 'AED (Dirham)' },
  { code: 'AUD', symbol: 'A$', name: 'AUD (A$)' },
  { code: 'CAD', symbol: 'C$', name: 'CAD (C$)' },
];

/**
 * Formats an amount in INR to the user's selected target currency with proper symbol & formatting.
 */
export function formatPrice(amountInINR: number | null | undefined, targetCurrency: string = 'INR'): string {
  if (amountInINR === null || amountInINR === undefined || isNaN(amountInINR)) {
    return '—';
  }

  if (amountInINR === 0) {
    return targetCurrency === 'INR' ? '₹0 (Free)' : '$0 (Free)';
  }

  const curr = targetCurrency.toUpperCase();
  const symbol = CURRENCY_SYMBOLS[curr] || `${curr} `;
  const rate = EXCHANGE_RATES_TO_INR[curr] || 1.0;

  // Convert INR amount into target currency
  const converted = amountInINR / rate;

  if (curr === 'JPY') {
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  }

  if (curr === 'INR') {
    return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }

  // If >= 100 in target currency, round cleanly
  if (converted >= 100) {
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  }

  // Under 100 (e.g. $1.50 or €2.20)
  return `${symbol}${converted.toFixed(converted % 1 === 0 ? 0 : 2)}`;
}

/**
 * Takes any text containing rupee symbols (e.g., "₹50 Indian / ₹1,100 Foreigner" or "₹60 metered")
 * and converts them to the selected currency if currency is not INR.
 */
export function convertTextCurrency(text: string, targetCurrency: string = 'INR'): string {
  if (!text) return '';
  if (targetCurrency === 'INR') return text;

  const curr = targetCurrency.toUpperCase();
  const rate = EXCHANGE_RATES_TO_INR[curr] || 1.0;
  const symbol = CURRENCY_SYMBOLS[curr] || `${curr} `;

  // Regex to match ₹ followed by numbers, e.g. ₹50, ₹1,100, ₹ 50
  return text.replace(/₹\s?([0-9,]+)/g, (match, p1) => {
    const num = parseFloat(p1.replace(/,/g, ''));
    if (isNaN(num)) return match;
    const converted = num / rate;
    if (curr === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    if (converted >= 100) {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(converted % 1 === 0 ? 0 : 2)}`;
  });
}
