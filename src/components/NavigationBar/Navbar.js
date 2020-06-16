import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavLink } from 'react-bootstrap';

function NavBar() {

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <NavLink href={'/dashboard'} className="navbar-brand">
                    Sample
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink href='/about' className="nav-link">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href='/contact' className="nav-link">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href='/' className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href='/register' className="nav-link">Register</NavLink>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavBar;
