import React, { useState } from "react";

//styles
import "./FlipCard.css";
//MUI
import { TextField } from "@mui/material";

//atoms
import Image from "@/components/atoms/image";

//types
import { Country } from "@/types/Country";

//utils
import { getLanguageOf } from "@/utils/languageOf";
import { formatBillions } from "@/utils/formatBillions";
import { getCurrencyName } from "@/utils/currencyName";

interface Props {
  data: Country[];
}

const FlipCard: React.FC<Props> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <>
      <TextField
        label="Find a country"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "10px 10px",
            width: "400px",
            height: "30px",
            color: "rgb(59 130 246 / 50%)",
          },

          ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
            color: "#fff",
          },

          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          ".css-1t812tu-MuiInputBase-input-MuiOutlinedInput-input:focus": {
            color: "#fff",
          },
        }}
      />

      <div className=" mt-10 grid grid-cols-5 gap-5 rounded-md">
        {filteredData.map((country, index) => (
          <div className={`flip-card ${isFlipped ? "flipped" : ""} `} onClick={handleFlip} key={index}>
            <div className="flip-card-inner w-14">
              <Image src={country.flags.png} alt={country.flags.alt} />
              <div className="flip-card-back rounded-md flex flex-col items-center justify-center">
                <text style={{ color: "#29E0A9" }}>
                  Name:{" "}
                  <span className="text-zinc-50">{country.name.official}</span>
                </text>

                <text style={{ color: "#29E0A9" }}>
                  Capital:{" "}
                  <span className="text-zinc-50">{country.capital}</span>
                </text>
                
                <text style={{ color: "#29E0A9" }}>
                  Language:{" "}
                  <span className="text-zinc-50">{getLanguageOf(country)}</span>
                </text>
                
                <text style={{ color: "#29E0A9" }}>
                  Population:{" "}
                  <span className="text-zinc-50">{formatBillions(country.population)}</span>
                </text>
                
                <text style={{ color: "#29E0A9" }}>
                  Continent:{" "}
                  <span className="text-zinc-50">{country.continents}</span>
                </text>
                
                <text style={{ color: "#29E0A9" }}>
                  Coin:{" "}
                  <span className="text-zinc-50">
                    {getCurrencyName(country)}
                  </span>
                </text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FlipCard;
