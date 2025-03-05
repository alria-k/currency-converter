import styled from "styled-components";

import { TitleColor, DiscrColor } from "../../utils/variables";

const HeaderBox = styled.div`
  margin: 50px 0 41px 0;
  text-align: center;
`;

const Title = styled.h1`
  color: ${TitleColor};
  margin-bottom: 10px;
  font-size: 50px;
`;

const Discr = styled.p`
  color: ${DiscrColor};
  font-size: 32px;
`;

export const Header = () => {
  return (
    <HeaderBox>
      <Title>Currency Converter</Title>
      <Discr>
        Check live rates, set rate alerts, receive notifications and more.
      </Discr>
    </HeaderBox>
  );
};
