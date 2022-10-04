import axios from '../utils/axiosCustomize';

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

export { getAllUsers }