import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUser.scss';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';

const ModalViewUser = (props) => {
    const { dataView, resetData } = props;

    const { show, setShow } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        resetData();
    };

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            //update state
            setEmail(dataView.email)
            setUsername(dataView.username)
            setRole(dataView.role)
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            }
        }
    }, [dataView]);

    return (
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Profile a user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-4">
                    <div className="col-md-6">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control"
                            value={email} disabled />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control"
                            value={password} disabled />
                    </div>
                    <div className="col-md-6 p-2">
                        <label className="form-label">Username:</label>
                        <input type="text" className="form-control"
                            value={username} disabled />
                    </div>
                    <div className="col-md-6 p-2">
                        <label className="form-label">Role:</label>
                        <select className="form-select"
                            value={role} disabled>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Image Upload</h5>
                            </div>
                            <div className="card-content" >
                                <label className="card-body" htmlFor='labelUpload'>
                                    {previewImage ?
                                        <img src={previewImage} /> :
                                        <span>Image Preview</span>
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalViewUser;