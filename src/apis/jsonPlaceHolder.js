import axios from 'axios';
// create end point api
// create axios instance using axios.create , add enpoint api 
export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
})