import React from 'react';
import { Input } from 'reactstrap';

function Balance({setBalance, balance}) {
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
          onChange={event => setBalance(event.target.value)}
          value={balance}></Input>
      </div>
    </div>
  );
}

export default Balance;