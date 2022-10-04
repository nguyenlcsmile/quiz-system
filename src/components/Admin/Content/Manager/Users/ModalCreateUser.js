import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalCreateUser = (props) => {
    const { show, setShow } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title className='fs-1 mx-5'>
                        Add new user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label fs-4">Email</label>
                            <input type="email" className="form-control p-2 fs-4" value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fs-4">Password</label>
                            <input type="password" className="form-control p-2 fs-4" value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6 p-2">
                            <label className="form-label fs-4">Username</label>
                            <input type="text" className="form-control p-2 fs-4" value={username}
                                onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-6 p-2">
                            <label className="form-label fs-4">Role</label>
                            <select className="form-select p-2 fs-4" value={role}
                                onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;