import './ListQuiz.scss';
import { getQuizByUser } from '../../services/apiServices';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ListQuiz = (props) => {
    const account = useSelector(state => state.user.account)
    const [arrDataQuiz, setArrDataQuiz] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        handleGetDataQuiz();
    }, [])

    const handleGetDataQuiz = async () => {
        let res = await getQuizByUser();
        console.log(res)
        if (res && res.EC === 0) {
            setArrDataQuiz(res.DT);
        }
    }
    return (
        <>
            <div className='container'>
                <div className="row mt-3">
                    {arrDataQuiz && arrDataQuiz.length > 0 &&
                        arrDataQuiz.map((quiz, index) => {
                            return (
                                <div className="col-6 col-lg-3 p-3" key={`quiz-${index}`}>
                                    <div className="card mx-2">
                                        <div className="card-header">
                                            <h5 className="card-title">
                                                <span className='btn btn-secondary mx-2'>Quiz {index + 1}</span>
                                                {quiz.description}
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <img src={`data:image/jpeg;base64,${quiz.image}`}
                                                className="me-1"
                                                alt="Avatar" width="100%" height="230px" />

                                            <button className='btn btn-primary'
                                                onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                            >
                                                Start now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
            </div>

        </>
    )
}

export default ListQuiz;