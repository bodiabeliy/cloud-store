import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api',
  responseType: 'json',
});

// https://cloud-storage-12345.herokuapp.com/api - основной адресс
