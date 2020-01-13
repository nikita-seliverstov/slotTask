import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { compose } from 'ramda';
import 'react-toggle/style.css';
import './App.css';
import ToggleDebud from './components/ToggleDebug';
import Balance from './components/Balance';
import SlotMachine from './components/SlotMachine';
import PayTable from './components/PayTable';
import Debug from './components/Debug';
import { findSymbolNeighbors } from './helpers/findIndexNeighborsInArray';
import { checkforCombinations } from './helpers/checkForCombinatios';
import { symbols } from './config';

function App() {
  const [stateOfSpining, setStateOfSpining] = useState(false);
  const [positions, setPositions] = useState();
  const [fixedPositions, setFixedPositions] = useState();
  const [symbolCombination, setCombinations] = useState();
  const [debugMode, setDebugMode] = useState(false);
  const [balance, setBalance] = useState(0);
  const payForSpin = x => {
    setBalance(balance - 1);
    return x;
  };
  const setBalanceLimitedTo5000 = number =>
    number >= 0
      ? number <= 5000
        ? setBalance(number)
        : setBalance(5000)
      : null;
 
  function giveAward(awards) {
    const PriceForSpin = 1;
    const TopLineAward = awards.top.award ? awards.top.award : 0;
    const CenterLineAward = awards.center.award ? awards.center.award : 0;
    const BottomLineAward = awards.bottom.award ? awards.bottom.award : 0;
    const LineAwardCombined =
      Number(TopLineAward) + Number(CenterLineAward) + Number(BottomLineAward);
    console.log(LineAwardCombined);
    setBalanceLimitedTo5000(
      LineAwardCombined + Number(balance) - Number(PriceForSpin)
    );
  }
  const spinRandom = compose(
    activateSpin,
    winCombinations,
    symbolPositions,
    symbolsOnStopLines,
    winLinesToStopOn,
    payForSpin
  );
  const spinFixed = compose(
    activateSpin,
    winCombinations,
    symbolPositions,
    payForSpin
  );

  return (
    <div className='App'>
      <ToggleDebud setDebugMode={setDebugMode} debugMode={debugMode} />
      <Balance
        symbolCombination={symbolCombination}
        setBalance={setBalanceLimitedTo5000}
        balance={balance}
      />
      <PayTable
        stateOfSpining={stateOfSpining}
        symbolCombination={symbolCombination}
        setCombinations={setCombinations}
        positions={positions}></PayTable>
      <SlotMachine
        stateOfSpining={stateOfSpining}
        positions={positions}
        symbolCombination={symbolCombination}
      />
      {debugMode === false ? (
        <Button
          className='btn-lg m-3'
          onClick={() =>
            balance !== 0 ? spinRandom() : alert('not enough balance')
          }
          disabled={stateOfSpining}>
          Spin!
          <span role='img' aria-label='slot-machine'>
            🎰
          </span>
        </Button>
      ) : (
        <Button
          className='btn-lg m-3'
          onClick={() =>
            balance !== 0
              ? fixedPositions
                ? spinFixed(fixedPositions)
                : alert('set position')
              : alert('not enough balance')
          }
          disabled={stateOfSpining}>
          Spin!
          <span role='img' aria-label='slot-machine'>
            🎰
          </span>
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
    const randomSymbolIndex = () => Math.floor(Math.random() * Math.floor(symbols.length));
    return {
      firstReelStopPosition: {
        symbolIndex: randomSymbolIndex(),
        line: stopPosition[0]
      },
      secondReelStopPosition: {
        symbolIndex: randomSymbolIndex(),
        line: stopPosition[1]
      },
      thirdReelStopPosition: {
        symbolIndex: randomSymbolIndex(),
        line: stopPosition[2]
      }
    };
  }
  // Find stop symbol neighbors
  //return object with visible symbols on reels
  function symbolPositions(stopSymbols) {
    const Positions = {
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
    setPositions(Positions);
    return Positions;
  }
  // Returns obj win combinations on lines if exist or return false
  function winCombinations(positions) {
    const position = [
      positions.firstReel,
      positions.secondReel,
      positions.thirdReel
    ];
    const combinations = {
      top: checkforCombinations(position, 'top'),
      center: checkforCombinations(position, 'center'),
      bottom: checkforCombinations(position, 'bottom')
    };
    setCombinations(combinations);
    return combinations;
  }
  function activateSpin(awards)  {
    setStateOfSpining(true);
    setTimeout(() => {
      setStateOfSpining(false);
      giveAward(awards);
    }, 3000);
  };
}


export default App;
