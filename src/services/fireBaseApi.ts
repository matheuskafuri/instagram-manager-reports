import axios from "axios";

const fireBaseApi = axios.create({
  baseURL: "https://instagram-manager-reports.vercel.app/api/",
});

export default fireBaseApi;
