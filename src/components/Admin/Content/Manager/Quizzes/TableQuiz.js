import { useEffect, useState } from "react";
import { getQuizbyAdmin } from "../../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { doFetchQuiz } from '../../../../../redux/action/fetchAction';

const TableQuiz = (props) => {
    const isFetch = useSelector(state => state.fetchQuiz.isFetch);

    const [listQuiz, setListQuiz] = useState([]);
    const [showModalDeleteQuiz, setModalDeleteQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [quizUpdate, setQuizUpdate] = useState({});
    const [quizDelete, setQuizDelete] = useState({});

    useEffect(() => {
        fetchQuiz()
    }, [isFetch]);


    const fetchQuiz = async () => {
        let res = await getQuizbyAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    const handleDeleteQuiz = (quiz) => {
        setQuizDelete(quiz);
        setModalDeleteQuiz(true);
    }

    const handleUpdateQuiz = (quiz) => {
        setQuizUpdate(quiz);
        setShowModalUpdateQuiz(true);
    }

    return (
        <>
            <div className="table-quiz-name">
                <h2>Table Quizzes</h2>
            </div>

            <section>
                <div className="row">
                    <div className="card">
                        <div className='card-content'>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-lg mb-0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th width="30%">Name</th>
                                                <th width="30%">Description</th>
                                                <th>Type</th>
                                                <th width="20%">ACTIONs</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {listQuiz && listQuiz.length > 0 &&
                                                listQuiz.map((quiz, index) => {
                                                    return (
                                                        <tr key={`quiz-${index}`}>
                                                            <td className="text-bold-500">{quiz.id}</td>
                                                            <td>{quiz.name}</td>
                                                            <td className="text-bold-500">{quiz.description}</td>
                                                            <td className="text-bold-500">{quiz.difficulty}</td>
                                                            <td className="text-bold-500">
                                                                <button className='btn btn-warning'
                                                                    onClick={() => handleUpdateQuiz(quiz)}>
                                                                    Update
                                                                </button>
                                                                <button className='btn btn-danger mx-4'
                                                                    onClick={() => handleDeleteQuiz(quiz)}>
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <ModalDeleteQuiz
                                        show={showModalDeleteQuiz}
                                        setShow={setModalDeleteQuiz}
                                        dataDelete={quizDelete}
                                        fetchQuiz={fetchQuiz}
                                    />

                                    <ModalUpdateQuiz
                                        show={showModalUpdateQuiz}
                                        setShow={setShowModalUpdateQuiz}
                                        dataUpdate={quizUpdate}
                                        fetchQuiz={fetchQuiz}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default TableQuiz;