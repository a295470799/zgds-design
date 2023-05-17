import axios from "axios";
import { getToken, removeToken } from "./auth";
import { enqueueSnackbar } from "notistack";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * @description 是否默认弹出错误信息
     */
    showError?: boolean;
  }
}

const request = axios.create({
  baseURL: "http://dev.a.zgds.eu",
  timeout: 3000,
});

request.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  async (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.config.responseType == "blob") {
      return response;
    }

    if (response?.data?.code === 200) {
      return response.data;
    } else if (response?.data?.code === 401) {
      removeToken();
      window.location.href = "/login";
    } else {
      if (response.config.showError) {
        enqueueSnackbar(
          response?.data?.message || "System busy, please retry",
          {
            variant: "error",
          }
        );
      }
      throw response.data;
    }
  },
  async (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default request;
