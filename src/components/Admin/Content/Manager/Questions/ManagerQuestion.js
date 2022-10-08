import Select from 'react-select';
import './ManagerQuestion.scss';
import { RiImageAddFill } from 'react-icons/ri';
import { BsCalendarPlus, BsCalendarMinus } from 'react-icons/bs';
import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { useEffect } from 'react';
import { getQuizbyAdmin, postQuestionsForQuiz, postAnswersForQuestion } from '../../../../../services/apiServices';
import { toast } from 'react-toastify';

const ManagerQuestion = () => {

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
    const [questions, setQuestions] = useState(initDataQuestions);
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
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

    const handleUploadImage = (event, questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(question => question.id === questionId);

        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleShowImagePreview = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(question => question.id === questionId);

        setIsPreviewImage(true);

        if (index > -1) {
            setDataImagePreView(
                {
                    url: questionsClone[index].imageFile,
                    title: questionsClone[index].imageName
                }
            );

        }
    }

    const handleAddRemoveQuestion = (action, questionId) => {
        let questionsClone = _.cloneDeep(questions);

        if (action === 'ADD') {
            let newQuestion = {
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

    const handleOnChangeQuestion = (action, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);

        if (action === 'QUESTION') {
            let index = questionsClone.findIndex(question => question.id === questionId);
            questionsClone[index].description = value;
            setQuestions(questionsClone);
        }
        // console.log('>>> Check questions ', questions);
    }

    const handleOnChangeAnswer = (action, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        if (action === "ANSWER") {
            let index = questionsClone.findIndex(question => question.id === questionId);
            if (index > -1) {
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        answer.description = value;
                    }
                })
                setQuestions(questionsClone);
            }
        }

        if (action === "CHECKBOX") {
            let index = questionsClone.findIndex(question => question.id === questionId);
            if (index > -1) {
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        answer.isCorrect = value;
                    }
                })
                setQuestions(questionsClone);
            }
        }
    }

    const handleSubmitQuestionForQuiz = async () => {
        //validate quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please Choose a Quiz');
            return;
        }
        //Validate Answer
        let indexQ = 0, indexA = 0;
        let isValidAnswer = true;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (_.isEmpty(questions[i].answers[j].description)) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) {
                break;
            }
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty question ${indexQ + 1} at anwser ${indexA + 1}`);
            return;
        }

        //validate Question
        let indexQuestion = 0;
        let isValidQuestion = true;
        for (let i = 0; i < questions.length; i++) {
            if (_.isEmpty(questions[i].description)) {
                isValidQuestion = false;
                indexQuestion = i;
                break;
            }

            if (isValidQuestion === false) {
                break;
            }
        }

        if (isValidQuestion === false) {
            toast.error(`Not empty question ${indexQuestion + 1}`);
            return;
        }

        for (const question of questions) {
            let q = await postQuestionsForQuiz(+selectedQuiz.value,
                question.description,
                question.imageFile);

            for (const answer of question.answers) {
                await postAnswersForQuestion(answer.description, answer.isCorrect, q.DT.id);
            }
        }

        console.log(questions);
        toast.success('Create Question and Anwser Success');
        setQuestions(initDataQuestions);
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
                        options={listQuiz}
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
                                                onChange={(event) => handleOnChangeQuestion('QUESTION', question.id, event.target.value)}
                                            />
                                            <label>Question {index + 1} 's description</label>
                                        </div>

                                        <div className='questions-image'>
                                            <label style={{ cursor: 'pointer' }} htmlFor={question.id}>
                                                <RiImageAddFill className='icon-images' />
                                            </label>
                                            <input type='file' hidden id={question.id}
                                                onChange={(event) => handleUploadImage(event, question.id)}
                                            />
                                        </div>
                                        <span className='fs-4 ml-2' style={{ cursor: 'pointer' }}>
                                            {question.imageName ?
                                                <span onClick={() => handleShowImagePreview(question.id)}>
                                                    {question.imageName}
                                                </span>
                                                :
                                                '0 file image upload'
                                            }
                                        </span>

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
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                                            onChange={(event) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                        />
                                                    </div>
                                                    <div className="form-floating">
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="name@example.com"
                                                            value={answer.description}
                                                            onChange={(event) => handleOnChangeAnswer('ANSWER', question.id, answer.id, event.target.value)}
                                                        />
                                                        <label>Answer {index + 1}</label>
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
                    {questions && questions.length > 0 &&
                        <div className='mx-2 mb-5'>
                            <button className='btn btn-warning fs-2 px-4 p-3'
                                onClick={() => handleSubmitQuestionForQuiz()}
                            >Save Questions
                            </button>
                        </div>
                    }

                    {/* {console.log(dataImagePreview)} */}
                    {isPreviewImage === true &&
                        <Lightbox
                            image={URL.createObjectURL(dataImagePreview.url)}
                            title={dataImagePreview.title}
                            onClose={() => setIsPreviewImage(false)}
                        >
                        </Lightbox>
                    }
                </div>
            </div>
        </>
    )
}

export default ManagerQuestion;