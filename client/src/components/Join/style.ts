import styled from "styled-components";

export const StyledContentJoin = styled.article`
  width: 300px;
`;

export const StyledCreateRoom = styled.section`
  width: 100%;
  display: flex;
  gap: 4px;

  input {
    width: 70%;
    padding: 4px 12px;
    border: 1px solid gray;
    border-radius: 3px;
  }

  button {
    width: 30%;
    cursor: pointer;
  }
`;

export const StyledJoinRoom = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;

  div {
    width: 92%;
    padding: 4px 12px;
    border: 1px solid gray;
    border-radius: 3px;
    cursor: pointer;
  }
`;