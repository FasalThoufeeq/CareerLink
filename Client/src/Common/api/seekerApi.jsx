import axios from "axios";

const MyAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

MyAxios.interceptors.request.use(
  async(config) => {
    const state =await localStorage.getItem("reduxState");
    const reduxState =await JSON.parse(state);
    const token = reduxState?.seekers?.seekers?.token;
    console.log(token,'tokrnllll');
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
export default MyAxios;
