import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

function createData(name, email, carats, scan, id) {
  return {
    name,
    email,
    carats,
    scan,
    id
  };
}

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

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'carats',
    numeric: true,
    disablePadding: false,
    label: 'Carats'
  },
  {
    id: 'scans',
    numeric: true,
    disablePadding: false,
    label: 'Scans'
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: false
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              textTransform: 'uppercase',
              fontFamily: 'Magdelin-Regular',
              fontSize: '14px',
              color: '#707070'
            }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

function LeaderBoardTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const rows = [];

  if (props.search) {
    const data = props.data.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(props.search.toLowerCase());
    });
    data.map((itemValue) => {
      rows.push(
        createData(
          itemValue.firstName,
          itemValue.email,
          itemValue.totalStamp,
          itemValue.scan,
          itemValue.id
        )
      );
    });
  } else {
    props.data &&
      props.data.map((item) => {
        rows.push(createData(item.firstName, item.email, item.totalStamp, item.scan, item.id));
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSendMessage = (userData) => {
    navigate('/leaderboards/messages/new-message', { state: userData });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          marginBottom: '2px',
          boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          borderRadius: '10px',
          padding: '2rem'
        }}>
        <TableContainer>
          {props.data.length === 0 ? (
            <div
              style={{
                height: '50vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Magdelin-Medium'
              }}>
              No Users Found!!
            </div>
          ) : (
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />

              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        style={{ borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          className="tableCellFont"
                          style={{ width: '15%' }}>
                          {row.name}
                        </TableCell>
                        <TableCell align="left" className="tableCellFont" style={{ width: '20%' }}>
                          {row.email}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="tableCellFont"
                          style={{ width: '10%' }}>
                          {row.carats}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="tableCellFont"
                          style={{ width: '10%' }}>
                          {row.scan}
                        </TableCell>
                        <TableCell align="center" style={{ width: '20%' }}>
                          <button
                            style={{
                              backgroundColor: 'black',
                              color: 'white',
                              border: 'none',
                              borderRadius: '10px',
                              height: '32px',
                              width: '189px',
                              fontSize: '16px',
                              fontFamily: 'Magdelin-Medium'
                            }}
                            onClick={() => handleSendMessage(row)}>
                            Message
                          </button>
                        </TableCell>
                        <TableCell align="center" style={{ width: '25%' }}></TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows
                    }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ position: 'absolute', left: '0', right: '0', marginTop: '45px' }}
        />
      </div>
    </Box>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps)(LeaderBoardTable);
