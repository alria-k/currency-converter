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

const CurrencyConverterContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
`;

const ConverterTitle = styled.h4`
  font-size: 15px;
  color: #989898;
  margin-bottom: 14px;
`;

const ChangeCurrencyLine = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const CurrencyLine = styled.span`
  display: block;
  border: 1px solid #e7e7ee;
  height: 1px;
  width: 100%;
`;

const SwapCurrenciesBtn = styled.button`
  border-radius: 50%;
  background-color: #26278d;
  padding: 12px 15px;
  &:disabled {
    background-color: #000;
    opacity: 25%;
    cursor: not-allowed;
  }
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

  const handleSwap = () => {
    if (countries.length > 1) return;
    setCoutnries((prev) => prev.map(() => ({ ...mainCountry, index: 0 })));
    setMainCountry({ ...countries[0], index: 99 });
  };

  useEffect(() => {
    fetchConversionRate();
  }, [countries, mainCountry]);

  return (
    <CoverterContainer>
      <CurrencyConverterContainer>
        <ConverterTitle>Amount</ConverterTitle>
        <DropDownForm
          country={mainCountry}
          changeCountry={setMainCountry}
          value={
            activeInput == null
              ? inputVal
              : (
                  inputVal / conversionRate[activeInput].conversion_rate
                ).toFixed(2)
          }
          setValue={setInputVal}
          setInput={setActiveInput}
        />
      </CurrencyConverterContainer>
      <ChangeCurrencyLine>
        <CurrencyLine />
        <SwapCurrenciesBtn
          disabled={countriesData.length > 1 ? true : false}
          onClick={handleSwap}
        >
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.22999 13.75C9.22999 14.0214 9.31834 14.2855 9.48168 14.5022C9.64502 14.719 9.87448 14.8767 10.1354 14.9516C10.3963 15.0264 10.6745 15.0143 10.9279 14.917C11.1813 14.8198 11.3961 14.6427 11.54 14.4125L14.9 11.0537C15.016 10.9376 15.1081 10.7998 15.1709 10.648C15.2336 10.4963 15.2659 10.3337 15.2659 10.1696C15.2658 10.0054 15.2334 9.8428 15.1705 9.69114C15.1076 9.53947 15.0155 9.40168 14.8994 9.28562C14.7832 9.16957 14.6454 9.07752 14.4937 9.01475C14.342 8.95197 14.1794 8.91969 14.0152 8.91975C13.851 8.9198 13.6884 8.9522 13.5368 9.01509C13.3851 9.07797 13.2473 9.17011 13.1312 9.28625L11.7312 10.6862V1.25C11.7312 0.918479 11.5995 0.600537 11.3651 0.366117C11.1307 0.131696 10.8128 0 10.4812 0C10.1497 0 9.83178 0.131696 9.59736 0.366117C9.36294 0.600537 9.23124 0.918479 9.23124 1.25V13.6875V13.75H9.22999Z"
              fill="white"
            />
            <path
              d="M6.76999 6.25C6.77 5.97858 6.68165 5.71453 6.51831 5.49775C6.35497 5.28098 6.1255 5.12326 5.8646 5.04844C5.60369 4.97361 5.32552 4.98574 5.07212 5.08299C4.81871 5.18024 4.60385 5.35733 4.45999 5.5875L1.10124 8.94625C0.981857 9.06156 0.886629 9.19949 0.821118 9.352C0.755607 9.5045 0.721124 9.66852 0.719682 9.8345C0.71824 10.0005 0.749867 10.1651 0.812718 10.3187C0.875569 10.4723 0.968385 10.6119 1.08575 10.7292C1.20312 10.8466 1.34268 10.9394 1.4963 11.0023C1.64992 11.0651 1.81452 11.0968 1.9805 11.0953C2.14647 11.0939 2.3105 11.0594 2.463 10.9939C2.61551 10.9284 2.75344 10.8331 2.86874 10.7138L4.26999 9.31375V18.75C4.26999 19.0815 4.40169 19.3995 4.63611 19.6339C4.87053 19.8683 5.18847 20 5.51999 20C5.85151 20 6.16946 19.8683 6.40388 19.6339C6.6383 19.3995 6.76999 19.0815 6.76999 18.75V6.3125V6.25Z"
              fill="white"
            />
          </svg>
        </SwapCurrenciesBtn>
        <CurrencyLine />
      </ChangeCurrencyLine>
      <CurrencyConverterContainer>
        <ConverterTitle>Converted Amount</ConverterTitle>
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
      </CurrencyConverterContainer>
    </CoverterContainer>
  );
};
