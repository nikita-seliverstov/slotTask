import { curry } from 'ramda';
import { symbols } from '../config';
const lastIndex = arr => arr.length - 1;
const getNextElementInArray = curry((array, index) =>
  index + 1 >= array.length ? 0 : Number(index) + 1
);
const getPrevElementInArray = curry((array, index) =>
  index - 1 < 0 ? lastIndex(array) : Number(index) - 1
);
const getNextSymbol = getNextElementInArray(symbols);
const getPrevSymbol = getPrevElementInArray(symbols);
export const findSymbolNeighbors = position =>
  position.line === 'center'
    ? {
        top: getNextSymbol(Number(position.symbolIndex)),
        bottom: getPrevSymbol(Number(position.symbolIndex)),
        center: Number(position.symbolIndex)
      }
    : position.line === 'top'
    ? {
        top: Number(position.symbolIndex),
        bottom: getPrevSymbol(Number(position.symbolIndex)),
        center: false
      }
    : {
        top: getNextSymbol(Number(position.symbolIndex)),
        bottom: Number(position.symbolIndex),
        center: false
      };
