import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

const styles = {
  cellFormat: {
    maxWidth: '50px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
}

export default function ActionReviewTableBodyItem({ row }) {

  //  d( ´ ▽ ` )b
  return (
    <TableRow>
      {Object.values(row).map((column, index) => (
        <TableCell key={index} align="center" sx={styles.cellFormat}>
          {column}
        </TableCell>
      ))}
    </TableRow>
  )
}