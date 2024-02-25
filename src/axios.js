import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.API_URL || 'https://notes-backend-cn83.onrender.com/'
});
 
export default instance;