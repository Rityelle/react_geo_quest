import { Country } from "@/types/Country";

export const getLanguageOf = (country: Country) => {
    if(country.languages){
        const languageKey = Object.keys(country.languages);
        if(languageKey.length > 0 ){
            const language = languageKey[0];
            return country.languages[language] || "";
        }
    }
  }