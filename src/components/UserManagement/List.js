import React, { Component } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import AddUserForm from './AddUserForm';

class List extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        };
        this.setModalShow = this.setModalShow.bind(this);
        
    }

    setModalShow = (value) => {
        this.setState({
            modalShow: value,
        });
    }

    render() {

        const addUserModal = (
            <Modal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddUserForm />
                </Modal.Body>
            </Modal>
        );

        return (
            <div className="container-fluid">

                <button className="btn btn-primary mt-3 mr-3 mb-3" onClick={() => this.setModalShow(true)}><FontAwesomeIcon icon={faPlus}/> Add User</button>

                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        <th>Table heading</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
                {addUserModal}
            </div>
        );
    }
}

export default List