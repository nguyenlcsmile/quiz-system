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

export {
    getAllUsers, postLogin, postRegister,
    putUpdateUser, postCreateNewUser, deleteUser,
    getUserWithPaginate, postLogout, getQuizByUser,
    getDataQuiz, postSubmitQuiz, getQuizbyAdmin,
    postCreateQuiz, deteleQuizForAdmin, postUpdateQuizForAdmin
}