import axios from "axios";

const MyAxios = axios.create({
  baseURL: "https://careerlink.cloud/api/recruiter",
});

MyAxios.interceptors.request.use(
  (config) => {
    const state = localStorage.getItem("reduxState");
    const reduxState = JSON.parse(state);
    const token = reduxState?.recruiters?.recruiters?.token;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
export default MyAxios;
