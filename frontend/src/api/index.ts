import axios from "axios";
import { Api } from "./types";

const BASE_API_URL = "http://localhost:3001/api/v1/";

const instance = axios.create({
  baseURL: BASE_API_URL,
});

const api: Api = {
  user: {
    signup: (data) => instance.post("user/signup", data),
    login: (data) => instance.post("user/login", data),
    getProfile: (token) =>
      instance.post("user/profile", null, {
        headers: {
          Authorization: token,
        },
      }),
    editProfile: (data, token) =>
      instance.put("user/profil", data, { headers: { Authorization: token } }),
  },
};

export default api;
