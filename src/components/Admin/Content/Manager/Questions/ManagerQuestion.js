import Select from 'react-select';
import './ManagerQuestion.scss';
import { RiImageAddFill } from 'react-icons/ri';
import { BsCalendarPlus, BsCalendarMinus } from 'react-icons/bs';
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import _ from 'lodash';

const ManagerQuestion = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: 'question 1',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'anwser 1',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    description: 'anwser 1',
                    isCorrect: false
                }
            ]
        },
        {
            id: uuidv4(),
            description: 'question 2',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: 'anwser 1',
                    isCorrect: false
                },
                {
                    id: uuidv4(),
                    description: 'anwser 1',
                    isCorrect: false
                }
            ]
        }
    ])

    const handleAddRemoveQuestion = (action, questionId) => {
        let questionsClone = _.cloneDeep(questions);

        if (action === 'ADD') {
            let newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answsers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }

            questionsClone.push(newQuestion);
            setQuestions(questionsClone);
        }

        if (action === 'REMOVE') {
            questionsClone = questionsClone.filter(question => question.id !== questionId);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnwser = (action, questionId, anwserId) => {
        // console.log(action, questionId, anwserId)
        let questionClone = _.cloneDeep(questions);

        if (action === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionClone.findIndex(question => question.id === questionId);
            questionClone[index].answers.push(newAnswer);
            setQuestions(questionClone);
        }

        if (action === 'REMOVE') {
            let index = questionClone.findIndex(question => question.id === questionId);
            questionClone[index].answers = questionClone[index].answers.filter(answer => answer.id !== anwserId);
            setQuestions(questionClone);
        }
    }

    return (
        <>
            <div className="manager-title">
                <div className='row'>
                    <h3>Manager Questions</h3>
                </div>
            </div>
            <div className='manager-questions-content'>
                <div className='mb-4'>
                    <label className='mb-2 fs-2'>Select Quiz:</label>
                    <Select className='selected-quiz'
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        placeholder={"Quiz style..."}
                    />
                </div>

                <div className='questions-content'>
                    <label className='mb-2 fs-2'>Add Questions:</label>

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
                                            <label >Question {index + 1} 's description</label>
                                        </div>

                                        <div className='questions-image'>
                                            <RiImageAddFill className='icon-images' />
                                            <input type='file' hidden />
                                            <span>0 file image upload</span>
                                        </div>

                                        <div className='btn-add-question'>
                                            <BsCalendarPlus className='icon-add'
                                                onClick={() => handleAddRemoveQuestion('ADD', '')}
                                            />
                                            {questions.length > 1 &&
                                                <BsCalendarMinus className='icon-remove'
                                                    onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}
                                                />
                                            }
                                        </div>
                                    </div>

                                    {question.answers && question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div key={answer.id} className='answers-main'>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                    </div>
                                                    <div className="form-floating">
                                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                                        <label for="floatingInput">Answer {index + 1}</label>
                                                    </div>
                                                    <div className='btn-add-answer'>
                                                        <FiPlusSquare className='icon-add'
                                                            onClick={() => handleAddRemoveAnwser('ADD', question.id, answer.id)}
                                                        />
                                                        {question.answers && question.answers.length > 1 &&
                                                            <FiMinusSquare className='icon-remove'
                                                                onClick={() => handleAddRemoveAnwser('REMOVE', question.id, answer.id)}
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
                </div>
            </div>
        </>
    )
}

export default ManagerQuestion;