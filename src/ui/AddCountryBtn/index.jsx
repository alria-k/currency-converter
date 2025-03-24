import styled from "styled-components";

import { getRandomCountry } from "../../api/currency";

const AddCountryContainer = styled.div`
  margin: 0 auto;
  max-width: 300px;
  margin-top: 20px;
`;

const AddBtn = styled.button`
  width: 100%;
  border: 3px dashed;
  border-radius: 10px;
  border-color: ${({ $length }) => ($length == 5 ? "#6b7c6a" : "#10d104")};
  color: ${({ $length }) => ($length == 5 ? "#6b7c6a" : "#10d104")};
  cursor: ${({ $length }) => ($length == 5 ? "not-allowed" : "pointer")};
  font-size: 26px;
  background-color: transparent;
`;

export const AddCountryBtn = ({ countries, setCountries }) => {
  const handleAddingCountry = async () => {
    if (countries.length == 5) return;
    const res = await getRandomCountry(countries);
    setCountries((prev) => [...prev, res]);
  };

  return (
    <AddCountryContainer>
      <AddBtn
        onClick={handleAddingCountry}
        title="ADD CURRENCY"
        $length={countries.length}
      >
        +
      </AddBtn>
    </AddCountryContainer>
  );
};
