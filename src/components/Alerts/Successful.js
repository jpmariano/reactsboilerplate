import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Successful(props) {

    const [modalShow, setModalShow] = useState(props.successModal);

    useEffect(() => {
        setModalShow(props.successModal);
    }, [props.successModal]);

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
                {props.modalMessage}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.location === 'register' ?
                        <Button variant="primary" onClick={() => {setModalShow(false); props.setSuccessModal(false);}}>Okay</Button>
                    :
                        <Button variant="primary" onClick={() => {setModalShow(false); window.location.reload(true); props.setSuccessModal(false)}}>Okay</Button>
                }
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