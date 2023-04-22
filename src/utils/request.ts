import axios from "axios";

const request = axios.create({
  baseURL: "https://eu.distributor.songmics.com",
});

request.interceptors.request.use(
  async (config) => {
    // 这里只有客户端的cookie生效了，
    // 如果要获取服务端cookie的话，在getServerSideProps中获取request中的cookie，再手动设置到每个请求的请求头中
    // const headers = await composeAuthHeaders();
    // config.headers = { ...config.headers, ...headers, client: process.env.NEXT_PUBLIC_CLIENT };
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  async (response) => {
    //TODO: 临时抛出接口错误
    // if (![1, 200].includes(response.data.code)) {
    //   return Promise.reject(response);
    // }
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // 跳过注销时异常, status = 401
      //   if (error.response.config.url === "/logout") return;
      //   await store?.dispatch(logoutAsync(true));
    }
    // if (error.response?.status === 400) {
    //   return error;
    // }
    return Promise.reject(error);
  }
);

export default request;
