interface PriceData {
  currency: string;
  amount: number;
  decimals: number;
}

const currencyToLocale: Record<string, string> = {
  USD: "en-US",
  EUR: "fr-FR",
  ARS: "es-AR",
};

const formatPrice = (priceData: PriceData): string => {
  const { currency, amount, decimals } = priceData;
  const locale = currencyToLocale[currency] || "es-AR";

  const options = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  };

  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(amount);
};

export default formatPrice;
