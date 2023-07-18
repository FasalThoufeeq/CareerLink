import axios from "axios";

const MyAxios = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default MyAxios;