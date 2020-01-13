import React, { useEffect, Children } from 'react';
import { Table } from 'reactstrap';
import { symbols, combinations } from '../config';
import { prop, map, values } from 'ramda';
function PayTable({ symbolCombination, stateOfSpining }) {
  const notSameSymbolCombinations = values(
    map(x => x.containsID, combinations.notSameSymbolsAnyLine)
  );
  const notSameSymbolAward = values(
    map(x => x.award, combinations.notSameSymbolsAnyLine)
  );
  const winingCombinationArr = values(symbolCombination);
  const symbolsInCombinationArr = combination =>
    symbols.filter(symbol => symbol.name in combination);
  const sameSymbolsAnyLine = symbolsInCombinationArr(
    combinations.sameSymbolsAnyLine
  );
  const sameSymbolsLineDependent = symbolsInCombinationArr(
    combinations.sameSymbolsLineDependent
  );
  const checkIfAwardIsEqual = award =>
    winingCombinationArr.some(combination => combination.award == award);

  return (
    <div className='col-2 m-3'>
      <Table>
        <tbody>
          <tr>
            <th>Combination of 3 same symbols</th>
            <TableImages symbols={sameSymbolsAnyLine} />
          </tr>
          <tr>
            <th>Award</th>
            {sameSymbolsAnyLine.map(symbol => (
              <td
                className={
                  !stateOfSpining
                    ? checkIfAwardIsEqual(
                        prop(symbol.name, combinations.sameSymbolsAnyLine)
                      ) && 'awardBlink'
                    : false
                }>
                {prop(symbol.name, combinations.sameSymbolsAnyLine)}
              </td>
            ))}
          </tr>
          <tr>
            <th>Combination of 3 same symbols line dependet</th>
            <TableImages symbols={sameSymbolsLineDependent} />
          </tr>
          <tr>
            <th>Award</th>
            {sameSymbolsLineDependent.map(symbol => (
              <>
                <td>
                  Top:{' '}
                  {prop(
                    'top',
                    prop(symbol.name, combinations.sameSymbolsLineDependent)
                  )}
                </td>
                <td>
                  Center:{' '}
                  {prop(
                    'center',
                    prop(symbol.name, combinations.sameSymbolsLineDependent)
                  )}
                </td>
                <td>
                  Bottom:{' '}
                  {prop(
                    'bottom',
                    prop(symbol.name, combinations.sameSymbolsLineDependent)
                  )}
                </td>
              </>
            ))}
          </tr>
          <tr>
            <th>Combination of any 3 symbols</th>
            {notSameSymbolCombinations.map(combinations => (
              <td>
                {combinations.map(element => (
                  <img src={symbols[element].img} className='tableImage'></img>
                ))}
              </td>
            ))}
          </tr>
          <tr>
            <th>Award</th>
            {notSameSymbolAward.map(award => (
              <td
                className={
                  winingCombinationArr.some(
                    combination => combination.award == award
                  ) && 'invalid'
                }>
                {award}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
const TableImages = ({ symbols }) =>
  symbols.map(symbol => (
    <td>
      <img src={symbol.img} className='tableImage'></img>
    </td>
  ));

export default PayTable;
