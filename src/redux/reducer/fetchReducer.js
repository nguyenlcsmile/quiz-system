
import { FETCH_LIST_QUIZ } from "../action/fetchAction";

const INITIAL_STATE = {
    isFetch: false
};

const fetchListQuiz = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LIST_QUIZ:
            return {
                ...state,
                isFetch: !state.isFetch
            };

        default: return state;
    }
};

export default fetchListQuiz;