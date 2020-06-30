import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

// material ui
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

// actions
import { permissionActions } from '../../actions';
import { roleActions } from '../../actions';

// components
import WipModal from '../Alerts/WIP';
import AppStyles from '../Common/useStyles';
import SuccessModal from '../Alerts/Successful';
import ConfirmationModal from '../Alerts/Confirmation';

// forms
import PermissionForm from '../Forms/Permission/PermissionForm';

// helpers
import { arrayHelpers } from '../../helpers';

const permissionsColumn = [
    { 
        id: 'name', 
        label: 'Permissions', 
        minWidth: 400 
    },
];

const rolesColumn = [
    { 
        id: 3, 
        label: 'ROLE_AUTHENTICATED', 
        mWidth: 50,
        align: 'center',
        format: (value) => value === 3 ? true : false,
    },
    {
        id: 2,
        label: 'ROLE_MAIN',
        minWidth: 50,
        align: 'center',
        format: (value) => value === 2 ? true : false,
    },
    {
        id: 1,
        label: 'ROLE_ADMIN',
        minWidth: 50,
        align: 'center',
        format: (value) => value === 1 ? true : false,
    },
]

function Permissions() {
   
    // table-related variables
    const classes = AppStyles();

    // permission-related variables
    const permissionsList = useSelector(state => state.permissions.items);
    const [selectedPermissionIndex, setSelectedPermissionIndex] = useState(0);
    const permissions = permissionsList ? permissionsList : [];
    const [deletePermissionId, setDeletePermissionId] = useState(-1);
    let permissionsToAdd = [];
    let permissionsToRemove = [];

    // modal-related variables
    const [wipModal, setWipModal] = useState(false);
    const [addPermissionModal, setAddPermissionModal] = useState(false);
    const [editPermissionModal, setEditPermissionModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);


    const dispatch = useDispatch();

    // Methods
    useEffect(() => {
        async function fetchData() {
            dispatch(permissionActions.getAll());
        }
        
        fetchData();
    }, [dispatch]);

    const handleUpdateRoleChanges = (checked, pid, rid) => {
        if (!checked) {
            const res = arrayHelpers.existsIn2dArray(permissionsToAdd, pid, rid);
            if (res) {
                const position = permissionsToAdd.indexOf([pid, rid]);
                permissionsToAdd.splice(position, 1);
            } else {
                const role = [pid, rid];
                permissionsToAdd.push(role);
            }
        } else {
            const res = arrayHelpers.existsIn2dArray(permissionsToRemove, pid, rid);
            if (res) {
                const position = permissionsToRemove.indexOf([pid, rid]);
                permissionsToRemove.splice(position, 1);
            } else {
                const role = [pid, rid];
                permissionsToRemove.push(role);
            }
        }
    }

    const handleSubmit = (e) => {
        if (permissionsToAdd.length > 0) {
            for (var i = 0; i < permissionsToAdd.length; i++) {
                //Do something
                const id = permissionsToAdd[i][1];
                dispatch(roleActions.addRolePermissions(permissionsToAdd[i], id));
            }
        }

        if (permissionsToRemove.length > 0) {
            for (var j = 0; j < permissionsToRemove.length; j++) {
                //Do something
                const id = permissionsToRemove[j][1];
                dispatch(roleActions.removeRolePermissions(permissionsToRemove[j], id));
            }
        }
    }

    const addPermissionForm = (
        <Modal
            show={addPermissionModal}
            onHide={() => setAddPermissionModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Permission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PermissionForm 
                    setAddPermissionModal={setAddPermissionModal} 
                    setSuccessModal={setSuccessModal}
                    action="add"
                />
            </Modal.Body>
        </Modal>
    );

    const editPermissionForm = (
        <Modal
            show={editPermissionModal}
            onHide={() => setEditPermissionModal(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Permission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PermissionForm 
                    setEditPermissionModal={setEditPermissionModal} 
                    setSuccessModal={setSuccessModal}
                    action="edit"
                    permission={permissions[selectedPermissionIndex]}
                    setConfirmModal={setConfirmModal}
                />
            </Modal.Body>
        </Modal>
    );

    const handleDeletePermission = (permissionId) => {
        dispatch(permissionActions.delete(permissionId));
    };

    return (
        <div className="list-container">
            <button className="btn btn-primary mt-3 mr-3 mb-3" onClick={() => {setAddPermissionModal(true)}}><FontAwesomeIcon icon={faPlus}/> Add Permission</button>
            {addPermissionForm}
            {editPermissionForm}
            <WipModal
                wipModal={wipModal}
                modalMessage="This action is work in progress. Sorry for the inconvenience."
                setWipModal={setWipModal}
            />
            <SuccessModal
                successModal={successModal}
                modalMessage="Permission successfully added!"
                setSuccessModal={setSuccessModal}
            />
            <ConfirmationModal 
                confirmModal={confirmModal}
                modalMessage="Are you sure?"
                deletePermissionId={deletePermissionId}
                handleDeletePermission={handleDeletePermission}
                setConfirmModal={setConfirmModal}
                pageLoc="permissions"
                setEditPermissionModal={setEditPermissionModal}
            />

            <form onSubmit={handleSubmit}>
                <Paper className="w-100 border">
                    <TableContainer className={classes.container}>
                        <Table stickyHeader size="small" aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                {permissionsColumn.map((column) => (
                                    <TableCell
                                        key={column.label}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                {rolesColumn.map((column) => (
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
                                {permissions.map((permission, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {
                                                permissionsColumn.map((column) => {
                                                    const value = permission[column.id];

                                                    return (
                                                        <TableCell style={{ cursor: 'pointer' }} key={column.label} align={column.align} onClick={() => {setEditPermissionModal(true); setSelectedPermissionIndex(index); setDeletePermissionId(permission.pid)}}>
                                                            {
                                                                column.format && typeof value === 'number' ? column.format(value) : value
                                                            }
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                            {
                                                rolesColumn.map((column, index) => {
                                                    return (
                                                        column.id === 3 ?
                                                            <TableCell key={column.id} align={column.align}>
                                                                {
                                                                    permission.roles.includes(column.id) ? 
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            defaultChecked={column.format(column.id)}
                                                                            onChange={() => {
                                                                                    handleUpdateRoleChanges(true, permission.pid, column.id);
                                                                                }
                                                                            }
                                                                        />
                                                                    :
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            onChange={() => {
                                                                                    handleUpdateRoleChanges(false, permission.pid, column.id);
                                                                                }
                                                                            }
                                                                        />
                                                                }
                                                            </TableCell>
                                                        :
                                                            null
                                                    );
                                                })
                                            }
                                            {
                                                rolesColumn.map((column, index) => {
                                                    return (
                                                        column.id === 2 ?
                                                            <TableCell key={column.id} align={column.align}>
                                                                {
                                                                    permission.roles.includes(column.id) ? 
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            defaultChecked={column.format(column.id)}
                                                                            onChange={() => {
                                                                                    handleUpdateRoleChanges(true, permission.pid, column.id);
                                                                                }
                                                                            }
                                                                        />
                                                                    :
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            onChange={() => {
                                                                                    handleUpdateRoleChanges(false, permission.pid, column.id);
                                                                                }
                                                                            }
                                                                        />
                                                                }
                                                            </TableCell>
                                                        :
                                                            null
                                                    );
                                                })
                                            }
                                            {
                                                rolesColumn.map((column, index) => {
                                                    return (
                                                        column.id === 1 ?
                                                            <TableCell key={column.id} align={column.align}>
                                                                {
                                                                    permission.roles.includes(column.id) ? 
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            defaultChecked={column.format(column.id)}
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(true, permission.pid, column.id);
                                                                                }
                                                                            }/>
                                                                    :
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(false, permission.pid, column.id);
                                                                                }
                                                                            }/>
                                                                }
                                                            </TableCell>
                                                        :
                                                            null
                                                    );
                                                })
                                            }
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <button type="submit" className="btn btn-primary mt-3">
                    Save Permissions
                </button>
            </form>
        </div>
    );
}

export default Permissions;