import axios from 'axios';

const instance = axios.create({
    baseURL: "https://test-my-burger.firebaseio.com/"
});
export default instance;