import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { compose } from 'ramda';
import './App.css';
import './components/SlotMachine';
import SlotMachine from './components/SlotMachine';
function App() {
  const [positions, setPositions] = useState({
    firstReel: {
     topIndex: 1,
     centerIndex: 0,
     bottomIndex: 4
    },
    secondReel: {
      topIndex: 1,
      centerIndex: 0,
      bottomIndex: 4
     },
     thirdReel: {
      topIndex: 1,
      centerIndex: 0,
      bottomIndex: 4
     },
  });
  const spinRandom = compose(setPositions, symbolPositions,symbolsOnStopLines, winLinesToStopOn);
  return (
    <div className='App'>
      <SlotMachine positions={positions} />
      <Button onClick={() => spinRandom()}>Spin!</Button>
    </div>
  );
}
//  Get int beetwen 0-1  to decide stop positions for 3 reels
//  0 - stop on a symbol on center line   1 - stop on a symbol on top line
function winLinesToStopOn() {
  const beetween0And1 = () => Math.floor(Math.random() * Math.floor(2));
  const stopLine = () => (beetween0And1() === 0 ? 'Center' : 'Top');
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

function symbolPositions(stopSymbols) {
    return {firstReel: {
      ...findSymbolNeighbors(stopSymbols.firstReelStopPosition)
    },
    secondReel: {
      ...findSymbolNeighbors(stopSymbols.secondReelStopPosition)
    },
    thirdReel: {
      ...findSymbolNeighbors(stopSymbols.thirdReelStopPosition)
    }
  }
}

function findSymbolNeighbors(position) {
  if (position.symbolIndex === 4) {
    console.log(position.symbolIndex)
    return {
      ...(position.line === 'Center'
        ? { topIndex: 0, bottomIndex: 3, centerIndex: position.symbolIndex }
        : { topIndex: position.symbolIndex, bottomIndex: 3, centerIndex: false })
    };
  }
  if (position.symbolIndex === 0) {
    console.log(position.symbolIndex)
    return {
      ...(position.line === 'Center'
        ? { topIndex: 1, bottomIndex: 4, centerIndex: position.symbolIndex }
        : { topIndex: position.symbolIndex, bottomIndex: 4, centerIndex: false })
    };
  } else {
    console.log(position.symbolIndex)
    return {
      ...(position.line === 'Center'
        ? {
            topIndex: position.symbolIndex + 1,
            bottomIndex: position.symbolIndex - 1,
            centerIndex: position.symbolIndex
          }
        : {
            topIndex: position.symbolIndex,
            bottomIndex: position.symbolIndex - 1,
            centerIndex: false
          })
    };
  }
}

export default App;
