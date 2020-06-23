import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
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
import IconButton from '@material-ui/core/IconButton';

// actions
import { userActions } from '../../actions';

// components
import SuccessModal from '../Alerts/Successful';
import ConfirmationModal from '../Alerts/Confirmation';
import WipModal from '../Alerts/WIP';
import AppStyles from '../Common/useStyles';

// forms
import UserForm from '../Forms/UserForm';
import ViewForm from '../Forms/ViewForm';


const columns = [
    { 
        id: 'name', 
        label: 'Name', 
        minWidth: 170 
    },
    { 
        id: 'username', 
        label: 'Email', 
        minWidth: 170
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        align: 'center',
        format: (value) => value === 1 ? 'Active' : 'Inactive',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
    },
];

function List() {
    // user-related variables
    const userList = useSelector(state => state.users.items);
    const users = userList ? userList : [];
    const [deleteUserId, setDeleteUserId] = useState(-1);
    const [selectedUserIndex, setSelectedUserIndex] = useState(0);

    // modal-related variables
    const [addUserModal, setAddUserModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [viewUserModal, setViewUserModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [wipModal, setWipModal] = useState(false);

    // table-related variables
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = AppStyles();

    const dispatch = useDispatch();

    const addUserForm = (
        <Modal
            show={addUserModal}
            onHide={() => setAddUserModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm 
                    setAddUserModal={setAddUserModal} 
                    setSuccessModal={setSuccessModal}
                    divClasses="user-form"
                    formClasses="userForm"
                    formDivClasses="user-form-fields"
                    pageLoc="users"
                    action="add"
                />
            </Modal.Body>
        </Modal>
    );
    
    const editUserForm = (
        <Modal
            show={editUserModal}
            onHide={() => setEditUserModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserForm 
                    setEditUserModal={setEditUserModal} 
                    setSuccessModal={setSuccessModal}
                    divClasses="user-form"
                    formClasses="userForm"
                    formDivClasses="user-form-fields"
                    pageLoc="users"
                    action="edit"
                    user={users[selectedUserIndex]}
                />
            </Modal.Body>
        </Modal>
    );

    const viewUserForm = (
        <Modal
            show={viewUserModal}
            onHide={() => setViewUserModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ViewForm
                    user={users[selectedUserIndex]}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary" 
                    onClick={() => {
                        setViewUserModal(false);
                        }
                    }
                >
                    Okay
                </Button>
            </Modal.Footer>
        </Modal>
    );

    // Methods
    useEffect(() => {
        async function fetchData() {
            dispatch(userActions.getAll());
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

    const handleDeleteUser = (userId) => {
        dispatch(userActions.delete(userId));
    }

    return (
        <div id="list-container">
            <button className="btn btn-primary mt-3 mr-3 mb-3" onClick={() => setAddUserModal(true)}><FontAwesomeIcon icon={faPlus}/> Add User</button>
            {addUserForm}
            {editUserForm}
            {viewUserForm}
            <SuccessModal
                successModal={successModal}
                modalMessage="User successfully added!"
                setSuccessModal={setSuccessModal}
            /> 
            <ConfirmationModal 
                confirmModal={confirmModal}
                modalMessage="Are you sure?"
                userId={deleteUserId}
                handleDeleteUser={handleDeleteUser}
                setConfirmModal={setConfirmModal}
            />
            <WipModal
                wipModal={wipModal}
                modalMessage="This action is work in progress. Sorry for the inconvenience."
                setWipModal={setWipModal}
            />

            <Paper className="w-100 border">
                <TableContainer className={classes.container}>
                    <Table stickyHeader size="small" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = user[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        column.id !== "action" ?
                                                            column.format && typeof value === 'number' ? column.format(value) : value
                                                        :
                                                            <>
                                                                <IconButton className="p-2" onClick={() => {setViewUserModal(true); setSelectedUserIndex(index);}}>
                                                                    <FontAwesomeIcon icon={faEye} className="text-primary"/>
                                                                </IconButton>
                                                                <IconButton className="p-2" onClick={() => {setEditUserModal(true); setSelectedUserIndex(index);}}>
                                                                    <FontAwesomeIcon icon={faPencilAlt} className="text-primary"/>
                                                                </IconButton>
                                                                <IconButton className="p-2" onClick={() => {setDeleteUserId(user.uid); setConfirmModal(true)}}>
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default List