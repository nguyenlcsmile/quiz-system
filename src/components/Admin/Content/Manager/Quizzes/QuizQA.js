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
    getQuizbyAdmin, postQuestionsForQuiz, deleteQuestion,
    postAnswersForQuestion, getQuestionAnswerForQuiz, deleteAnwser,
    putQuestionForQuiz, putAnwserForQuiz
}
    from '../../../../../services/apiServices';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const QuizQA = () => {
    const isFetch = useSelector(state => state.fetchQuiz.isFetch);

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreView] = useState(
        {
            url: "",
            title: ""
        }
    );

    const [questions, setQuestions] = useState([]);
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchQAForQuiz();
    }, [isFetch, selectedQuiz]);


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

    const handleUploadImage = (event, questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(question => question.id === questionId);

        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            // console.log(event.target.files[0]);
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
            console.log(questions);
        }
    }

    const handleShowImagePreview = async (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(question => question.id === questionId);

        if (index > -1) {
            if (typeof questionsClone[index].imageFile === 'string') {
                let res = await fetch(`data:image/jpeg;base64,${questionsClone[index].imageFile}`);
                let blob = await res.blob();
                let imageFile = new File([blob], '', { type: 'image/jpeg' });

                questionsClone[index].imageFile = imageFile;
                questionsClone[index].imageName = imageFile.name;

                setDataImagePreView(
                    {
                        url: imageFile,
                        title: imageFile.name
                    }
                );

                setQuestions(questionsClone);

            } else {
                setDataImagePreView(
                    {
                        url: questionsClone[index].imageFile,
                        title: questionsClone[index].imageName
                    }
                );
            }

            setIsPreviewImage(true);
        }
    }

    const handleAddRemoveQuestion = async (type, quizId, questionId) => {
        let questionsClone = _.cloneDeep(questions);

        if (type === 'REMOVE') {
            let index = questionsClone.findIndex(question => question.id === questionId);
            if (index > -1) {
                let res = await deleteQuestion(questionId, quizId);
                if (res && res.EC === 0) {
                    setQuestions(questionsClone.filter(item => item.id !== questionId));
                    toast.success(res.EM);
                }
            }
        }

        if (type === 'ADD') {
            let index = questionsClone.findIndex(question => question.id === questionId);
            if (index > -1) {
                let res = await postQuestionsForQuiz(selectedQuiz.value, questionsClone[index].description, questionsClone[index].imageFile);
                if (res && res.EC === 0) {
                    let question = {
                        id: res.DT.id,
                        description: '',
                        imageFile: '',
                        imageName: '',
                        answers: []
                    };
                    let a = await postAnswersForQuestion('desc', false, +res.DT.id)
                    if (a && a.EC === 0) {
                        question.answers = [
                            {
                                id: a.DT.id,
                                description: '',
                                isCorrect: false
                            }
                        ];
                        questionsClone.push(question);
                        setQuestions(questionsClone);
                        toast.success(res.EM + a.EM);
                    }
                }
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
                        description: '',
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

    const handleOnChangeAnswer = (type, questionId, answerId, value) => {
        // console.log('Check ', type, questionId, answerId, value);
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(question => question.id === questionId);
        // console.log(questionsClone[index]);
        if (index > -1) {
            if (type === 'CHECKBOX') {
                questionsClone[index].answers.map(anwser => {
                    if (anwser.id === answerId) {
                        anwser.isCorrect = value;
                    }
                })
                setQuestions(questionsClone);
            }

            if (type === 'ANWSER') {
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        answer.description = value;
                    }
                })
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeQuestion = (type, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(question => question.id === questionId);

        if (type === 'QUESTION') {
            questionsClone[index].description = value;
            setQuestions(questionsClone);
        }
    }

    const handleSubmitQuestions = async () => {
        // validate quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please Choose a Quiz');
            return;
        }
        for (const question of questions) {
            let q = await putQuestionForQuiz(
                +question.id,
                +selectedQuiz.value,
                question.description,
                question.imageFile);

            for (const answer of question.answers) {
                // console.log(answer.id);
                if (+answer.id === 0) {
                    await postAnswersForQuestion(answer.description, answer.isCorrect, q.DT.id)
                } else {
                    await putAnwserForQuiz(answer.description, answer.isCorrect, q.DT.id, answer.id);
                }
            }
        }

        toast.success("Save Questions Success");
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
                    <label className='mb-2 fs-2 mt-3'>Update/Create Questions:</label>

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
                                        <span className='fs-4 ml-2' style={{ cursor: 'pointer' }}
                                            onClick={() => handleShowImagePreview(question.id)}>
                                            {question.imageName ?
                                                <span>
                                                    {question.imageName}
                                                </span>
                                                :
                                                'Image'
                                            }
                                        </span>

                                        <div className='btn-add-question'>
                                            <BsCalendarPlus className='icon-add'
                                                onClick={() => handleAddRemoveQuestion('ADD', selectedQuiz.value, question.id)}
                                            />
                                            {questions.length > 1 &&
                                                <BsCalendarMinus className='icon-remove'
                                                    onClick={() => handleAddRemoveQuestion('REMOVE', selectedQuiz.value, question.id)}
                                                />
                                            }
                                        </div>
                                    </div>

                                    {question.answers && question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div key={answer.id} className='answers-main'>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                                                            checked={answer.isCorrect}
                                                            onChange={(event) => handleOnChangeAnswer('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                        />
                                                    </div>
                                                    <div className="form-floating">
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="name@example.com"
                                                            value={answer.description}
                                                            onChange={(event) => handleOnChangeAnswer('ANWSER', question.id, answer.id, event.target.value)}
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
                                onClick={() => handleSubmitQuestions()}
                            >Save Questions
                            </button>
                        </div>
                    }

                    {isPreviewImage === true &&
                        <Lightbox
                            image={URL.createObjectURL(dataImagePreview.url)}
                            // image="adasasd"
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

export default QuizQA;