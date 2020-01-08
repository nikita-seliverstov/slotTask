import React from "react";
import styled, { css, keyframes } from "styled-components";
import Img3xBAR from "../images/3xBAR.png";
import Img2xBAR from "../images/2xBAR.png";
import ImgBAR from "../images/BAR.png";
import Img7 from "../images/7.png";
import ImgCherry from "../images/Cherry.png";
function SlotMachine(props) {
  return (
    <div className="slotMachine">
      <div className="row">
        <Reel position={props.positions.firstReel} />
        <Reel position={props.positions.secondReel} />
        <Reel position={props.positions.thirdReel} />
      </div>
    </div>
  );
}
function Reel(props) {
  const cells = [
    { name: "3xBAR", img: Img3xBAR },
    { name: "BAR", img: ImgBAR },
    { name: "2xBAR", img: Img2xBAR },
    { name: "7", img: Img7 },
    { name: "Cherry", img: ImgCherry }
  ];
  const Reel = styled.div`
    ${props =>
      props.position &&
      css`
        animation: ${createAnimation(props.position)};
        animation-duration: 2s;
        transform: ${rotateReel(props.position)};
      `}
  `;
  const Cell = styled.div`
    transform: rotateX(${props => props.index * 72}deg) translateZ(138px);
  `;

  return (
    <div className="col-4">
      <div className="scene">
        <Reel  position={props.position} className={"reel"}  >
          {cells.map((cell, index) => (
            <Cell index={index} className={"reel__cell"}>
              <img className="slotImages" alt={index} src={cell.img}></img>
            </Cell>
          ))}
        </Reel>
      </div>
    </div>
  );
}
function rotateReel(position){
  return  `rotateX(${position.centerIndex !== false ? position.centerIndex * -72 : (position.topIndex * -72) + 36 }deg)`;
}



function createAnimation(position) {
 return (keyframes`
      0% {
        transform: rotateX(0deg);
      }
    
      100% {
        transform: rotateX(${position.centerIndex !== false ? (position.centerIndex * -72) - 3600  : ((position.topIndex * -72)  +36) - 360 }deg);
      }
    `)
}

export default SlotMachine;
