import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function WIP(props) {
    
    const [modalShow, setModalShow] = useState(props.wipModal);

    useEffect(() => {
        setModalShow(props.wipModal);
    }, [props.wipModal]);

    const wipMsg = (
        <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Work in progress</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.modalMessage}
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary" 
                    onClick={() => {
                            setModalShow(false);
                            props.setWipModal(false);
                        }
                    }
                >
                    Okay
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            {wipMsg}
        </>
    );
}

export default WIP;
