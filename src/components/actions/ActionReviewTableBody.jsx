import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import CheckBox from '@mui/material/Checkbox';
import ActionReviewTableBodyItem from './ActionReviewTableItem.jsx';

export default function ActionReviewTableBody({ rows }) {

  return (
    <TableBody>
      {
        rows.map((row, index) => (
          <ActionReviewTableBodyItem
            key={row.pid + index}
            row={row}
            index={index}
          />
        ))}
    </TableBody>
  )
}