import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import CheckBox from '@mui/material/Checkbox';

const styles = {
  cellFormat: {
    maxWidth: '50px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 'fit-content'
  }
}

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
}

export default function DemandViewTableBodyItem({ row, selected, index, handleCheckboxChange, expiration, setExpiration }) {

  const [isChecked, setIsChecked] = useState(selected)

  const [countDownDate, setCountDownDate] = useState(new Date().addHours(48))

  const handleChange = () => {
    setIsChecked(!isChecked)
    handleCheckboxChange(index)
  }


  useEffect(() => {
    const interval = setInterval(() => {
      let now = new Date().getTime();

      let distance = countDownDate - now;

      let hours = Math.floor((distance % (1000 * 60 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      let expirationString = hours + 'h ' + minutes + 'm ';
      setExpiration(expirationString);


      if (distance < 0) {
        clearInterval(interval);
        setExpiration('EXPIRED');
      }

    }, 60000);
    return () => clearInterval(interval);
  }, [])
  //  d( ´ ▽ ` )b
  return (
    < TableRow >
      <TableCell sx={{ width: 'fit-content' }}>
        <CheckBox
          checked={isChecked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </TableCell>
      {
        Object.values(row).map((column, index) => (
          < TableCell key={index} align="center" sx={styles.cellFormat}>
            {column}
          </TableCell>
        ))
      }
      <TableCell align="center" sx={styles.cellFormat}>
        {expiration}
      </TableCell>
    </TableRow >
  )
}