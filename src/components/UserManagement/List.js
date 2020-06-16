import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import AddUserForm from './UserForm';
import SuccessModal from '../Alerts/Successful';

function List() {
    
    const [modalShow, setModalShow] = useState(false);

    const addUserModal = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddUserForm setModalShow={setModalShow}/>
            </Modal.Body>
        </Modal>
    );

    return (
        <div className="container-fluid">

            <button className="btn btn-primary mt-3 mr-3 mb-3" onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faPlus}/> Add User</button>

            
            {addUserModal}
            <SuccessModal modalShow={modalShow} />
        </div>
    );
}

export default List