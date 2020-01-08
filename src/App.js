import React, { useState } from "react";
import { Button } from "reactstrap";
import { compose } from 'ramda';
import "./App.css";
import "./components/SlotMachine";
import SlotMachine from "./components/SlotMachine";
function App() {
  const [positions, setPositions] = useState({
    firstReel: {
      stopSymbolIndex: 0,
      line: "Center"
    },
    secondReel: {
      stopSymbolIndex: 0,
      line: "Center"
    },
    thirdReel: {
      stopSymbolIndex: 0,
      line: "Center"
    }
  });
  const spinRandom = compose(setPositions, symbolsOnWinLines, winLinesToStopOn);
  return (
    <div className="App">
      <SlotMachine positions={positions} />
      <Button onClick={() => spinRandom()}>Spin!</Button>
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
function symbolsOnWinLines(stopPosition) {
  const beetween0And4 =  () => Math.floor(Math.random() * Math.floor(5));
  return { 
    firstReel: {
      stopSymbolIndex: beetween0And4(),
      line: stopPosition[0]
    },
    secondReel: {
      stopSymbolIndex: beetween0And4(),
      line: stopPosition[1]
    },
    thirdReel: {
      stopSymbolIndex: beetween0And4(),
      line: stopPosition[2]
    }
  }
}

export default App;
