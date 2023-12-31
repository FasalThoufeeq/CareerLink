import axios from "axios";

const MyAxios = axios.create({
  baseURL: "https://careerlink.cloud/api",
});

MyAxios.interceptors.request.use(
  async(config) => {
    const state =await localStorage.getItem("reduxState");
    const reduxState =await JSON.parse(state);
    const token = reduxState?.seekers?.seekers?.token;
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
export default MyAxios;
