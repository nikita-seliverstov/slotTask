import React from "react";
import { keyframes } from "styled-components";
import { symbols } from "../config";
import { ReelElement, CellElement } from "../styles/styled-components";

function SlotMachine({stateOfSpining, positions, symbolCombination}) {
  const redLineIfWin = (line) => stateOfSpining === false && symbolCombination !== undefined  ? symbolCombination[line] !== false && " lineBlink":null
  return (
    <div className="container">
    <div className="slotMachine">
    
      <div className={"redLine-top" + redLineIfWin('top')
    }> </div>
      <div className={"redLine-center" + redLineIfWin('center')}> </div>
      <div className={"redLine-bottom"+ redLineIfWin('bottom')}  > </div>
      
      <div className="row">
       
        {positions !== undefined ? (
          <>
            <Reel
              stateOfSpining={stateOfSpining}
              position={positions.firstReel}
              animationDelay = {0}
            />
            <Reel
              stateOfSpining={stateOfSpining}
              position={positions.secondReel}
              animationDelay = {0.5}
            />
            <Reel
              stateOfSpining={stateOfSpining}
              position={positions.thirdReel}
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
function Reel({position, animationDelay, stateOfSpining}) {
  return (
    <div className="col-4">
      <div className="scene">
        <ReelElement
          rotation={rotateReel(position)}
          animation={
            stateOfSpining === true
              ? createAnimation(position)
              : false
          }
          animationDelay = {animationDelay}
          className={"reel"}
        >
          {symbols.map((symbol, index) => (
            <CellElement index={index} className={"reel__cell"}>
              <img className="slotImages" alt={index} src={symbol.img}></img>
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
      position.center !== false
        ? position.center * -72
        : position.top * -72 + 36
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
          position.center !== false
            ? position.center * -72 - 3600
            : position.top * -72 + 36 - 3600
        }deg);
      }
    `;
  }
}

export default SlotMachine;
