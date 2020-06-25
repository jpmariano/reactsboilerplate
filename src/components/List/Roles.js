import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

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
import WipModal from '../Alerts/WIP';
import AppStyles from '../Common/useStyles';
import SuccessModal from '../Alerts/Successful';
import ConfirmationModal from '../Alerts/Confirmation';

// forms
import RoleForm from '../Forms/Role/RoleForm';

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
    const [selectedPermissionIndex, setSelectedRoleIndex] = useState(0);
    const [deletePermissionId, setDeleteRoleId] = useState(-1);

    // table-related variables
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = AppStyles();

    // modal-related variables
    const [wipModal, setWipModal] = useState(false);
    const [addRoleModal, setAddRoleModal] = useState(false);
    const [editRoleModal, setEditRoleModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

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

    const addRoleForm = (
        <Modal
            show={addRoleModal}
            onHide={() => setAddRoleModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RoleForm 
                    setAddRoleModal={setAddRoleModal} 
                    setSuccessModal={setSuccessModal}
                    action="add"
                />
            </Modal.Body>
        </Modal>
    );

    const editRoleForm = (
        <Modal
            show={editRoleModal}
            onHide={() => setEditRoleModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RoleForm 
                    setEditRoleModal={setEditRoleModal} 
                    setSuccessModal={setSuccessModal}
                    action="edit"
                    permission={roles[selectedPermissionIndex]}
                    setConfirmModal={setConfirmModal}
                />
            </Modal.Body>
        </Modal>
    );

    const handleDeletePermission = (roleId) => {
        // dispatch(permissionActions.delete(roleId));
    };
    
    return (
        <div id="list-container">
            <button className="btn btn-primary mt-3 mr-3 mb-3" onClick={() => {setAddRoleModal(true)}}><FontAwesomeIcon icon={faPlus}/> Add Role</button>
            {addRoleForm}
            {editRoleForm}
            <WipModal
                wipModal={wipModal}
                modalMessage="This action is work in progress. Sorry for the inconvenience."
                setWipModal={setWipModal}
            />
            <SuccessModal
                successModal={successModal}
                modalMessage="Role successfully added!"
                setSuccessModal={setSuccessModal}
            />
            <ConfirmationModal 
                confirmModal={confirmModal}
                modalMessage="Are you sure?"
                deletePermissionId={deletePermissionId}
                handleDeletePermission={handleDeletePermission}
                setConfirmModal={setConfirmModal}
                pageLoc="roles"
                setEditRoleModal={setEditRoleModal}
            />

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
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        column.id === 'roles' ?
                                                            role.name
                                                        :
                                                            <>
                                                                <IconButton className="p-2" onClick={() => {setWipModal(true);}}>
                                                                    <FontAwesomeIcon icon={faEye} className="text-primary"/>
                                                                </IconButton>
                                                                <IconButton className="p-2" onClick={() => {setWipModal(true);}}>
                                                                    <FontAwesomeIcon icon={faPencilAlt} className="text-primary"/>
                                                                </IconButton>
                                                                <IconButton className="p-2" onClick={() => {setWipModal(true);}}>
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