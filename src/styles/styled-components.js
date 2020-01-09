
import styled, { css } from "styled-components";
export const ReelElement = styled.div`
${props =>
  props.rotation &&
  css`
    animation: ${props.animation};
    animation-duration: ${2 + props.animationDelay}s;
    transform: ${props.rotation};
  `}
`;
export const CellElement = styled.div`
transform: rotateX(${props => props.index * 72}deg) translateZ(137px);
`;