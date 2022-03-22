import React from 'react';

const TableEmptyRow = ({ message }) => {
   return (
      <tr className='table-row-content info-row'>
         <td className='empty-cell'></td>
         <td className='info-cell' colSpan='6'>
            {message}
         </td>
      </tr>
   );
};

export default TableEmptyRow;
