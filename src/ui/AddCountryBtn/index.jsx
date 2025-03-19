import styled from "styled-components";

import { getRandomCountry } from "../../api/currency";

const AddCountryContainer = styled.div`
  margin: 0 auto;
  max-width: 300px;
  margin-top: 20px;
`;

const AddBtn = styled.button`
  width: 100%;
  border: 3px dashed #10d104;
  border-radius: 10px;
  color: #10d104;
  font-size: 26px;
  background-color: transparent;
`;

export const AddCountryBtn = ({ countries, setCoutnries }) => {
  const handleAddingCountry = async () => {
    if (countries.length == 5) return;

    const res = await getRandomCountry(countries);
    setCoutnries((prev) => [...prev, res]);
  };

  return (
    <AddCountryContainer>
      <AddBtn onClick={handleAddingCountry} title="ADD CURRENCY">
        +
      </AddBtn>
    </AddCountryContainer>
  );
};
