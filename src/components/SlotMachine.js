import React from "react";
import { keyframes } from "styled-components";
import { cells } from "../config";
import { ReelElement, CellElement } from "../styles/styled-components";

/*To do 
bug: with same props: does't revoke animation
*/

function SlotMachine(props) {
  return (
    <div className="container">
    <div className="slotMachine">
      <div className="row">
        {props.positions !== undefined ? (
          <>
            <Reel
              stateOfSpining={props.stateOfSpining}
              position={props.positions.firstReel}
              animationDelay = {0}
            />
            <Reel
              stateOfSpining={props.stateOfSpining}
              position={props.positions.secondReel}
              animationDelay = {0.5}
            />
            <Reel
              stateOfSpining={props.stateOfSpining}
              position={props.positions.thirdReel}
              animationDelay = {1}
            />
          </>
        ) : (
          <>
            <Reel />
            <Reel />
            <Reel />
          </>
        )}
      </div>
    </div>
    </div>
  );
}
function Reel(props) {
  return (
    <div className="col-4">
      <div className="scene">
        <ReelElement
          rotation={rotateReel(props.position)}
          animation={
            props.stateOfSpining === true
              ? createAnimation(props.position)
              : false
          }
          animationDelay = {props.animationDelay}
          className={"reel"}
        >
          {cells.map((cell, index) => (
            <CellElement index={index} className={"reel__cell"}>
              <img className="slotImages" alt={index} src={cell.img}></img>
            </CellElement>
          ))}
        </ReelElement>
      </div>
    </div>
  );
}
function rotateReel(position) {
  if (position !== undefined) {
    return `rotateX(${
      position.centerIndex !== false
        ? position.centerIndex * -72
        : position.topIndex * -72 + 36
    }deg)`;
  }
}

function createAnimation(position) {
  if (position !== undefined) {
    return keyframes`
      0% {
        transform: rotateX(0deg);
      }
    
      100% {
        transform: rotateX(${
          position.centerIndex !== false
            ? position.centerIndex * -72 - 3600
            : position.topIndex * -72 + 36 - 3600
        }deg);
      }
    `;
  }
}

export default SlotMachine;
