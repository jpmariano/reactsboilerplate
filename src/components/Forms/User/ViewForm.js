import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// actions
import { roleActions } from '../../../actions';


function ViewForm(props) {
    const user = props.user ? props.user : null;
    const roles = useSelector(state => state.role.currentRole);
    const userRoles = roles ? roles : null;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(roleActions.getRole(user.users_roles[0].users_rolesid.rid))
    }, [dispatch, user.users_roles]);
    

    return (
        <List dense={true}>
            <ListItem>
                <Typography variant="h6" noWrap style={{ flex: 1 }}>
                    Name:
                </Typography>
                <ListItemText
                    primary={user.name}
                />
            </ListItem>
            <ListItem>
                <Typography variant="h6" noWrap style={{ flex: 1 }}>
                    Email:
                </Typography>
                <ListItemText
                    primary={user.username}
                />
            </ListItem>
            <ListItem>
                <Typography variant="h6" noWrap style={{ flex: 1 }}>
                    Status:
                </Typography>
                <ListItemText
                    primary={user.status === 1 ? 'Active' : 'Inactive'}
                />
            </ListItem>
            <ListItem>
                <Typography variant="h6" noWrap style={{ flex: 1 }}>
                    Role/s:
                </Typography>
                <ListItemText
                    primary={userRoles ? userRoles[0].name === 'ROLE_ADMIN' ? 'Administrator': '' : ''}
                />
            </ListItem>
        </List>
    )
}

export default ViewForm;
