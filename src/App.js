import React, { useState } from "react";
import { Button } from "reactstrap";
import { compose } from "ramda";
import "react-toggle/style.css";
import { prop, filter, contains, curry, isEmpty, keys } from "ramda";
import "./App.css";
import ToggleDebud from "./components/ToggleDebug";
import Balance from "./components/Balance";
import SlotMachine from "./components/SlotMachine";
import PayTable from "./components/PayTable";
import Debug from "./components/Debug";
import { findSymbolNeighbors } from "./helpers/findIndexNeighborsInArray";
import { symbols, combinations } from "./config";

function App() {
  const [stateOfSpining, setStateOfSpining] = useState(false);
  const [positions, setPositions] = useState();
  const [fixedPositions, setFixedPositions] = useState();
  const [symbolCombination, setCombinations] = useState();
  const [debugMode, setDebugMode] = useState(false);
  const [balance, setBalance] = useState(0);
 
  const payForSpin = () => setBalance(balance - 1);
  const setBalanceLimitedTo5000 = number =>
    number <= 5000 && number  >= 0  && setBalance(number);
    const activateSpin = (award) => {
      setStateOfSpining(true);
      setTimeout(() => {setStateOfSpining(false);  giveAward(award)}, 3000);
      
    };
    function giveAward(award){
      const lines = keys(award);
      
      
    }
    const spinRandom = compose(activateSpin, winCombinations, symbolPositions, symbolsOnStopLines,winLinesToStopOn,payForSpin);
    const spinFixed = compose(activateSpin, winCombinations, symbolPositions);

  return (
    <div className="App">
      <ToggleDebud setDebugMode={setDebugMode} debugMode={debugMode} />
      <Balance symbolCombination={symbolCombination} setBalance={setBalanceLimitedTo5000} balance={balance} />
      <PayTable
        stateOfSpining={stateOfSpining}
        symbolCombination={symbolCombination}
        setCombinations={setCombinations}
        positions={positions}
      ></PayTable>
      <SlotMachine
        stateOfSpining={stateOfSpining}
        positions={positions}
        symbolCombination={symbolCombination}
      />
      {debugMode === false ? (
        <Button
          className="btn-lg m-3"
          onClick={() =>
            balance !== 0 ? spinRandom() : alert("not enough balance")
          }
          disabled={stateOfSpining}
        >
          Spin!
          <span role="img" aria-label="slot-machine">
            🎰
          </span>
        </Button>
      ) : (
        <Button
          className="btn-lg m-3"
          onClick={() =>
            balance !== 0
              ?  spinFixed(fixedPositions)
              : alert("not enough balance")
          }
          disabled={stateOfSpining}
        >
          Spin!
          <span role="img" aria-label="slot-machine">
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
        ? "Top"
        : randomValue === 1
        ? "Center"
        : "Bottom";
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
      top: checkforCombinations(position, "top"),
      center: checkforCombinations(position, "center"),
      bottom: checkforCombinations(position, "bottom")
    }
    setCombinations(combinations)
    return combinations;
  }
  // checks line for combinations return obj with award if exist
  function checkforCombinations(positions, line) {
    // get array for line and replace values with compared symbol name for prop search
    const arrayForCurrentLine = positions.map(x =>
      prop("name", symbols[prop(line, x)])
    );
    const allEqual = arr => arr.every(v => v === arr[0] && v !== undefined);
    const everyArrElemContainsObjVal = curry((arr, objVal) =>
      arr.every(elem => contains(elem, objVal.contains))
    );
    const everyPositionContainsObjVal = everyArrElemContainsObjVal(
      arrayForCurrentLine
    );
    // Returns combination of not same symbols if exist or returns empty obj
    const hasNotSameCombination = filter(
      everyPositionContainsObjVal,
      combinations.notSameSymbolsAnyLine
    );
    // Check for combination of 3 same sybols
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
      return hasNotSameCombination[keys(hasNotSameCombination)[0]];
    } else {
      return {award: 0};
    }
  }
 
}



export default App;
