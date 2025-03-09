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

export const Converter = () => {
  return (
    <CoverterContainer>
      <DropDownForm />
      <DropDownForm
        defaultCurrency={["EUR", "https://flagcdn.com/w160/eu.png"]}
      />
    </CoverterContainer>
  );
};
