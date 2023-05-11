import request from "@/utils/request";

/**
 * 获取Checkout信息
 * @returns
 */
export const getCheckout = async (area_code?: string) => {
  return request({
    method: "POST",
    url: "/api/account/getCheckoutData",
    data: { area_code },
  }).then((res) => {
    return res.data;
  });
};

/**
 * 创建订单
 * @returns
 */
export const createOrder = async (data: API.CreateOrderParams) => {
  return request({
    method: "POST",
    url: "/api/account/createOrder",
    data,
    showError: true,
  }).then((res) => {
    return res.data;
  });
};
