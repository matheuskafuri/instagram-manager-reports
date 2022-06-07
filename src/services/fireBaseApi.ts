import axios from "axios";

const fireBaseApi = axios.create({
  baseURL: "https://instagram-manager-reports.vercel.app/api/",
  // baseURL: "http://localhost:3000/api/",
});

export default fireBaseApi;
