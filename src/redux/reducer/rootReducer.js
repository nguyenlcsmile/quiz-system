import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import fetchListQuiz from './fetchReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    fetchQuiz: fetchListQuiz,
});

export default rootReducer;