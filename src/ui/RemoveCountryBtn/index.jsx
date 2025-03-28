import styled from "styled-components";

const RemoveButton = styled.button`
  border: none;
  border-radius: 100%;
  padding: 1px 7px 2px 7px;
  font-size: 36px;
  line-height: 24px;
  color: #fff;
  background-color: #ff0000;
`;

export const RemoveCountryBtn = ({ country, setCountries, setInput }) => {
  const handleRemoveBtn = () => {
    setInput(null);
    setCountries((prev) => {
      return prev
        .map((data) => {
          if (country.index === data.index) return null;
          if (country.index < data.index)
            return { ...data, index: data.index - 1 };
          return data;
        })
        .filter((data) => data !== null);
    });
  };

  return <RemoveButton onClick={handleRemoveBtn}>-</RemoveButton>;
};
