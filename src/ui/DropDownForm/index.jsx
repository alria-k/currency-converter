import { useState, useEffect } from "react";
import styled from "styled-components";

import { DropDown } from "../DropDown";

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
  country = {},
  changeCountry,
  value,
  setValue,
}) => {
  const [clickedCountry, setClickedCountry] = useState(country);

  const handleInput = ({ target }) => {
    const numericValue = target.value.replace(/[^0-9.,]/g, "");
    setValue(numericValue);
  };

  useEffect(() => {
    if (country.index == 99) return changeCountry(clickedCountry);
    changeCountry((prev) => {
      let replacedObj = prev;
      replacedObj[clickedCountry.index] = clickedCountry;
      return replacedObj;
    });
  }, [clickedCountry]);

  return (
    <DropDownFormContainer>
      <DropDown
        currentCountry={clickedCountry}
        settingCurrentCountry={setClickedCountry}
      />
      <div>
        <Input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleInput}
          autoFocus
        />
      </div>
    </DropDownFormContainer>
  );
};
