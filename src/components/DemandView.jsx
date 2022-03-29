import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import CheckBox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';

const columns = ['PID', 'Code', 'PUB', 'SKU Type', 'Title', 'Ordered', 'Demand', 'Department', 'Subdepartment', 'Class', 'Subclass', 'BuyerNum', 'PONum']

const styles = {

  demandViewContainer: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '100%',
    padding: '20px'
  },

  cellFormat: {
    maxWidth: '50px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


export default function DemandView({ rows, setRows, setActionRows }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState({});
  const [selected, setSelected] = useState(false);

  const handleActionButton = (event) => {
    const type = event.target.innerhtml;
    //push to action state
    handleActionRows();
    // remove from old rows state
    removeRow();
    setSelectedRows({});
  }

  const handleActionRows = () => {

    // setActionRows((prevState) => {
    //   let indexes = Object.keys(selectedRows);
    //   for (let i = 0; i < indexes.length; i++) {
    //     let index = indexes[i];
    //     if (selectedRows[index]) {

    //     }
    //     prevState.push(rows[index])
    //   }
    //   return prevState;
    // })
  }

  const removeRow = () => {
    // setRows((prevState) => {
    //   let indexes = Object.keys(selectedRows);
    //   for (let i = 0; i < indexes.length; i++) {
    //     let index = indexes[i];
    //     prevState.splice(index, 1);
    //   }

    //   return prevState;
    // })

  }

  const checkAllBoxes = () => {
    // TODO: Implement top check box function
  }

  const handleCheckboxChange = (index) => {
    setSelectedRows(() => {
      if (selectedRows[index]) {
        selectedRows[index] = false
      } else {
        selectedRows[index] = true
      }

      if (Object.keys(selectedRows).length > 0) {
        setSelected(true)
      } else {
        setSelected(false)
      }
      return selectedRows
    })
  }

  // useEffect(() => {
  //   console.table(rows);
  //   setSelectedRows({});
  // }, [rows])

  return (
    <Box sx={styles.demandViewContainer}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <CheckBox
                  // TODO: Add onChange function, tie to checkAllBoxes
                  checked={Object.keys(selectedRows).length > 0}
                />
              </TableCell>
              {columns.map((label, index) => (
                <TableCell key={index} align="center">
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CheckBox
                    checked={selectedRows[index]}
                    onChange={() => { handleCheckboxChange(index) }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
                {Object.values(row).map((column, index) => (
                  <TableCell key={index} align="center" sx={styles.cellFormat}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="8">
                <Button variant="outlined" color="inherit" onClick={handleActionButton}>Rel to AWBC</Button>
                <Button variant="outlined" color="inherit" onClick={handleActionButton}>B/O Change</Button>
                <Button variant="outlined" color="inherit" onClick={handleActionButton}>Hold Item</Button>
                <Button variant="outlined" color="inherit" onClick={handleActionButton}>Push to Ingram</Button>

              </TableCell>

              <TablePagination
                rowsPerPageOptions={[10, 25]}
                count={rows?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}

