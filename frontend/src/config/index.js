import axios from "axios";

export const baseURL = "https://nextjs-chat-app-1.onrender.com/";

export const clintServer = axios.create({
  baseURL: baseURL,
});
