import React, { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import CheckBox from '@mui/material/Checkbox';
import POReviewTableBodyItem from './POReviewTableBodyItem.jsx';

export default function POReviewTableBody({ rows }) {

  return (
    <TableBody>
      {
        rows.map((row, index) => (
          <POReviewTableBodyItem
            key={row.pid + index}
            row={row}
            index={index}
          />
        ))}
    </TableBody>
  )
}