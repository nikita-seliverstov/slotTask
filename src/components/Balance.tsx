import React from 'react';
import { Input } from 'reactstrap';

interface BalanceProps {
  setBalance(n: number): void,
  balance: number,
  symbolCombination: object
}

const Balance : React.FC<BalanceProps> = ({setBalance, balance, symbolCombination}) => {
  return (
    <div className='container-fluid balance'>
      <div className='col'>
        Balance: {balance}
        <br />
      </div>
      <div className='col-2'>
        Set balance:{' '}
        <Input
          type='number'
          min='0'
          onChange={(event: {target: HTMLInputElement;})=> setBalance(Number(event.target.value))}
          value={balance}></Input>
      </div>
    </div>
  );
  
}

export default Balance;