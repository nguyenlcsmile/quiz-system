import axios from '../utils/axiosCustomize';

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 3000 })
}

const postLogout = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token });
}

const postRegister = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password })
}

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post('api/v1/quiz-submit', { ...data });
}

const getQuizbyAdmin = () => {
    return axios.get('api/v1/quiz/all');
}

const postCreateQuiz = (name, description, type, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', type);
    data.append('quizImage', image);

    return axios.post('api/v1/quiz', data);
}

const deteleQuizForAdmin = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}

const postUpdateQuizForAdmin = (id, description, name, type, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);

    return axios.put('api/v1/quiz', data);
}

const postQuestionsForQuiz = (quizId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image);

    return axios.post('api/v1/question', data);
}

const postAnswersForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}

const getQuestionAnswerForQuiz = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const putQuestionForQuiz = (questionId, quizId, description, image) => {
    const data = new FormData();
    data.append('id', questionId);
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image);

    return axios.put('api/v1/question', data)
}

const putAnwserForQuiz = (description, correct_answer, questionId, answerId) => {
    const data = new FormData();
    data.append('description', description);
    data.append('correct_answer', correct_answer);
    data.append('question_id', questionId);
    data.append('answer_id', answerId);

    return axios.put('api/v1/answer', data)
}

const deleteAnwser = (anwserId) => {
    return axios.delete(`api/v1/answer/${anwserId}`);
}

const deleteQuestion = (id, quizId) => {
    return axios.delete('api/v1/question', {
        data: { id, quizId }
    });
}

export {
    getAllUsers, postLogin, postRegister,
    putUpdateUser, postCreateNewUser, deleteUser,
    getUserWithPaginate, postLogout, getQuizByUser,
    getDataQuiz, postSubmitQuiz, getQuizbyAdmin,
    postCreateQuiz, deteleQuizForAdmin, postUpdateQuizForAdmin,
    postQuestionsForQuiz, postAnswersForQuestion, postAssignQuiz,
    getQuestionAnswerForQuiz, deleteAnwser, deleteQuestion,
    putQuestionForQuiz, putAnwserForQuiz
}