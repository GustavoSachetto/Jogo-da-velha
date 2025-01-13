import styled from "styled-components";

export const StyledGame = styled.article`
  gap: 8px;
  display: grid;
  grid-auto-rows: 130px;
  grid-template-columns: repeat(3, 130px);
  background: #000000;
`;

export const StyledPosition = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  cursor: pointer;
`;

export const StyledGameOptions = styled.div`
  display: flex;
  margin-top: 24px;
  gap: 8px;

  button {
    cursor: pointer;
  }
`;