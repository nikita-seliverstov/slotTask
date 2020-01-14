import React from 'react';
import { Button } from 'reactstrap';

function SpinButton({
  balance,
  debugMode,
  initiateSpinRandom,
  initiateSpinFixed,
  fixedPositions,
  stateOfSpining
}) {
  return (
    <Button
      className='btn-lg m-3'
      onClick={() =>
        debugMode === false
          ? initiateSpinRandom()
          : initiateSpinFixed(balance, fixedPositions)
      }
      disabled={stateOfSpining}>
      Spin!
      <span role='img' aria-label='slot-machine'>
        🎰
      </span>
    </Button>
  );
}

export default SpinButton;
