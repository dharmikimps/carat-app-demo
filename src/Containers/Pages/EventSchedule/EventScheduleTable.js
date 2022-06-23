import React from 'react';
import PropTypes from 'prop-types';
import classes from '../EventSchedule.module.css';
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
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import copy from '../../../Assets/Images/copy.svg';
import { useNavigate } from 'react-router';
import DeleteModal from '../../../Components/DeleteModal';

function createData(
  name,
  day,
  time,
  active,
  id,
  subtitle,
  description,
  learnMore,
  createdAt,
  updatedAt
) {
  return {
    name,
    day,
    time,
    active,
    id,
    subtitle,
    description,
    learnMore,
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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'EVENT NAME'
  },
  {
    id: 'day',
    numeric: false,
    disablePadding: false,
    label: 'DAY'
  },
  {
    id: 'time',
    numeric: false,
    disablePadding: false,
    label: 'TIME'
  },
  {
    id: 'active',
    numeric: true,
    disablePadding: false,
    label: 'ACTIVE'
  },
  {
    id: 'hidden',
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
        <TableCell padding="checkbox" style={{ width: '4%', padding: '0' }}>
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
      style={{ position: 'absolute', top: '-12px' }}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}>
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
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"></Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => props.multipleDelete(selected)}
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
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number
};

function EventScheduleTable(props) {
  let navigate = useNavigate();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('day');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteId, setDeleteId] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);

    setTimeout(() => {
      setDeleteId(id);
      setSelected([id]);
    }, 50);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let rows = [];
  if (props.search) {
    props.data.map((item) => {
      const data = item.schedule.filter((schedule) => {
        return Object.values(schedule.event_name)
          .join('')
          .toLowerCase()
          .includes(props.search.toLowerCase());
      });
      data.map((itemValue) => {
        rows.push(
          createData(
            itemValue.event_name,
            item.day,
            itemValue.time,
            itemValue.active,
            itemValue._id,
            itemValue.subtitle,
            itemValue.description,
            itemValue.learnMore,
            props.getEventData.createdAt,
            props.getEventData.updatedAt
          )
        );
      });
    });
  } else {
    props &&
      props.data &&
      props.data.map((item) => {
        item.schedule.map((schedule) => {
          rows.push(
            createData(
              schedule.event_name,
              item.day,
              schedule.time,
              schedule.active,
              schedule._id,
              schedule.subtitle,
              schedule.description,
              schedule.learnMore,
              props.getEventData.createdAt,
              props.getEventData.updatedAt
            )
          );
        });
      });
  }

  const editData = (row) => {
    navigate('/event-schedule/new-event', { state: row });
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

  const deleteProps = () => {
    if (selected.length <= 1) {
      props.deleteData(deleteId);
    } else {
      props.deleteData(selected);
    }
    handleClose();
    setTimeout(() => {
      setSelected([]);
    }, 100);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <div style={{ backgroundColor: 'white', border: 'none' }}>
        <Box sx={{ width: '100%' }}>
          {props && props.data ? (
            <div
              style={{
                width: '100%',
                marginBottom: '2px',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
              }}>
              {selected.length > 1 ? (
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  selected={selected}
                  multipleDelete={(selected) => {
                    setOpen(true);
                    setSelected(selected);
                  }}
                />
              ) : (
                <EnhancedTableToolbar />
              )}
              <TableContainer sx={{ padding: '3rem', marginTop: '20px' }}>
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
                            <TableCell padding="checkbox" style={{ width: '4%', padding: '0' }}>
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId
                                }}
                                style={{ color: '#121212' }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              className="tableCellFont"
                              style={{ width: '31%' }}>
                              {row.name}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="tableCellFont"
                              style={{ width: '5%' }}>
                              {row.day}
                            </TableCell>
                            <TableCell
                              align="left"
                              className="tableCellFont"
                              style={{ width: '25%' }}>
                              {row.time}
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.activeCell}
                              style={{ width: '15%' }}>
                              <button
                                className={`${
                                  row.active.toString() === 'true'
                                    ? classes.trueBtn
                                    : classes.falseBtn
                                }`}>
                                {row.active.toString()}
                              </button>
                            </TableCell>
                            <TableCell align="center" style={{ width: '30%' }}>
                              <IconButton onClick={() => editData(row)}>
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
                style={{ position: 'absolute', left: '0', right: '0', marginTop: '10px' }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                marginTop: '2%',
                p: '2%',
                textAlign: 'center',
                borderRadius: '10px',
                background: '#FFFFFF',
                height: '20rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
              }}>
              Record Not Found.
            </div>
          )}
        </Box>
      </div>
      <DeleteModal handleClose={() => handleClose()} open={open} delete={deleteProps} />
    </>
  );
}

export default EventScheduleTable;
