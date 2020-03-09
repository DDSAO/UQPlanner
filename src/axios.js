import axios from 'axios';

const instance = axios.create({
    baseURL:'https://uq-it-coursehelper.firebaseio.com/'
})

export default instance;