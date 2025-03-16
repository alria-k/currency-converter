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
  {
    index: 1,
    currency: "KZT",
    flag: "https://flagcdn.com/w160/kz.png",
  },
];

export const Converter = () => {
  const [inputVal, setInputVal] = useState(0);
  const [conversionRate, setConversionRate] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [mainCountry, setMainCountry] = useState(mainCountryData);
  const [countries, setCoutnries] = useState(countriesData);

  async function fetchConversionRate() {
    const res = await Promise.resolve(
      getConversionRate(mainCountry, countries)
    );
    setConversionRate(res);
  }

  const converterLogic = (index) => {
    if (activeInput == null)
      return (inputVal * conversionRate[index].conversion_rate).toFixed(2);
    if (activeInput != index) {
      return (
        (inputVal / conversionRate[activeInput].conversion_rate) *
        conversionRate[index].conversion_rate
      ).toFixed(2);
    } else {
      return inputVal;
    }
  };

  useEffect(() => {
    fetchConversionRate();
  }, [countries, mainCountry]);

  return (
    <CoverterContainer>
      <DropDownForm
        country={mainCountry}
        changeCountry={setMainCountry}
        value={
          activeInput == null
            ? inputVal
            : (inputVal / conversionRate[activeInput].conversion_rate).toFixed(
                2
              )
        }
        setValue={setInputVal}
        setInput={setActiveInput}
      />
      {countries.map((data, index) => (
        <DropDownForm
          key={index}
          country={data}
          changeCountry={setCoutnries}
          value={conversionRate.length ? converterLogic(index) : inputVal}
          setValue={setInputVal}
          setInput={setActiveInput}
        />
      ))}
    </CoverterContainer>
  );
};
