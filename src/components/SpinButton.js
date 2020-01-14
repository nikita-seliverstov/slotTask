import React from 'react';
import { Button } from 'reactstrap';

function SpinButton({
  balance,
  debugMode,
  spinRandom,
  spinFixed,
  fixedPositions,
  stateOfSpining
}) {
  const initiateSpinRandom = balance =>
    Number(balance) !== 0 ? spinRandom() : alert('not enough balance');
  const initiateSpinFixed = (balance, fixedPositions) =>
    Number(balance) !== 0
      ? fixedPositions
        ? spinFixed(fixedPositions)
        : alert('set position')
      : alert('not enough balance');
  return (
    <Button
      className='btn-lg m-3'
      onClick={() =>
        debugMode === false
          ? initiateSpinRandom(balance)
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
