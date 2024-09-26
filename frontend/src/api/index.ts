import axios from "axios";
import { Api } from "./types";

const BASE_API_URL = "http://localhost:3001/api/v1/";

const instance = axios.create({
  baseURL: BASE_API_URL,
});

const api: Api = {
  user: {
    signup: (data) => instance.post("user/signup", data),
    login: async (data) => {
      const res = await instance.post("user/login", data);
      return res.data;
    },
    getProfile: async (token) => {
      const res = await instance.post("user/profile", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.body;
    },
    editProfile: (data, token) =>
      instance.put("user/profil", data, { headers: { Authorization: token } }),
  },
};

export default api;
