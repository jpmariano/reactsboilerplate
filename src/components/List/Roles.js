import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

// material ui
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';


// actions
import { roleActions } from '../../actions';

// components
import AppStyles from '../Common/useStyles';

const columns = [
    { 
        id: 'roles', 
        label: 'Roles', 
        minWidth: 500,
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 50,
        align: 'center'
    }
]

function Roles() {
    // role-related variables
    const rolesList = useSelector(state => state.role.items);
    const roles = rolesList ? rolesList : [];

    // table-related variables
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = AppStyles();

    const dispatch = useDispatch();

    // Methods
    useEffect(() => {
        async function fetchData() {
            dispatch(roleActions.getAllRole());
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
        <div id="list-container">
            <button className="btn btn-primary mt-3 mr-3 mb-3" onClick={() => {console.log('add')}}><FontAwesomeIcon icon={faPlus}/> Add Role</button>
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
                            {roles.map((role, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            return (
                                                <TableCell key={role.rid} align={column.align}>
                                                    {
                                                        column.id === 'roles' ?
                                                            role.name
                                                        :
                                                            <>
                                                                <IconButton className="p-2" onClick={() => {console.log('view');}}>
                                                                    <FontAwesomeIcon icon={faEye} className="text-primary"/>
                                                                </IconButton>
                                                                <IconButton className="p-2" onClick={() => {console.log('edit');}}>
                                                                    <FontAwesomeIcon icon={faPencilAlt} className="text-primary"/>
                                                                </IconButton>
                                                                <IconButton className="p-2" onClick={() => {console.log('delete');}}>
                                                                    <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                                                </IconButton>
                                                            </>
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
                    count={roles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default Roles