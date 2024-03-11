export type Country = {
  name: {
    common: string;
    official: string;
  };

  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };

  capital: string[];
  languages: {
    [key: string]: string;
  };
  population: number;
  continents: string[];
  flags: {
    png: string;
    alt: string;
  };
};
