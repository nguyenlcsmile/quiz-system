import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUser.scss';
import { putUpdateUser } from '../../../../../services/apiServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const ModalUpdateUser = (props) => {

    const { show, setShow, fectchListUsers, dataUpdate, resetData } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShow(false);
        resetData();
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }


    const handleUpdateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, role, image);

        if (data && data.EC === 0) {
            navigate('/admins/manager-users');
            toast.success(data.EM);

            handleClose();
            // await fectchListUsers();
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
                    Update a user
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
                <Button variant="outline-primary" onClick={handleUpdateUser}>
                    Update User
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalUpdateUser;