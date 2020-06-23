import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material ui
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// actions
import { permissionAction } from '../../actions';

// components
import AppStyles from '../Common/useStyles';

const columns = [
    { 
        id: 'name', 
        label: 'Permissions', 
        minWidth: 750 
    },
    { 
        id: 'role_permissions', 
        label: 'ROLE_AUTHENTICATED', 
        mWidth: 50,
        align: 'center',
        format: (value) => value === 3 ? true : false,
    },
    {
        id: 'role_permissions',
        label: 'ROLE_MAIN',
        minWidth: 50,
        align: 'center',
        format: (value) => value === 2 ? true : false,
    },
    {
        id: 'role_permissions',
        label: 'ROLE_ADMIN',
        minWidth: 50,
        align: 'center',
        format: (value) => value === 1 ? true : false,
    },
];

function Permissions() {
   
    // table-related variables
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = AppStyles();

    // permission-related variables
    const permissionsList = useSelector(state => state.permissions.items);
    const permissions = permissionsList ? permissionsList : [];

    const dispatch = useDispatch();

    // Methods
    useEffect(() => {
        async function fetchData() {
            dispatch(permissionAction.getAll());
        }
        
        fetchData();
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="list-container">

            <Paper className="w-100 border">
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.label}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {permissions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = user[column.id];
                                            return (
                                                <TableCell key={column.label} align={column.align}>
                                                    {
                                                        column.id !== "role_permissions" ?
                                                            column.format && typeof value === 'number' ? column.format(value) : value
                                                        :
                                                            null
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={permissions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default Permissions;