import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import CheckBox from '@mui/material/Checkbox';
import DemandViewTableBodyItem from './DemandViewTableBodyItem.jsx';

export default function DemandViewTableBody({ rows, selectedRows, isSelected, handleCheckboxChange, stableSort, getComparator, order, orderBy, expiration, setExpiration }) {

  return (
    <TableBody sx={{ height: 'max-content' }}>
      {stableSort(rows, getComparator(order, orderBy))
        .map((row, index) => (
          <DemandViewTableBodyItem
            key={row.pid + index}
            row={row}
            selected={selectedRows[index] || false}
            index={index}
            handleCheckboxChange={handleCheckboxChange}
            expiration={expiration}
            setExpiration={setExpiration} />

        ))}
    </TableBody>
  )
}