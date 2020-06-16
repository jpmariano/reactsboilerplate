import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'

function Successful(props) {

    const [modalShow, setModalShow] = useState(props.modalShow);

    useEffect(() => {
        setModalShow(props.modalShow);
    }, [props.modalShow]);

    const successMsg = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                User successfully added!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setModalShow(false)}>Okay</Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            {successMsg}
        </>
    );
}

export default Successful