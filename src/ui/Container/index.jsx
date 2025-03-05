import styled from "styled-components";

const ContainerBox = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 20px 20px;
`;

export const Container = ({ children }) => (
  <ContainerBox>{children}</ContainerBox>
);
