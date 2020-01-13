import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { compose } from 'ramda';
import './App.css';
import SlotMachine from './components/SlotMachine';
import { findSymbolNeighbors } from './helpers/findIndexNeighborsInArray';
import ToggleDebud from './components/ToggleDebug';
import Balance from './components/Balance';
import PayTable from './components/PayTable';
import Debug from './components/Debug';
import 'react-toggle/style.css';
import { prop, filter, contains, curry, isEmpty } from 'ramda';
import { symbols, combinations } from './config';

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
  const [fixedPositions, setFixedPositions] = useState();
  const [symbolCombination, setCombinations] = useState();
  const [debugMode, setDebugMode] = useState(false);
  const [balance, setBalance] = useState(0);
  const spinRandom = compose(
    activateSpin,
    setCombinations,
    winCombinations,
    symbolPositions,
    symbolsOnStopLines,
    winLinesToStopOn,
    payForSpin
  );
  const spinFixed = compose(
    activateSpin,
    setCombinations,
    winCombinations,
    symbolPositions
  );
  return (
    <div className='App'>
      <ToggleDebud setDebugMode={setDebugMode} debugMode={debugMode} />
      <Balance setBalance={setBalanceLimitedTo5000} balance={balance} />
      <PayTable
        stateOfSpining={stateOfSpining}
        symbolCombination={symbolCombination}
        setCombinations={setCombinations}
        positions={positions}></PayTable>
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
            balance !== 0
              ? spinFixed(fixedPositions)
              : alert('not enough balance')
          }
          disabled={stateOfSpining}>
          Spin!🎰
        </Button>
      )}
      {debugMode === true && <Debug setFixedPositions={setFixedPositions} />}
    </div>
  );
  //  Get int beetwen 0-2  to decide stop positions for 3 reels
  //  0 - stop on a symbol on top line   1 - stop on a symbol on center line 2-  bottom line
  function winLinesToStopOn() {
    const beetween0And2 = () => Math.floor(Math.random() * Math.floor(3));
    const stopLine = () => {
      let randomValue = beetween0And2();
      console.log(randomValue);
      return randomValue === 0
        ? 'Top'
        : randomValue === 1
        ? 'Center'
        : 'Bottom';
    };
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
    const randmizedPositions = {
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
    setPositions(randmizedPositions);
    return randmizedPositions;
  }
  function winCombinations(positions) {
    const position = [
      positions.firstReel,
      positions.secondReel,
      positions.thirdReel
    ];
    return {
      top: checkforCombinations(position, 'top'),
      center: checkforCombinations(position, 'center'),
      bottom: checkforCombinations(position, 'bottom')
    };
  }
  function checkforCombinations(positions, line) {
    const arrayForCurrentLine = positions.map(x =>
      prop('name', symbols[prop(line, x)])
    );

    const allEqual = arr => arr.every(v => v === arr[0]);
    const everyArrElemContainsObjVal = curry((arr, objVal) =>
      arr.every(elem => contains(elem, objVal.contains))
    );
    const everyPositionContainsObjVal = everyArrElemContainsObjVal(
      arrayForCurrentLine
    );
    const hasNotSameCombination = filter(
      everyPositionContainsObjVal,
      combinations.notSameSymbolsAnyLine
    );
    console.log(hasNotSameCombination);
    if (allEqual(arrayForCurrentLine)) {
      return prop(arrayForCurrentLine[0], combinations.sameSymbolsAnyLine)
        ? {
            name: arrayForCurrentLine[0],
            award: prop(arrayForCurrentLine[0], combinations.sameSymbolsAnyLine)
          }
        : {
            name: arrayForCurrentLine[0],
            award: prop(
              line,
              prop(
                arrayForCurrentLine[0],
                combinations.sameSymbolsLineDependent
              )
            )
          };
    } else if (!isEmpty(hasNotSameCombination)) {
      return hasNotSameCombination;
    } else {
      return false;
    }
  }
}

export default App;
