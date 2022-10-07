import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Users/ModalUser.scss';
import { toast } from 'react-toastify';
import { deteleQuizForAdmin } from '../../../../../services/apiServices';

const ModalDeleteQuiz = (props) => {

    const { show, setShow, dataDelete, fetchQuiz } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleDeleteQuiz = async () => {

        let data = await deteleQuizForAdmin(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchQuiz();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirm Delete the Quiz ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12 fs-1 text-center">
                    Are you sure to delte this quiz. Name = <b>dataDelete.name</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={handleDeleteQuiz}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalDeleteQuiz;