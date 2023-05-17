import request from "@/utils/request";

/**
 * 获取产品列表
 * @returns
 */
export const getProductList = (data: API.ProductListParams) => {
  return request({
    method: "POST",
    url: "/api/product/getProductsPaginate",
    data,
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

/**
 *
 * @returns
 */
export const downloadManual = (product_id: string) => {
  return request({
    method: "POST",
    url: "/api/product/getProductBomInstructionFileUrl",
    data: { product_id },
  }).then((res) => {
    return res.data;
  });
};
