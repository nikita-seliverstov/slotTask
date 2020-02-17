import React, { useState } from 'react';
import { Button } from 'reactstrap';

interface DebugProps {
  setFixedPositions(positions:any): void
}

const Debug: React.FC<DebugProps> = ({ setFixedPositions }) => {
  const [firstReelLine, setFirstReelLine] = useState('top');
  const [firstReelSymbol, setFirstReelSymbol] = useState('0');
  const [secondReelLine, setSecondReelLine] = useState('top');
  const [secondReelSymbol, setSecondReelSymbol] = useState('0');
  const [thirdReelLine, setThirdReelLine] = useState('top');
  const [thirdReelSymbol, setThirdReelSymbol] = useState('0');
  return (
    
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <select
              value={firstReelLine}
              onChange={event => setFirstReelLine(event.target.value)}>
              <option value='top'>Top</option>
              <option value='center'>Center</option>
              <option value='bottom'>Bottom</option>
            </select>
            <select
              value={firstReelSymbol}
              onChange={event => setFirstReelSymbol(event.target.value)}>
              <option value='0'>3xBAR</option>
              <option value='1'>BAR</option>
              <option value='2'>2xBAR</option>
              <option value='3'>7</option>
              <option value='4'>Cherry</option>
            </select>
          </div>
          <div className='col-4'>
            <select
              value={secondReelLine}
              onChange={event => setSecondReelLine(event.target.value)}>
              <option value='top'>Top</option>
              <option value='center'>Center</option>
              <option value='bottom'>Bottom</option>
            </select>
            <select
              value={secondReelSymbol}
              onChange={event => setSecondReelSymbol(event.target.value)}>
              <option value='0'>3xBAR</option>
              <option value='1'>BAR</option>
              <option value='2'>2xBAR</option>
              <option value='3'>7</option>
              <option value='4'>Cherry</option>
            </select>
          </div>
          <div className='col-4'>
            <select
              value={thirdReelLine}
              onChange={event => setThirdReelLine(event.target.value)}>
              <option value='top'>Top</option>
              <option value='center'>Center</option>
              <option value='bottom'>Bottom</option>
            </select>
            <select
              value={thirdReelSymbol}
              onChange={event => setThirdReelSymbol(event.target.value)}>
              <option value='0'>3xBAR</option>
              <option value='1'>BAR</option>
              <option value='2'>2xBAR</option>
              <option value='3'>7</option>
              <option value='4'>Cherry</option>
            </select>
          </div>
        </div>
        <Button onClick={() => getPositionsAndSetState()} className='m-3'>
          Set positions
        </Button>
      </div>
   
  );
  // pass positions to state
  function getPositionsAndSetState() {
    setFixedPositions({
      firstReelStopPosition: {
        symbolIndex: firstReelSymbol,
        line: firstReelLine
      },
      secondReelStopPosition: {
        symbolIndex: secondReelSymbol,
        line: secondReelLine
      },
      thirdReelStopPosition: {
        symbolIndex: thirdReelSymbol,
        line: thirdReelLine
      }
    });
  }
}

export default Debug;
