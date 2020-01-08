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
        <Reel animation={props.keyframeAnimation} />
        <Reel />
        <Reel />
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
      props.animation &&
      css`
        animation: ${props.animation};
        animation-duration: 2s;
        transform: rotateX(-288deg);
      `}
  `;
  const Cell = styled.div`
    transform: rotateX(${props => props.index * 72}deg) translateZ(138px);
  `;

  return (
    <div className="col-4">
      <div className="scene">
        <Reel animation={props.animation} className={"reel"}>
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

function getNeigborths(position){
    if(position.type === 'Center') {
        if(position.index === 4) {
          return  {topIndex: 0,
           bottomIndex: 3}
        }
        if(position.index === 0) {
            return {topIndex: 0,
                bottomIndex: 3}
             }
        }
        else {
            return {topIndex: position.index + 1,
                bottomIndex: position.index - 1 }
        }
    }


function createAnimation(position) {
  setAnimation(keyframes`
      0% {
        transform: rotateX(0deg);
      }
    
      100% {
        transform: rotateX(-288deg);
      }
    `);
}

export default SlotMachine;
