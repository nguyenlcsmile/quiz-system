import Select from 'react-select';
import { getQuizbyAdmin, getAllUsers, postAssignQuiz } from '../../../../../services/apiServices';
import { useState, useEffect } from 'react';
import './AssignQuiz.scss';
import { toast } from 'react-toastify';

const AssignQuiz = (props) => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [listQuiz, setListQuiz] = useState([]);
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        fectchListUsers();
        fetchQuiz()
    }, []);

    const fetchQuiz = async () => {
        let res = await getQuizbyAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT.map(quiz => {
                return {
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.name}`
                }
            }));
        }
    }

    const fectchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT.map(user => {
                return {
                    value: user.id,
                    label: `${user.id} - ${user.username} - ${user.email}`
                }
            }));
        }
    }

    const handleAssignQuiz = async () => {
        let res = await postAssignQuiz(+selectedQuiz.value, +selectedUser.value);
        // console.log(res);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
    }

    return (
        <>
            <div className='assign-quiz-containter mt-4'>
                <div className='select-quiz-content'>
                    <Select className='selected-quiz fs-4'
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        placeholder={"Quiz style..."}
                    />
                </div>
                <div className='select-user-content'>
                    <Select className='selected-quiz fs-4'
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUsers}
                        placeholder={"Quiz style..."}
                    />
                </div>
            </div>

            <div className='mt-4'>
                <button className='btn btn-warning fs-1 mx-2 mt-2'
                    onClick={() => handleAssignQuiz()}>
                    Assign</button>
            </div>
        </>
    )
}

export default AssignQuiz;