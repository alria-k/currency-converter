import { useState, useEffect } from "react";
import styled from "styled-components";

import { DropDown } from "../DropDown";
import { swapItemsInArray } from "../../utils/helpers";

const DropDownFormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
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
  max-width: 230px;
`;

export const DropDownForm = ({
  country = {},
  setChangeCountry,
  value,
  setValue,
  setInput,
}) => {
  const [clickedCountry, setClickedCountry] = useState(country);

  const handleInput = ({ target }) => {
    const numericValue = target.value.replace(/[^0-9.,]/g, "");
    setValue(numericValue);
    if (country.index == 99) {
      setInput(null);
    } else {
      setInput(country.index);
    }
  };

  useEffect(() => {
    if (country.index == 99) return setChangeCountry(clickedCountry);
    setChangeCountry((prev) => {
      const copyArr = [...prev];
      return copyArr.map((item, index) =>
        index === clickedCountry.index ? clickedCountry : item
      );
    });
  }, [clickedCountry]);

  return (
    <DropDownFormContainer>
      <DropDown
        clickedCountry={clickedCountry}
        setClickedCountry={setClickedCountry}
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
