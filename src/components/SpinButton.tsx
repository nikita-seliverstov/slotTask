import React from 'react';
import { Button } from 'reactstrap';

interface SpinButtonProps {
  balance: number,
  debugMode: boolean,
  spinRandom(): void
  spinFixed(positions: object): void
  fixedPositions: object,
  stateOfSpining: boolean
}

const SpinButton: React.FC<SpinButtonProps> = props => {
  const {balance,
    debugMode,
    spinRandom,
    spinFixed,
    fixedPositions,
    stateOfSpining} = props;
   
  const initiateSpinRandom = (balance: number) =>
    balance > 0 ? spinRandom() : alert('not enough balance');
  const initiateSpinFixed = (balance: number, fixedPositions: object) =>
    balance > 0
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