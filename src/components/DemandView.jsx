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
import DemandViewTableBody from './DemandViewTableBody.jsx';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';

const columns = ['pid', 'sku', 'PUB Code', 'SKUType', 'title', 'On Order', 'demand', 'Dept.', 'Subdept.', 'Class', 'BuyerNum', 'PONum', 'Expiration']
//              { pid:, sku:, code:,      skuType:,    title:, ordered:,    demand:,  department,   subDepartment:,  class:,  buyerNum:,  poNum: },

const styles = {
  demandViewContainer: {
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
  },
  buttonStyles: {
    marginLeft: '5px',
    marginRight: '5px'
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


export default function DemandView({ rows, setRows, setActionRows, handlePushToActions, expiration, setExpiration }) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState({});
  const [selected, setSelected] = useState(false);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('demand');


  const handleActionButton = (event) => {
    const type = event.target.innerText;
    handleActionRows(type);
    removeRows();
    setSelectedRows({})
  }

  const handleActionRows = (type) => {
    setActionRows((prevState) => {
      let date = new Date();
      let convertedDate = date.toLocaleString();
      let splitDate = convertedDate.split(',');
      let dateOnly = splitDate[0];

      let indexes = Object.keys(selectedRows);
      for (let i = 0; i < indexes.length; i++) {
        let index = indexes[i];
        if (selectedRows[index]) {

          delete rows[index].expiration;

          let rowCopy = { ...rows[index], type: type, date: dateOnly }

          prevState.push(rowCopy)
        }
      }
      return prevState;
    })
  }

  const removeRows = () => {
    setRows((prevState) => {
      let indexes = Object.keys(selectedRows);
      for (let i = 0; i < indexes.length; i++) {
        let index = indexes[i];
        prevState.splice(index, 1);
      }

      return prevState;
    })

  }

  const checkAllBoxes = () => {
    // TODO: Implement top check box function
  }

  const handleCheckboxChange = (index) => {
    setSelectedRows(() => {
      if (selectedRows[index]) {
        delete selectedRows[index]
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


  //----------------------------------------------------------------------------------
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  let props = '';
  const { numSelected, rowCount } = props;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  DemandView.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //------------------------------------------------------------------

  return (

    <Box sx={styles.demandViewContainer}>
      <TableContainer sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <CheckBox
                  // TODO: Add onChange function, tie to checkAllBoxes
                  indeterminate={(Object.keys(selectedRows).length > 0) && (Object.keys(selectedRows).length < rows.length)}
                  checked={Object.keys(selectedRows).length == rows.length}
                />
              </TableCell>
              {columns.map((label, index) => (
                <TableCell key={index} align="center">
                  {/* //-------------------------------------------------------------- */}
                  <TableSortLabel
                    active={orderBy === label}
                    direction={orderBy === label ? order : 'asc'}
                    onClick={createSortHandler(label)}
                  >
                    {label}
                    {orderBy === label ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                  {/* //------------------------------------------------------------------------ */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <DemandViewTableBody
            rows={rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            selectedRows={selectedRows}
            handleCheckboxChange={handleCheckboxChange}
            stableSort={stableSort}
            getComparator={getComparator}
            order={order}
            orderBy={orderBy}
            expiration={expiration}
            setExpiration={setExpiration}
          />

        </Table>

      </TableContainer>


      <div style={styles.tableFooter}>
        <span style={{ marginTop: '15px' }}>
          <Button variant="outlined" color="inherit" style={styles.buttonStyles} onClick={handleActionButton}>Rel to AWBC</Button>
          <Button variant="outlined" color="inherit" style={styles.buttonStyles} onClick={handleActionButton}>B/O Change</Button>
          <Button variant="outlined" color="inherit" style={styles.buttonStyles} onClick={handleActionButton}>Hold Item</Button>
          <Button variant="outlined" color="inherit" style={styles.buttonStyles} onClick={handleActionButton}>Push to Ingram</Button>
        </span>
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
      </div>

    </Box >
  )
}


//

