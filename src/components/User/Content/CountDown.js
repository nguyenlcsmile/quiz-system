import { useState } from "react";
import { useEffect } from "react";
import _ from 'lodash';

const CountDown = (props) => {
    const { dataQuiz } = props;
    const [count, setCount] = useState(300);

    useEffect(() => {
        if (count === 0) {
            props.handleSubmitQuiz()
            return;
        }

        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [count]);

    const toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    const handleGetClassAnwser = (index) => {
        props.setIndex(index);
    }

    const getClassName = (question, index) => {
        let questionsClone = _.cloneDeep(dataQuiz);
        console.log(questionsClone)
        // if (+props.question.questionId === +question.questionId) {
        //     let isAnwser = props.question.anwsers.find(answer => answer.isSelected === true);

        //     if (props.index === index && isAnwser) {
        //         questionsClone[props.index] = new Object({ ...questionsClone[props.index], classAnwser: "anwser selected" })
        //     }

        //     for (let i = 0; i < questionsClone.length; i++) {
        //         if (i === props.index && questionsClone[i]?.classAnwser) {
        //             continue;
        //         }
        //         questionsClone[i] = new Object({ ...questionsClone[i], classAnwser: "anwser" });

        //     }
        //     console.log(questionsClone)
        // return questionsClone[index].classAnwser;
        // }

    }
    // console.log(questions)

    return (
        <div>
            {toHHMMSS(count)}
            <hr />
            <div className="anwsers-content mt-4">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((question, index) => {
                        return (
                            <div key={`question-time${index}`} className={question.classAnwser}
                                onClick={() => handleGetClassAnwser(index)}>
                                {index + 1}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CountDown;