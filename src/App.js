import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { compose } from 'ramda';
import './App.css';
import SlotMachine from './components/SlotMachine';
import { findSymbolNeighbors } from './helpers/findIndexNeighborsInArray';
import ToggleDebud from './components/ToggleDebug';
import Balance from './components/Balance';
import PayTable from './components/PayTable';
import 'react-toggle/style.css';

function App() {
  const [stateOfSpining, setStateOfSpining] = useState(false);
  const activateSpin = () => {
    setStateOfSpining(true);
    setTimeout(() => setStateOfSpining(false), 3000);
  };
  const payForSpin = () => setBalance(balance - 1);
  const setBalanceLimitedTo5000 = number =>
    number <= 5000 && setBalance(number);
  const [positions, setPositions] = useState();
  const [debugMode, setDebugMode] = useState(false);
  const [balance, setBalance] = useState(0);
  const spinRandom = compose(activateSpin, setPositions, symbolPositions, symbolsOnStopLines, winLinesToStopOn, payForSpin);
  const spinFixed = () => {};
  return (
    <div className='App'>
      <Balance  setBalance={setBalanceLimitedTo5000} balance={balance} />
      <PayTable></PayTable>
      <ToggleDebud setDebugMode={setDebugMode} debugMode={debugMode} />
      <SlotMachine stateOfSpining={stateOfSpining} positions={positions} />
      {debugMode === false ? (
        <Button
          className='btn-lg m-3'
          onClick={() =>
            balance !== 0 ? spinRandom() : alert('not enough balance')
          }
          disabled={stateOfSpining}>
          Spin!🎰
        </Button>
      ) : (
        <Button
          className='btn-lg m-3'
          onClick={() =>
            balance !== 0 ? spinFixed() : alert('not enough balance')
          }
          disabled={stateOfSpining}>
          Spin!🎰
        </Button>
      )}
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
