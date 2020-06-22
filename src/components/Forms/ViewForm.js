import React from 'react';

// material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


function ViewForm(props) {
    const user = props.user ? props.user : null;
    console.log(user)
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
        </List>
    )
}

export default ViewForm;
