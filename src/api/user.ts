import request from "@/utils/request";

/**
 * 登录
 * @param data API.Login
 */
export const login = async (data: API.Login) => {
  return request({
    method: "POST",
    url: `/api/account/login`,
    data,
    isShowError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 从eya获取用户信息
 * @returns
 */
export const getEyaUsers = async (
  customerTypeCode: string
): Promise<API.EyaUserInfo[]> => {
  return request({
    method: "POST",
    url: "/api/account/getEyaUsers",
    data: { customerTypeCode },
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取登录用户信息
 * @returns
 */
export const getLoginUser = async (): Promise<API.LoginUserInfo> => {
  return request({
    method: "POST",
    url: "/api/account/getLoginUser",
  }).then((res) => {
    return res.data;
  });
};
