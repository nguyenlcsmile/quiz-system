import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUser.scss';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../../../services/apiServices';

const ModalDeleteUser = (props) => {

    const { show, setShow, fectchListUsers, dataDelete, resetData } = props;

    const handleClose = () => {
        setShow(false);
        resetData();
    };

    const handleDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fectchListUsers();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(props.currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirm Delete the User ?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12 fs-1 text-center">
                    Are you sure to delte this user. email =
                    <b>
                        {dataDelete && dataDelete.email ? dataDelete.email : ''}
                    </b>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={handleDeleteUser}>
                    Delete User
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalDeleteUser;