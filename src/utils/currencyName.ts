import { Country } from "@/types/Country";

export const getCurrencyName = (country: Country) => {
  if (country.currencies) {
    const currencyKeys = Object.keys(country.currencies);
    if (currencyKeys.length > 0) {
      const currencyCode = currencyKeys[0];
      return country.currencies[currencyCode]?.name || "";
    }
  }
  return "";
};