import _ from "lodash";

const Question = (props) => {
    const { data, index } = props;

    if (_.isEmpty(data)) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            {
                data.image ?
                    <div className="img-anwser">
                        <img src={`data:image/jpeg;base64,${data.image}`}
                            className="text-center me-1"
                            alt="Avatar" width="35%" height="20%" />
                    </div>
                    :
                    <div className="img-anwser">

                    </div>
            }
            <div className="card-title">
                Question {index + 1} : {data.questionDescription}
            </div>

            {data.anwsers && data.anwsers.length > 0 &&
                data.anwsers.map((anwser, index) => {
                    return (
                        <div className="card-content" key={`anwser-${index}`}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" />
                                <label className="form-check-label" >
                                    {anwser.description}
                                </label>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Question;