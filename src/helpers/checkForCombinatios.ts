import { symbols, combinations } from '../config';
import { prop, filter, contains, curry, isEmpty, keys } from 'ramda';
// checks line for combinations return obj with award if exist
export function checkforCombinations(positions: [], line: string) {
  // get array for line and replace values with compared symbol name for prop search
  const arrayForCurrentLine: string[] = positions.map(x =>
    prop('name', symbols[prop(line, x)])
  );
  const allEqual = (arr:string[]) => arr.every(v => v === arr[0] && v !== undefined);
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
            prop(arrayForCurrentLine[0], combinations.sameSymbolsLineDependent)
          )
        };
  } else if (!isEmpty(hasNotSameCombination)) {
    return hasNotSameCombination[keys(hasNotSameCombination)[0]];
  } else {
    return { award: 0 };
  }
}
