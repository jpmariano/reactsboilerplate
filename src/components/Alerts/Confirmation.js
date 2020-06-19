import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Confirmation(props) {

    const [modalShow, setModalShow] = useState(props.modalShow);
    const userId = props.userId

    useEffect(() => {
        setModalShow(props.modalShow);
    }, [props.modalShow]);

    const confirmationMsg = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.modalMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalShow(false)}>No</Button>
                <Button variant="primary" onClick={() => {setModalShow(false); props.handleDeleteUser(userId); }}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            {confirmationMsg}
        </>
    );
}

export default Confirmation