import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import useToggle from "../../hooks/useToggle";
import { getFlags } from "../../api/currency";

const DropDownContainer = styled.div`
  position: relative;
  max-width: 120px;
  width: 100%;
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
  top: 45px;
  left: -10px;
  max-height: 175px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 1;
  background: #fff;
  padding: 10px 20px 0 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
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

export const DropDown = ({ clickedCountry, setClickedCountry }) => {
  const [flags, setFlags] = useState([]);
  const [isOpen, toggleIsOpen] = useToggle();
  const dropDownRef = useRef(null);

  async function fetchFlags() {
    const res = await Promise.resolve(getFlags());
    setFlags(res);
  }

  const handleCurrent = (data) => {
    setClickedCountry({
      index: clickedCountry.index,
      country_id: data.country_id,
      currency: data.code,
      flag: data.flag,
    });
    toggleIsOpen();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        toggleIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleIsOpen]);

  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <DropDownContainer ref={dropDownRef}>
      <Btn onClick={toggleIsOpen}>
        <OptionContainer>
          <CurrencyOption>
            <CurrencyFlag
              style={{
                backgroundImage: `url(${clickedCountry.flag})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></CurrencyFlag>
            {clickedCountry.currency}
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
          {flags.map((data, index) => (
            <OptionContainer key={index} onClick={() => handleCurrent(data)}>
              <CurrencyOption>
                <CurrencyFlag
                  style={{
                    backgroundImage: `url(${data.flag})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></CurrencyFlag>
                {data.code}
              </CurrencyOption>
            </OptionContainer>
          ))}
        </MenuContainer>
      )}
    </DropDownContainer>
  );
};
