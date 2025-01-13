import { styled } from "styled-components";
  
let colorXis = "#00a2e8";
let colorCircle = "#ec3f44";

export const StyledXis = styled.span`
  display: flex;
  position: relative;

  span {
    position: absolute;
    height: 125px;
    width: 8px;
    top: -60px;
    left: -3px;
    background: ${colorXis};
  }

  span.left-line {
    rotate: -45deg;
  }

  span.right-line {
    rotate: 45deg;
  }
`;

export const StyledCircle = styled.span`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 8px solid ${colorCircle};
`;