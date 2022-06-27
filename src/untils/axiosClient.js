import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_BE,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => (new URLSearchParams(params).toString())
})

export default axiosClient