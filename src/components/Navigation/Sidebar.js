import React from 'react';
import clsx from 'clsx';

// matirial ui
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

// navitems
import NavItems from './NavItems';
import ListItemLink from '../Common/ListItemLink';

const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "1rem",
            }
        }
    }
});

function Sidebar(props) {
    return (
        <Drawer
            variant="permanent"
            className={clsx(props.classes.drawer, {
                [props.classes.drawerOpen]: props.open,
                [props.classes.drawerClose]: !props.open,
            }) + ' main-sidebar'}
            classes={{
                paper: clsx({
                    [props.classes.drawerOpen]: props.open,
                    [props.classes.drawerClose]: !props.open,
                }),
            }}
        >
            <div className={props.classes.toolbar}>
                <Typography variant="h6" noWrap style={{ flex: 1 }} className="navbar-brand">
                    <a className="navbar-item" href="/dashboard">React Boilerplate</a>
                </Typography>
                <IconButton onClick={props.handleDrawerClose}>
                    {props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {NavItems.map((item, index) => (
                    <ListItemLink button component="a" href={item.url} key={index}>
                        {
                            props.open ?
                                <ListItemIcon>
                                    <Icon>{item.icon}</Icon>
                                </ListItemIcon>
                            :
                                <MuiThemeProvider theme={theme}>
                                <Tooltip title={item.name} placement="right" arrow TransitionComponent={Zoom} className={props.classes.tooltip}>
                                    <ListItemIcon>
                                        <Icon>{item.icon}</Icon>
                                    </ListItemIcon>
                                </Tooltip>
                                </MuiThemeProvider>
                        }
                        <ListItemText primary={item.name} />
                    </ListItemLink>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
