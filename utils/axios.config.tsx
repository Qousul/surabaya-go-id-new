import axios from 'axios';

const axiosConfig = (isSurabaya: boolean) => axios.create({
  baseURL: isSurabaya ? process.env.API_URL : process.env.API_URL_WEBDISPLAY,
});

export default axiosConfig;