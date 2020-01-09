import {curry} from 'ramda';
import {cells} from '../config';
const lastIndex = arr => arr.length -1;
const getNextElementInArray = curry((array, index ) => index + 1 > array.length ? 0 : index + 1);
const getPrevElementInArray = curry((array, index  ) => index - 1 < 0 ? lastIndex(array) : index - 1 );
const getNextSymbol = getNextElementInArray(cells);
const getPrevSymbol = getPrevElementInArray(cells);
export const findSymbolNeighbors = (position) => position.line === 'Center' ?
{topIndex: getNextSymbol(position.symbolIndex), bottomIndex: getPrevSymbol(position.symbolIndex), centerIndex: position.symbolIndex }:
{topIndex: position.symbolIndex, bottomIndex: getPrevSymbol(position.symbolIndex), centerIndex: false };