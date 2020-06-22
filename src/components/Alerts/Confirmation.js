import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Confirmation(props) {
    
    const deleting = useSelector(state => state.authentication.deleting);
    const [modalShow, setModalShow] = useState(props.confirmModal);
    const userId = props.userId

    useEffect(() => {
        setModalShow(props.confirmModal);
    }, [props.confirmModal]);

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
                <Button 
                    variant="secondary" 
                    onClick={() => {
                        setModalShow(false);
                        props.setConfirmModal(false);
                    }
                }
                >
                    No
                </Button>
                <Button 
                    variant="primary" 
                    onClick={() => {
                        
                            props.handleDeleteUser(userId); 

                            if (!deleting) {
                                setModalShow(false);
                                props.setConfirmModal(false);
                                window.location.reload(true);
                            }
                            // setTimeout(() => {
                            //     window.location.reload(true);
                            // }, 1000);
                        }
                    }
                >
                    {deleting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Yes
                </Button>
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