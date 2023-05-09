import request from "@/utils/request";

/**
 * 添加购物车
 * @returns
 */
export const addToCart = async (
  product_id: number,
  count: number,
  type = "inc"
) => {
  return request({
    method: "POST",
    url: "/api/account/setCart",
    data: {
      product_id,
      count,
      type,
    },
    isShowError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取购物车信息
 * @returns
 */
export const getCart = async (data?: any[]) => {
  return request({
    method: "POST",
    url: data ? "/api/account/setCart2" : "/api/account/getCart",
    data: { data },
  }).then((res) => {
    return res.data;
  });
};
