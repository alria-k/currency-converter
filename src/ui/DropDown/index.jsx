import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import useToggle from "../../hooks/useToggle";

const DropDownContainer = styled.div`
  position: relative;
`;
const Btn = styled.button`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
`;
const CurrencyFlag = styled.span`
  width: 45px;
  height: 45px;
  border-radius: 100px;
`;
const MenuContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 10px;
  max-height: 210px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const OptionContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;
const CurrencyOption = styled.li`
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 20px;
  font-weight: 600;
  color: #26278d;
`;

export const DropDown = ({ currencyArr, currentCurrency }) => {
  const [current, setCurrent] = useState(currentCurrency);
  const [isOpen, toggleIsOpen] = useToggle();

  const handleCurrent = (val) => {
    setCurrent(val);
    toggleIsOpen();
  };

  return (
    <DropDownContainer>
      <Btn onClick={toggleIsOpen}>
        <OptionContainer>
          <CurrencyOption>
            <CurrencyFlag
              style={{
                backgroundImage: `url(${current[1]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "70px 70px",
                backgroundPosition: "center",
              }}
            ></CurrencyFlag>
            {current[0]}
          </CurrencyOption>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.293 0.292999L6 4.586L1.707 0.292999L0.292999 1.707L6 7.414L11.707 1.707L10.293 0.292999Z"
              fill="#3C3C3C"
              transform={isOpen ? "rotate(180, 6, 4)" : "rotate(0, 6, 4)"}
            />
          </svg>
        </OptionContainer>
      </Btn>
      {isOpen && (
        <MenuContainer>
          {currencyArr.map(({ code, flag }, index) => (
            <OptionContainer
              key={index}
              onClick={() => handleCurrent([code, flag])}
            >
              <CurrencyOption>
                <CurrencyFlag
                  style={{
                    backgroundImage: `url(${flag})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "50px 50px",
                    backgroundPosition: "center",
                  }}
                ></CurrencyFlag>
                {code}
              </CurrencyOption>
            </OptionContainer>
          ))}
        </MenuContainer>
      )}
    </DropDownContainer>
  );
};
