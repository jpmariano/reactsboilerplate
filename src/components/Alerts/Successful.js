import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function Successful(props) {

    const [modalShow, setModalShow] = useState(props.modalShow);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        setModalShow(props.modalShow);
    }, [props.modalShow]);

    if (props.location === 'register') {
        if (isRegistered) {
            return <Redirect to="/login" />;
        }
    }

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
                        <Button variant="primary" onClick={() => {setModalShow(false); setIsRegistered(true);}}>Okay</Button>
                    :
                        <Button variant="primary" onClick={() => setModalShow(false)}>Okay</Button>
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