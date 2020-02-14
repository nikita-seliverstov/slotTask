import React, { useState } from 'react';
import { compose } from 'ramda';
import 'react-toggle/style.css';
import './App.css';
import ToggleDebud from './components/ToggleDebug';
import Balance from './components/Balance';
import SlotMachine from './components/SlotMachine';
import PayTable from './components/PayTable';
import Debug from './components/Debug';
import SpinButton from './components/SpinButton';
import { findSymbolNeighbors } from './helpers/findIndexNeighborsInArray';
import { checkforCombinations } from './helpers/checkForCombinatios';
import { symbols, balanceLimit, pricePerSpin } from './config';

function App() {
  const [stateOfSpining, setStateOfSpining] = useState(false);
  const [positions, setPositions] = useState();
  const [fixedPositions, setFixedPositions] = useState();
  const [symbolCombination, setCombinations] = useState();
  const [debugMode, setDebugMode] = useState(false);
  const [balance, setBalance] = useState(0);
  const setBalanceLimited = (n : number) =>
    n < balanceLimit ? setBalance(n) : setBalance(balanceLimit);
  const spinRandom = compose(activateSpin, winCombinations, symbolPositions, symbolsOnStopLines, winLinesToStopOn, payForSpin);
  const spinFixed = compose(activateSpin, winCombinations, symbolPositions, payForSpin);
  return (
    <div className='App'>
      <ToggleDebud setDebugMode={setDebugMode} debugMode={debugMode} />
      <Balance
        symbolCombination={symbolCombination}
        setBalance={setBalanceLimited}
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
      <SpinButton
        balance={balance}
        debugMode={debugMode}
        spinRandom={spinRandom}
        spinFixed={spinFixed}
        fixedPositions={fixedPositions}
        stateOfSpining={stateOfSpining}
      />
      <Debug debugMode={debugMode} setFixedPositions={setFixedPositions} />
    </div>
  );
  // update balance accordint to pricePerSpin and if param was sended to composition -> pass it to next function
  function payForSpin(x) {
    setBalance(balance - pricePerSpin);
    return x;
  }
  //  Get int beetwen 0-2  to decide stop positions for 3 reels
  //  0 - stop on a symbol on top line   1 - stop on a symbol on center line 2-  bottom line
  function winLinesToStopOn() {
    const beetween0And2 = () => Math.floor(Math.random() * Math.floor(3));
    const lines = ['top', 'center', 'bottom'];
    return [
      lines[beetween0And2()],
      lines[beetween0And2()],
      lines[beetween0And2()]
    ];
  }
  // Decide which symbol will take stop position on all 3 reels
  function symbolsOnStopLines(stopPosition) {
    const randomSymbolIndex = () =>
      Math.floor(Math.random() * Math.floor(symbols.length));
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
  // sets spining state for animation duration and after update balance with award
  function activateSpin(awards) {
    setStateOfSpining(true);
    setTimeout(() => {
      setStateOfSpining(false);
      giveAward(awards);
    }, 3000);
  }
  function giveAward(awards) {
    const PriceForSpin = 1;
    const TopLineAward = awards.top.award ? awards.top.award : 0;
    const CenterLineAward = awards.center.award ? awards.center.award : 0;
    const BottomLineAward = awards.bottom.award ? awards.bottom.award : 0;
    const LineAwardCombined =
      Number(TopLineAward) + Number(CenterLineAward) + Number(BottomLineAward);
    setBalanceLimited(
      LineAwardCombined + Number(balance) - Number(PriceForSpin)
    );
  }
}

export default App;