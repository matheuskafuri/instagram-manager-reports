import axios from "axios";

const fireBaseApi = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export default fireBaseApi;

