import axios from "axios";

export const baseURL = "http://localhost:8080/";

export const clintServer = axios.create({
  baseURL: baseURL,
});
