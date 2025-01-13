import { StyledXis, StyledCircle } from "./style";

export const PieceXis = () => {
  return (
    <StyledXis> 
      <span className="left-line" />
      <span className="right-line" />
    </StyledXis>
  )
}

export const PieceCircle = () => {
  return <StyledCircle />
}