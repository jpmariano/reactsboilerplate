import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrash, faEye, faArrowsAlt, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

// helpers
import { arrayHelpers } from '../../helpers';

const columns = [
    { 
        id: 'roles', 
        label: 'Roles', 
        minWidth: 300,
        maxWidth: 562
    },
    {
        id: 'weight',
        label: 'Weight',
        minWidth: 224,
        maxWidth: 224,
        align: 'center'
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 286,
        maxWidth: 286,
        align: 'center'
    }
]

function Roles() {
    // role-related variables
    const rolesList = useSelector(state => state.role.items);
    // const roles = rolesList ? rolesList : [];
    let roles = rolesList ? rolesList : [];
    roles = roles.sort((a, b) => (a.weight > b.weight) ? 1 : -1)
    const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
    const [deleteRoleId, setDeleteRoleId] = useState(-1);
    const [showWeight, setShowWeight] = useState(false);
    const weights = arrayHelpers.createArrayofNums(10);

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
                    role={roles[selectedRoleIndex]}
                />
            </Modal.Body>
        </Modal>
    );

    const handleDeleteRole = (roleId) => {
        dispatch(roleActions.delete(roleId));
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        const items = reorder(
            roles,
            result.source.index,
            result.destination.index
        );

        for (let i = 0; i < items.length; i++) {
            const data = {
                weight: i
            }
            roles[i].weight = i;
            // roles = roles.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
            dispatch(roleActions.updateRole(data, items[i].rid));
        }

        roles = items;
        
    }

    const handleWeightChange = (value, rid) => {
        const data = {
            weight: value
        }

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].rid === rid) {
                roles[i].weight = parseInt(value);
            }
        }
        
        roles = roles.sort((a, b) => (a.weight > b.weight) ? 1 : -1)

        dispatch(roleActions.updateRole(data, rid));
    }
    
    return (
        <div id="list-container">
            <button className="btn btn-primary mt-3 mr-3 mb-3" onClick={() => {setAddRoleModal(true)}}><FontAwesomeIcon icon={faPlus}/> Add Role</button>
            <div className="float-right">
                {showWeight ? 
                    <button className="btn btn-primary mt-3 mr-3 mb-3 float-rght" onClick={() => {setShowWeight(false); dispatch(roleActions.getAllRole());}}><FontAwesomeIcon icon={faEyeSlash}/>&nbsp;&nbsp;Hide row weights</button>
                :
                    <button className="btn btn-primary mt-3 mr-3 mb-3 float-rght" onClick={() => {setShowWeight(true); dispatch(roleActions.getAllRole());}}><FontAwesomeIcon icon={faEye}/>&nbsp;&nbsp;Show row weights</button>
                }
            </div>

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
                deleteRoleId={deleteRoleId}
                handleDeleteRole={handleDeleteRole}
                setConfirmModal={setConfirmModal}
                pageLoc="roles"
                setEditRoleModal={setEditRoleModal}
            />

            <Paper className="w-100 border">
                <TableContainer className={classes.container}>
                    {showWeight ?
                        <Table stickyHeader size="small" aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.label}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roles.map((role, index) => {
                                    return (
                                        <TableRow 
                                            hover 
                                            role="checkbox" 
                                            tabIndex={-1} 
                                            key={index}
                                        >
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {
                                                            column.id === 'roles' ?
                                                                <span>{role.name}</span>
                                                            :
                                                                column.id === 'weight' ?
                                                                    <select className="w-20 m-auto form-control" defaultValue={role.weight} onChange={(e) => handleWeightChange(e.target.value, role.rid)}>
                                                                        {weights.map((item, index) => (
                                                                            <option key={'option-' + index}>{item.value}</option>
                                                                        ))}
                                                                    </select>
                                                                :
                                                                    <div>
                                                                        <IconButton className="p-2" onClick={() => {setWipModal(true);}}>
                                                                            <FontAwesomeIcon icon={faEye} className="text-primary"/>
                                                                        </IconButton>
                                                                        <IconButton className="p-2" onClick={() => {setSelectedRoleIndex(index); setEditRoleModal(true);}}>
                                                                            <FontAwesomeIcon icon={faPencilAlt} className="text-primary"/>
                                                                        </IconButton>
                                                                        <IconButton className="p-2" onClick={() => {setDeleteRoleId(role.rid); setConfirmModal(true);}}>
                                                                            <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                                                        </IconButton>
                                                                    </div>
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    :
                                            
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Table stickyHeader size="small" aria-label="sticky table" >
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            column.label === 'Roles' || column.label === 'Action' ?
                                                <TableCell
                                                    key={column.label}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            :
                                                <TableCell key={column.label} align={column.align} style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}></TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <Droppable droppableId="columns">
                                    {(provided) => (
                                        <TableBody ref={provided.innerRef}>
                                            {roles.map((role, index) => {
                                                return (
                                                    <Draggable
                                                        key={index}
                                                        draggableId={'role-' + index}
                                                        index={index}>
                                                        {(provided) => (
                                                            <TableRow 
                                                                hover 
                                                                role="checkbox" 
                                                                tabIndex={-1} 
                                                                key={index}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                id={'role-' + index}
                                                            >
                                                                {columns.map((column) => {
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
                                                                            {
                                                                                column.id === 'roles' ?
                                                                                    <span><FontAwesomeIcon icon={faArrowsAlt}/>&nbsp;&nbsp;&nbsp;&nbsp;{role.name}</span>
                                                                                :
                                                                                    column.id === 'weight' ?
                                                                                        <span></span>
                                                                                    :
                                                                                        <div>
                                                                                            <IconButton className="p-2" onClick={() => {setWipModal(true);}}>
                                                                                                <FontAwesomeIcon icon={faEye} className="text-primary"/>
                                                                                            </IconButton>
                                                                                            <IconButton className="p-2" onClick={() => {setSelectedRoleIndex(index); setEditRoleModal(true);}}>
                                                                                                <FontAwesomeIcon icon={faPencilAlt} className="text-primary"/>
                                                                                            </IconButton>
                                                                                            <IconButton className="p-2" onClick={() => {setDeleteRoleId(role.rid); setConfirmModal(true);}}>
                                                                                                <FontAwesomeIcon icon={faTrash} className="text-danger"/>
                                                                                            </IconButton>
                                                                                        </div>
                                                                            }
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </TableBody>
                                    )}
                                </Droppable>
                            </Table>
                        </DragDropContext>
                    }
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