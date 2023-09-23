import axios from "axios";

const request = axios.create({
  baseURL: "https://650e4685a8b42265ec2cff72.mockapi.io/",
  timeout: 10000,
});

export default request;