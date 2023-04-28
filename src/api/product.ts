import request from "@/utils/request";

/**
 * 获取产品列表
 * @returns
 */
export const getProductList = (category_id?: string) => {
  return request({
    method: "POST",
    url: "/api/product/getProductsPaginate",
    data: { category_id },
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取产品信息
 * @returns
 */
export const getProductInfo = (sku: string) => {
  return request({
    method: "POST",
    url: "/api/product/getProduct",
    data: { sku },
  }).then((res) => {
    return res.data;
  });
};
