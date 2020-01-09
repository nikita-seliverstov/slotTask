import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { cells } from '../config';
import { prop } from 'ramda';
function PayTable() {
    const specialCombinationPay = {
        cherry: {
         top: 2000,
         center: 1000,
         bottom: 4000
        },
        cherryAnd7: 75,
        anyBar: 5,

    } 
    return(
    <div className="col-6">
    <Table>
        <tbody>
        <tr>
            <th>Combination of 3</th>
               {cells.filter(cell => prop('combinationPay', cell)).map(cell =>
                     <td>
                         <img src={cell.img} className="tableImage"></img>
                         <img src={cell.img} className="tableImage"></img>
                         <img src={cell.img} className="tableImage"></img>
                     </td>
               )}
        </tr>
        <tr>
            <th>Award</th>
               {cells.filter(cell => prop('combinationPay', cell)).map(cell =>
                     <td>
                        {cell.combinationPay}
                     </td>
               )}
        </tr>
        </tbody>
      
    </Table>
    </div>
    )
}

export default PayTable;