import * as React from 'react';
import classes from '.././css/Message.module.css';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { connect } from 'react-redux';
import { getUserSpree } from '../../../Services/Message';

import EditIcon from '@mui/icons-material/Edit';
import copy from '../../../Assets/Images/copy.svg';
import { useNavigate } from 'react-router';
import moment from 'moment';
import DeleteModal from '../../../Components/DeleteModal';

function createData(
  title,
  description,
  start_date,
  end_date,
  id,
  users,
  text_color,
  background_color,
  isNotificationSent,
  message_link,
  message_link_text,
  createdAt,
  updatedAt
) {
  return {
    title,
    description,
    start_date,
    end_date,
    id,
    users,
    text_color,
    background_color,
    isNotificationSent,
    message_link,
    message_link_text,
    createdAt,
    updatedAt
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
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Subject'
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Body'
  },
  {
    id: 'start_date',
    numeric: true,
    disablePadding: false,
    label: 'Start time'
  },
  {
    id: 'end_date',
    numeric: true,
    disablePadding: false,
    label: 'End time'
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'miscellaneous',
    numeric: true,
    disablePadding: false,
    label: ' '
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>
        <TableCell padding="checkbox" style={{ width: '5%', padding: '0' }}>
          <Checkbox
            style={{ color: '#121212' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
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
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
      style={{ position: 'absolute', top: '-12px', background: 'none' }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          style={{ fontSize: '14px', fontFamily: 'Magdelin-Medium' }}>
          {numSelected} Entries Selected
        </Typography>
      ) : (
        ''
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              props.multipleDelete(selected);
            }}
            style={{
              color: '#671A21',
              backgroundColor: '#F5CFD3',
              border: '1px solid',
              borderRadius: '10px',
              marginLeft: '10px',
              fontSize: '14px',
              letterSpacing: '2px',
              fontFamily: 'Magdelin-Black'
            }}>
            <DeleteIcon style={{ color: '#671A21', width: '20px', height: '20px' }} />
            DELETE
          </IconButton>
        </Tooltip>
      ) : (
        ''
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number
};

function MessageTable(props) {
  let navigate = useNavigate();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    setOpen(!open);
    setTimeout(() => {
      setSelected([id]);
    }, 50);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = [];

  if (props.search) {
    const data = props.data.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(props.search.toLowerCase());
    });
    data.map((itemValue) => {
      rows.push(
        createData(
          itemValue.title,
          itemValue.description,
          itemValue.start_date,
          itemValue.end_date,
          itemValue.id,
          itemValue.users,
          itemValue.text_color,
          itemValue.background_color,
          itemValue.isNotificationSent,
          itemValue.message_link,
          itemValue.message_link_text,
          itemValue.createdAt,
          itemValue.updatedAt
        )
      );
    });
  } else {
    props.data &&
      props.data.map((item) => {
        rows.push(
          createData(
            item.title,
            item.description,
            item.start_date,
            item.end_date,
            item.id,
            item.users,
            item.text_color,
            item.background_color,
            item.isNotificationSent,
            item.message_link,
            item.message_link_text,
            item.createdAt,
            item.updatedAt
          )
        );
      });
  }

  const editData = (messageDataById) => {
    navigate('/messages/edit-message', { state: messageDataById });
  };

  const deleteMessage = () => {
    let deleteMsgIdArr =
      selected &&
      selected.length > 0 &&
      selected.map((message_id) => {
        return { messageId: message_id };
      });

    props.delete(deleteMsgIdArr);
    handleOpen();
    setTimeout(() => {
      setSelected([]);
    }, 100);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);

      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <div
          sx={{ width: '100%', mb: 2 }}
          style={{
            width: '100%',
            marginBottom: '2px',
            boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            borderRadius: '10px',
            padding: '1rem'
          }}>
          {selected.length > 1 ? (
            <EnhancedTableToolbar
              numSelected={selected.length}
              selected={selected}
              multipleDelete={(selected) => {
                setOpen(!open);
                setSelected(selected);
              }}
            />
          ) : (
            <EnhancedTableToolbar />
          )}
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    let status;
                    if (
                      (row?.end_date &&
                        moment().isBefore(moment(row?.end_date)) &&
                        !(row?.start_date && moment().isBefore(moment(row?.start_date)))) ||
                      (row?.start_date && !row?.end_date
                        ? !moment().isBefore(moment(row?.start_date))
                        : !row?.end_date)
                    ) {
                      status = 'Active';
                    } else if (row?.start_date && moment().isBefore(moment(row?.start_date))) {
                      status = 'Upcoming';
                    } else {
                      status = 'Past';
                    }
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                        style={{ borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>
                        <TableCell padding="checkbox" style={{ width: '5%', padding: '0' }}>
                          <Checkbox
                            style={{ color: '#121212' }}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          className="tableCellFont"
                          style={{ width: '20%' }}>
                          {row.title}
                        </TableCell>
                        <TableCell align="left" className="tableCellFont" style={{ width: '35%' }}>
                          {row.description.substring(0, 70)}...
                        </TableCell>
                        <TableCell
                          align="center"
                          padding="none"
                          scope="row"
                          component="th"
                          className="tableCellFont"
                          style={{ width: '11%' }}>
                          {row.start_date ? moment(row.start_date).format('MM-DD h:mm A') : '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          padding="none"
                          scope="row"
                          component="th"
                          className="tableCellFont"
                          style={{ width: '11%' }}>
                          {row.end_date ? moment(row.end_date).format('MM-DD h:mm A') : '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={`tableCellFont ${classes.statusCell}`}
                          style={{ width: '5%' }}>
                          <button
                            className={`${
                              status === 'Active'
                                ? classes.active
                                : status === 'Upcoming'
                                ? classes.upcoming
                                : classes.past
                            }`}>
                            {status}
                          </button>
                        </TableCell>
                        <TableCell align="center" style={{ width: '20%' }}>
                          <IconButton
                            onClick={() => {
                              editData(row);
                            }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton>
                            <img src={copy} />
                          </IconButton>
                          <IconButton onClick={() => handleOpen(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
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
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ position: 'absolute', left: '0', right: '0', marginTop: '20px' }}
          />
        </div>
      </Box>
      <DeleteModal
        handleClose={() => handleClose()}
        selected={selected}
        open={open}
        delete={deleteMessage}
      />
    </>
  );
}

function mapStateToProps(state) {
  return { spree: state && state.spree !== undefined && state.spree[0] ? state.spree[0] : null };
}

export default connect(mapStateToProps, { getUserSpree })(MessageTable);
