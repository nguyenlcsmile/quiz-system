import Select from 'react-select';
import './QuizQA.scss';
import { RiImageAddFill } from 'react-icons/ri';
import { BsCalendarPlus, BsCalendarMinus } from 'react-icons/bs';
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import {
    getQuizbyAdmin, postQuestionsForQuiz,
    postAnswersForQuestion, getQuestionAnswerForQuiz, deleteAnwser
}
    from '../../../../../services/apiServices';

import { toast } from 'react-toastify';

const QuizQA = () => {

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreView] = useState(
        {
            url: "",
            title: ""
        }
    );

    const initDataQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]

    const [questions, setQuestions] = useState([]);
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchQAForQuiz();
    }, [selectedQuiz]);

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

    const fetchQAForQuiz = async () => {
        if (!_.isEmpty(selectedQuiz)) {
            let res = await getQuestionAnswerForQuiz(+selectedQuiz.value);

            if (res && res.EC === 0) {
                setQuestions(res.DT.qa);
            }
        }

    }

    const handleAddRemoveAnswers = async (type, questionId, answerId) => {
        // console.log('>>> Check ', type, questionId);
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(question => question.id === questionId);

        if (type === 'ADD') {
            if (index > -1) {
                // console.log(questionsClone[index]);
                let res = await postAnswersForQuestion('description', false, +questionsClone[index].id)
                if (res && res.EC === 0) {
                    const newAnswer = {
                        id: res.DT.id,
                        description: res.DT.description,
                        isCorrect: res.DT.correct_answer
                    }

                    questionsClone[index].answers.push(newAnswer);
                    setQuestions(questionsClone);
                    toast.success(res.EM);
                }
            }
        }

        if (type === 'REMOVE') {
            if (index > -1) {
                let res = await deleteAnwser(answerId);
                if (res && res.EC === 0) {
                    questionsClone[index].answers = questionsClone[index].answers.filter(question => question.id !== res.DT.id);
                    setQuestions(questionsClone)
                    toast.success(res.EM);
                }
            }
        }
    }

    return (
        <>
            <div className='manager-questions-content'>
                <div className='mb-4 mt-4'>
                    <label className='mb-2 fs-2'>Select Quiz:</label>
                    <Select className='selected-quiz'
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        placeholder={"Quiz style..."}
                    />
                </div>

                <div className='questions-content'>
                    <label className='mb-2 fs-2'>Update Questions:</label>

                    {questions && questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <div key={question.id} className='mb-5'>
                                    <div key={question.id} className='questions-main mb-3'>
                                        <div className="form-floating">
                                            <input type="email" className="form-control"
                                                placeholder="name@example.com"
                                                value={question.description}

                                            />
                                            <label>Question {index + 1} 's description</label>
                                        </div>

                                        <div className='questions-image'>
                                            <label style={{ cursor: 'pointer' }} htmlFor={question.id}>
                                                <RiImageAddFill className='icon-images' />
                                            </label>
                                            <input type='file' hidden id={question.id}

                                            />
                                        </div>
                                        <span className='fs-4 ml-2' style={{ cursor: 'pointer' }}>
                                            {question.imageName ?
                                                <span>
                                                    {question.imageName}
                                                </span>
                                                :
                                                '0 file image upload'
                                            }
                                        </span>

                                        <div className='btn-add-question'>
                                            <BsCalendarPlus className='icon-add'

                                            />
                                            {questions.length > 1 &&
                                                <BsCalendarMinus className='icon-remove'

                                                />
                                            }
                                        </div>
                                    </div>

                                    {question.answers && question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div key={answer.id} className='answers-main'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"

                                                        />
                                                    </div>
                                                    <div className="form-floating">
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="name@example.com"
                                                            value={answer.description}

                                                        />
                                                        <label>Answer {index + 1}</label>
                                                    </div>
                                                    <div className='btn-add-answer'>
                                                        <FiPlusSquare className='icon-add'
                                                            onClick={() => handleAddRemoveAnswers('ADD', question.id, answer.id)}
                                                        />
                                                        {question.answers && question.answers.length > 1 &&
                                                            <FiMinusSquare className='icon-remove'
                                                                onClick={() => handleAddRemoveAnswers('REMOVE', question.id, answer.id)}
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    {questions && questions.length > 0 &&
                        <div className='mx-2 mb-5'>
                            <button className='btn btn-warning fs-2 px-4 p-3'

                            >Save Questions
                            </button>
                        </div>
                    }

                    {/* {console.log(dataImagePreview)} */}
                    {/* {isPreviewImage === true &&
                        <Lightbox
                            image={URL.createObjectURL(dataImagePreview.url)}
                            title={dataImagePreview.title}
                            onClose={() => setIsPreviewImage(false)}
                        >
                        </Lightbox>
                    } */}
                </div>
            </div>
        </>
    )
}

export default QuizQA;