import axios from "axios";
import { Api } from "./types";
import { RootState } from "../store";
import { Store } from "@reduxjs/toolkit";

const BASE_API_URL = "http://localhost:3001/api/v1/";

const instance = axios.create({
  baseURL: BASE_API_URL,
});

export const initInterceptors = (store: Store<RootState>) => {
  instance.interceptors.request.use((config) => {
    const token = store?.getState().authentication.token;

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  });
};

const api: Api = {
  user: {
    signup: (data) => instance.post("user/signup", data),
    login: async (data) => {
      const res = await instance.post("user/login", data);
      return res.data;
    },
    getProfile: async () => {
      const res = await instance.post("user/profile", null);
      return res.data.body;
    },
    editProfile: (data) => instance.put("user/profile", data),
  },
};

export default api;
