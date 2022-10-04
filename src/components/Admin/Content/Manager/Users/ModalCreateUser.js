import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalCreateUser.scss';
import { FcPlus } from 'react-icons/fc';

const ModalCreateUser = (props) => {
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
        setUsername("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }

    return (
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-4">
                    <div className="col-md-6">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email}
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" value={password}
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="col-md-6 p-2">
                        <label className="form-label">Username:</label>
                        <input type="text" className="form-control" value={username}
                            onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="col-md-6 p-2">
                        <label className="form-label">Role:</label>
                        <select className="form-select" value={role}
                            onChange={(event) => setRole(event.target.value)}>
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
                                <input hidden type="file" id='labelUpload'
                                    onChange={(event) => handleUploadImage(event)} />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outline-primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalCreateUser;