import React, { useState } from "react";
import { Button } from "reactstrap";
import { compose } from "ramda";

import "./App.css";
import "./components/SlotMachine";
import SlotMachine from "./components/SlotMachine";
import {findSymbolNeighbors} from "./helpers/findIndexNeighborsInArray";
import ToggleDebud from "./components/ToggleDebug";
import "react-toggle/style.css"

function App() {
  const [stateOfSpining, setStateOfSpining] = useState(false);
  const activateSpin = () => {
    setStateOfSpining(true);
    setTimeout(() => setStateOfSpining(false), 3000);
  };
  const [positions, setPositions] = useState();
  const [debugMode, setDebugMode] = useState(false);
  const spinRandom = compose(activateSpin,setPositions,symbolPositions,symbolsOnStopLines,winLinesToStopOn);
  const spinFixed = () => {};
  return (
    <div className="App">
      <ToggleDebud setDebugMode={setDebugMode} debugMode={debugMode} />
      
      <SlotMachine stateOfSpining={stateOfSpining} positions={positions}  />
    
      {debugMode === false ? (
        <Button className="btn-lg m-3" onClick={() => spinRandom()} disabled={stateOfSpining} >Spin!🎰</Button>
      ) : (
        <Button className="btn-lg m-3" onClick={() => spinFixed()} disabled={stateOfSpining} >Spin!🎰</Button>
      )}
    </div>
  );
}
//  Get int beetwen 0-1  to decide stop positions for 3 reels
//  0 - stop on a symbol on center line   1 - stop on a symbol on top line
function winLinesToStopOn() {
  const beetween0And1 = () => Math.floor(Math.random() * Math.floor(2));
  const stopLine = () => (beetween0And1() === 0 ? "Center" : "Top");
  return [stopLine(), stopLine(), stopLine()];
}
// Decide which symbol will take stop position on all 3 reels
function symbolsOnStopLines(stopPosition) {
  const beetween0And4 = () => Math.floor(Math.random() * Math.floor(5));
  return {
    firstReelStopPosition: {
      symbolIndex: beetween0And4(),
      line: stopPosition[0]
    },
    secondReelStopPosition: {
      symbolIndex: beetween0And4(),
      line: stopPosition[1]
    },
    thirdReelStopPosition: {
      symbolIndex: beetween0And4(),
      line: stopPosition[2]
    }
  };
}
// Find stop symbol neighbors
//return object with visible symbols on reels
function symbolPositions(stopSymbols) {
  return {
    firstReel: {
      ...findSymbolNeighbors(stopSymbols.firstReelStopPosition)
    },
    secondReel: {
      ...findSymbolNeighbors(stopSymbols.secondReelStopPosition)
    },
    thirdReel: {
      ...findSymbolNeighbors(stopSymbols.thirdReelStopPosition)
    }
  };
}

export default App;
