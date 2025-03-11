import { useState, useEffect } from "react";
import styled from "styled-components";

import { DropDownForm } from "../../ui/DropDownForm";
import { getConversionRate } from "../../api/currency";

const CoverterContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  -webkit-box-shadow: 21px 23px 42px -20px rgba(66, 68, 90, 1);
  -moz-box-shadow: 21px 23px 42px -20px rgba(66, 68, 90, 1);
  box-shadow: 21px 23px 42px -20px rgba(66, 68, 90, 1);
`;

let mainCountryData = {
  index: 99,
  currency: "USD",
  flag: "https://flagcdn.com/w160/us.png",
};

let countriesData = [
  {
    index: 0,
    currency: "EUR",
    flag: "https://flagcdn.com/w160/eu.png",
  },
];

export const Converter = () => {
  const [conversionRate, setConversionRate] = useState({});
  const [mainCountry, setMainCountry] = useState(mainCountryData);
  const [countries, setCoutnries] = useState(countriesData);

  useEffect(() => {
    getConversionRate(mainCountryData, countriesData).then((data) =>
      setConversionRate(data)
    );
  }, [countries]);

  return (
    <CoverterContainer>
      <DropDownForm country={mainCountry} changeCountry={setMainCountry} />
      {countries.map((data, index) => (
        <DropDownForm key={index} country={data} changeCountry={setCoutnries} />
      ))}
    </CoverterContainer>
  );
};
