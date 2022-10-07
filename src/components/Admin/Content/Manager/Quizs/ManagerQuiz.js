import './ManagerQuiz.scss';
import Accordion from 'react-bootstrap/Accordion';
import Select from 'react-select';
import { useState } from 'react';
import TableQuiz from './TableQuiz';
import { toast } from 'react-toastify';
import { postCreateQuiz } from '../../../../../services/apiServices';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManagerQuiz = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [isFetchQuiz, setIsFetchQuiz] = useState(false);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handleCreateQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is requred')
            return;
        }

        let res = await postCreateQuiz(name, description, type?.value, image);
        // console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setImage(null);
            setType("");
            setPreviewImage("")
            setIsFetchQuiz(!isFetchQuiz);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <>
            <div className="manager-title">
                <div className='row'>
                    <h3>Manager Quizzes</h3>
                </div>
            </div>

            <div className='manager-quiz-content'>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Add new quiz</Accordion.Header>
                        <Accordion.Body>
                            <div className="add-new">
                                <fieldset className="border rounded-3 p-3">
                                    <legend className="float-none w-auto px-3 fs-3">Description new quiz</legend>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control"
                                            placeholder='your quiz name'
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label>Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control"
                                            placeholder='description'
                                            value={description}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                        <label>Description</label>
                                    </div>
                                    <div className='my-3 fs-5'>
                                        <Select
                                            defaultValue={type}
                                            onChange={setType}
                                            options={options}
                                            placeholder={"Quiz style..."}
                                        />
                                    </div>
                                    <div className='form-control'>
                                        <div className='card-header'>
                                            <label className="card-title">Image Upload</label>
                                        </div>
                                        <label className="card-body" htmlFor='labelUpload'>
                                            {previewImage ?
                                                <img src={previewImage} />
                                                :
                                                "Preview Image"
                                            }
                                        </label>
                                    </div>
                                    <input type="file" className="form-control" id="labelUpload" hidden
                                        onChange={(event) => handleUploadImage(event)}
                                    />

                                    <div className='mt-4'>
                                        <button className='btn btn-primary'
                                            onClick={() => handleCreateQuiz()}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className='table-quiz mb-5'>
                <TableQuiz
                    isFetchQuiz={isFetchQuiz}
                />
            </div>
        </>
    )
}

export default ManagerQuiz;