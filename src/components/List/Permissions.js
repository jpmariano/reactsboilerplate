import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { permissionAction } from '../../actions';
import { roleActions } from '../../actions';

// components
import AppStyles from '../Common/useStyles';

// helpers
import { arrayHelpers } from '../../helpers';

const permissionsColumn = [
    { 
        id: 'name', 
        label: 'Permissions', 
        minWidth: 750 
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
    const permissions = permissionsList ? permissionsList : [];
    // let permissionRole = [];
    let permissionsToUpdate = [];

    const dispatch = useDispatch();

    // Methods
    useEffect(() => {
        async function fetchData() {
            dispatch(permissionAction.getAll());
        }
        
        fetchData();
    }, [dispatch]);

    const handleUpdateRoleChanges = (pid, rid) => {
        const res = arrayHelpers.existsIn2dArray(permissionsToUpdate, pid, rid);
        if (res) {
            const position = permissionsToUpdate.indexOf([pid, rid]);
            permissionsToUpdate.splice(position, 1);
        } else {
            const role = [pid, rid];
            permissionsToUpdate.push(role);
        }
        
        console.log(permissionsToUpdate);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (permissionsToUpdate.length > 0) {
            for (var i = 0; i < permissionsToUpdate.length; i++) {
                //Do something
                const id = permissionsToUpdate[i][1];
                dispatch(roleActions.updateRolePermissions(permissionsToUpdate[i], id));
            }
            console.log(permissionsToUpdate);
        }
    }

    return (
        <div className="list-container">
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
                                                        <TableCell key={column.label} align={column.align}>
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
                                                                            checked={column.format(column.id)}
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(permission.pid, column.id);
                                                                                }
                                                                            }
                                                                        />
                                                                    :
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(permission.pid, column.id);
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
                                                                            checked={column.format(column.id)}
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(permission.pid, column.id);
                                                                                }
                                                                            }
                                                                        />
                                                                    :
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(permission.pid, column.id);
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
                                                                            checked={column.format(column.id)}
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(permission.pid, column.id);
                                                                                }
                                                                            }/>
                                                                    :
                                                                        <Checkbox
                                                                            key={index}
                                                                            color="primary"
                                                                            onChange={() => {
                                                                                    console.log(permission.pid); console.log(column.id);
                                                                                    handleUpdateRoleChanges(permission.pid, column.id);
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