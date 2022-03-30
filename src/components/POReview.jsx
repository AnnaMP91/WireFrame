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
import POReviewTableBody from './POReviewTableBody.jsx';

const columns = ['PID', 'PUB', 'Title', 'Demand', 'Order #', 'Order Quantity', 'Order Date', 'Exp. PO Rec.', 'Cancel Date'];

const styles = {

  poViewContainer: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '100%',
    padding: '20px 20px 0 20px',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column'
  },
  tableContainer: {
    height: 'inherit'
  },
  tableFooter: {
    marginTop: 'auto',
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'white',
    position: 'sticky',
    bottom: 0
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

const rows = [
  { pid: 123456, pub: 'Penguin', skuType: '01', title: 'Run Rose Run', demand: 8000, orderNum: 36547, ordered: 2000, orderDate: '3/28/22', cancelDate: '3/29/22' },
  { pid: 465879, pub: 'Random House', skuType: '01', title: 'Stardust', demand: 8000, orderNum: 36548, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 970483, pub: 'Simon and Shuster', skuType: '01', title: 'Dune', demand: 8000, orderNum: 36549, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 679525, pub: 'Harper Collins', skuType: '01', title: 'A Knife of Dreams', demand: 8000, orderNum: 36550, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 243556, pub: 'Penguin', skuType: '01', title: 'Storm Light', demand: 8000, orderNum: 36551, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 465879, pub: 'Penguin', skuType: '01', title: 'Way of the Shadows', demand: 8000, orderNum: 36552, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 756342, pub: 'Random House', skuType: '01', title: 'Gone Girl', demand: 8000, orderNum: 36553, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 352375, pub: 'Penguin', skuType: '01', title: 'Clifford', demand: 8000, orderNum: 36554, ordered: 2000, orderDate: '3/01/22', cancelDate: '3/12/22' },
  { pid: 960463, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', demand: 8000, orderNum: 36555, ordered: 2000, orderDate: '3/02/22', cancelDate: 'N/A' },
  { pid: 960463, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', demand: 8000, orderNum: 36556, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 123456, pub: 'Penguin', skuType: '01', title: 'Run Rose Run', demand: 8000, orderNum: 36557, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 465879, pub: 'Random House', skuType: '01', title: 'Run Rose Run', demand: 8000, orderNum: 36558, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 970483, pub: 'Simon and Shuster', skuType: '01', title: 'Run Rose Run', demand: 8000, orderNum: 36559, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 679525, pub: 'Harper Collins', skuType: '01', title: 'Run Rose Run', demand: 8000, orderNum: 36560, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 243556, pub: 'Penguin', skuType: '01', title: 'Storm Light', demand: 8000, orderNum: 36561, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 465879, pub: 'Penguin', skuType: '01', title: 'Way of the Shadows', demand: 8000, orderNum: 36562, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' },
  { pid: 756342, pub: 'Random House', skuType: '01', title: 'Gone Girl', demand: 8000, orderNum: 36563, ordered: 2000, orderDate: '3/03/22', cancelDate: '3/21/22' },
  { pid: 352375, pub: 'Penguin', skuType: '01', title: 'Clifford', demand: 8000, orderNum: 36564, ordered: 2000, orderDate: '3/21/22', cancelDate: 'N/A' },
  { pid: 960463, pub: 'Harper Collins', skuType: '01', title: 'Harry Potter and the Chamber of Secrets', demand: 8000, orderNum: 36565, ordered: 2000, orderDate: '3/28/22', cancelDate: 'N/A' }
];

export default function POReview() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState({});
  const [selected, setSelected] = useState(false);

  return (
    <Box sx={styles.poViewContainer}>
      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((label, index) => (
                <TableCell key={index} align='center'>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <POReviewTableBody rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
          <TableFooter>
            <TableRow>

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


