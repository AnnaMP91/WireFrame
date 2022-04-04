import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import CheckBox from '@mui/material/Checkbox';

const styles = {
  cellFormat: {
    maxWidth: '50px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
}

export default function DemandViewTableBodyItem({ row, selected, index, handleCheckboxChange }) {

  const [isChecked, setIsChecked] = useState(selected)

  const handleChange = () => {
    setIsChecked(!isChecked)
    handleCheckboxChange(index)
  }
  //  d( ´ ▽ ` )b
  return (
    <TableRow>
      <TableCell sx={{ width: 'fit-content' }}>
        <CheckBox
          checked={isChecked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </TableCell>
      {Object.values(row).map((column, index) => (
        <TableCell sx={{ width: 'fit-content' }} key={index} align="center" sx={styles.cellFormat}>
          {column}
        </TableCell>
      ))}
    </TableRow>
  )
}