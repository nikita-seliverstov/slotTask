import React from "react";
import { Table } from "reactstrap";
import { symbols, combinations } from "../config";
// I added ramda map because it has implementation for objects
import { prop, contains, map } from "ramda";
function PayTable() {
  return (
    <div className="col-3">
      <Table>
        <tbody>
          <tr>
            <th>Combination of 3 same symbols</th>
            {symbols
              .filter(symbol => symbol.name in combinations.sameSymbolsAnyLine).map(symbol => (
                <td>
                  <img src={symbol.img} className="tableImage"></img>
                 
                </td>
              ))}
          </tr>
          <tr>
            <th>Award</th>
            {symbols.filter(symbol => symbol.name in combinations.sameSymbolsAnyLine).map(symbol => (
                <td>{prop(symbol.name, combinations.sameSymbolsAnyLine)}</td>
              ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default PayTable;
