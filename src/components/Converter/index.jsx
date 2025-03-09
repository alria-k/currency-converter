import styled from "styled-components";

import { DropDownForm } from "../../ui/DropDownForm";

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

// const defaultCountries = [
//   {
//     currency: "USD",
//     flag: "https://flagcdn.com/w160/us.png",
//   },
//   {
//     currency: "EUR",
//     flag: "https://flagcdn.com/w160/eu.png",
//   },
// ];

export const Converter = () => {
  return (
    <CoverterContainer>
      <DropDownForm
        defaultCurrency={["USD", "https://flagcdn.com/w160/us.png"]}
      />
      <DropDownForm
        defaultCurrency={["EUR", "https://flagcdn.com/w160/eu.png"]}
      />
    </CoverterContainer>
  );
};
