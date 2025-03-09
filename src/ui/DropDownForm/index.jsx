import { useState, useEffect } from "react";
import styled from "styled-components";

import { DropDown } from "../DropDown";
import { getFlags } from "../../api/currency";

const DropDownFormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 16px;
`;
const Input = styled.input`
  text-align: right;
  outline: none;
  border: none;
  background-color: #efefef;
  padding: 11px 14px;
  border-radius: 7px;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
`;

export const DropDownForm = ({
  defaultCurrency = ["USD", "https://flagcdn.com/w160/us.png"],
}) => {
  const [flags, setFlags] = useState([]);
  const [inputVal, setInputVal] = useState("1000.00");

  const handleInput = ({ target }) => {
    const numericValue = target.value.replace(/[^0-9.,]/g, "");
    setInputVal(numericValue);
  };

  useEffect(() => {
    getFlags().then((data) => {
      setFlags(data);
    });
  }, []);

  return (
    <DropDownFormContainer>
      <DropDown currencyArr={flags} currentCurrency={defaultCurrency} />
      <div>
        <Input
          type="text"
          inputMode="numeric"
          value={inputVal}
          onChange={handleInput}
          autoFocus
        />
      </div>
    </DropDownFormContainer>
  );
};
