import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Admin/Content/Manager/Users/ModalUser.scss';

const ModalResult = (props) => {

    const { show, setShow, dataResultQuiz } = props;

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} size='lg' backdrop="static"
            aria-labelledby="contained-modal-title-vcenter" centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Result Quiz
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12 fs-1">
                    <div>Total Questions: <b>{dataResultQuiz.countTotal}</b></div>
                    <div>Total Question Correct: <b>{dataResultQuiz.countCorrect}</b></div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={handleClose}>
                    Show Answers
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalResult;