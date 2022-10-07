import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../Users/ModalUser.scss';
import { postUpdateQuizForAdmin } from '../../../../../services/apiServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {

    const { show, setShow, dataUpdate, fetchQuiz } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
            setType(dataUpdate.type)
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShow(false);
        // setName("");
        // setDescription("");
        // setType("");
        // setPreviewImage("");
        // setImage("");
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
        let data = await postUpdateQuizForAdmin(dataUpdate.id, description, name, type, image);

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
        <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Update a Quiz
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-4">
                    <div className="col-md-6">
                        <label className="form-label">Name:</label>
                        <input type="text" className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Description:</label>
                        <input type="text" className="form-control"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)} />
                    </div>

                    <div className="col-md-12 p-2">
                        <label className="form-label">Type:</label>
                        <select className="form-select" value={type}
                            onChange={(event) => setType(event.target.value)}>
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title">Image Upload</h5>
                            </div>
                            <div className="card-content" >
                                <label className="card-body" htmlFor='labelUploadUpdate'>
                                    {previewImage ?
                                        <img src={previewImage} /> :
                                        <span>Image Preview</span>
                                    }
                                </label>
                                <input hidden type="file" id='labelUploadUpdate'
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
                    Update Quiz
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalUpdateQuiz;