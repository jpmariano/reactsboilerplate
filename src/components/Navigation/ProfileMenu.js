import React, { useState, useRef, useEffect } from 'react';

// material ui
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';

// modal alerts
import WipModal from '../Alerts/WIP';

function ProfileMenu(props) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    // modal-related variables
    const [wipModal, setWipModal] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

  return (
    <>
        <WipModal
            wipModal={wipModal}
            modalMessage="This action is work in progress. Sorry for the inconvenience."
            setWipModal={setWipModal}
        />
        <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
        >
            <Avatar alt="Avatar" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} className="mt-2" id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem><a href="/profile" className="text-dark" style={{ textDecoration: 'none' }}>Profile</a></MenuItem>
                                {/* <MenuItem onClick={() => setWipModal(true)}>My account</MenuItem> */}
                                <MenuItem onClick={props.logout}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </>
  );
}

export default ProfileMenu;
