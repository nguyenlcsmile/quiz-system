import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import './DetailQuiz.scss';
import _ from "lodash";
import Question from "./Question";
import { postSubmitQuiz } from "../../services/apiServices";
import ModalResult from "./ModalResult";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataResultQuiz, setDataResultQuiz] = useState({});
    // console.log(dataQuiz);

    const quizId = params.id;

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log(res);

        if (res && res.EC === 0) {
            let data = _.chain(res.DT)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let anwsers = [];
                    let questionDescription, image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        anwsers.push(item.answers)
                    })
                    return { questionId: key, anwsers, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1);
    }

    const handleCheckBox = (questionId, anwserId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuiz.find((quiz) => +quiz.questionId === questionId);
        // console.log(question);

        if (question && question.anwsers) {
            question.anwsers = question.anwsers.map((anwser) => {
                if (+anwser.id === anwserId) {
                    anwser.isSelected = !anwser.isSelected;
                }
                return anwser;
            })

            // console.log(question);
        }

        let index = dataQuizClone.findIndex(item => +item.questionId === questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
        }
        // console.log(dataQuizClone);
        setDataQuiz(dataQuizClone);
    }

    const handleSubmitQuiz = async () => {

        let payload = {
            quizId: +quizId,
            answers: []
        }

        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = +question.questionId;
                let userAnswerId = [];

                question.anwsers.forEach((anwser) => {
                    if (anwser.isSelected === true) {
                        userAnswerId.push(anwser.id);
                    }
                })

                answers.push({
                    questionId: questionId,
                    userAnswerId: userAnswerId
                })
            })

            payload.answers = answers;

            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setDataResultQuiz(res.DT);
                setIsShowModalResult(true);
            }
        }
    }
    // console.log(">>> Check data ", dataQuiz);

    return (
        <>
            <div className="detail-quiz-container container p-5 mt-2">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">
                                    <span>
                                        Quiz {quizId}
                                    </span>
                                    {location?.state?.quizTitle}
                                </h5>
                            </div>
                            <div className="card-body text-center">
                                <Question
                                    index={index}
                                    data={dataQuiz && dataQuiz.length > 0
                                        ?
                                        dataQuiz[index]
                                        : []}
                                    handleCheckBox={handleCheckBox}
                                />

                                <div className="card-content-footer">
                                    <button className="btn btn-secondary"
                                        onClick={() => handlePrev()}>
                                        Prev
                                    </button>
                                    <button className="btn btn-primary"
                                        onClick={() => handleNext()}>
                                        Next
                                    </button>
                                    <button className="btn btn-warning"
                                        onClick={() => handleSubmitQuiz()}>
                                        Finish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ModalResult
                        show={isShowModalResult}
                        setShow={setIsShowModalResult}
                        dataResultQuiz={dataResultQuiz}
                    />
                    <div className="col-xl-4">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Count down</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailQuiz;