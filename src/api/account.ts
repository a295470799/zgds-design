import request from "@/utils/request";

// /**
//  * 获取地址选择器列表
//  * @param code
//  */
// export const fetchAreaList = (code: string) => {
//   return request({
//     method: "GET",
//     url: `/district/list`,
//     params: {
//       parent_code: code,
//       page: 1,
//       pagesize: 1000,
//     },
//   });
// };

/**
 * 获取发票列表
 * @param data
 */
export const getInvoiceList = async (data?: API.InvoiceListParams) => {
  return request({
    method: "POST",
    url: "/api/account/getInvoicesPaginate",
    data,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取发票详情
 * @param data
 */
export const getInvoiceInfo = async (invoiceNumber: string) => {
  return request({
    method: "POST",
    url: "/api/account/getInvoice",
    data: { invoiceNumber },
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取心愿单详情
 * @param data
 */
export const getWishList = async (data?: API.WishListParams) => {
  return request({
    method: "POST",
    url: "/api/account/getWishList",
    data,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 删除心愿单产品
 * @param product_id
 */
export const removeWish = async (product_id: string) => {
  return request({
    method: "POST",
    url: "/api/account/deleteWish",
    data: { product_id },
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 添加心愿单产品
 * @param product_id
 */
export const addWish = async (product_id: string) => {
  return request({
    method: "POST",
    url: "/api/account/addWish",
    data: { product_id },
    showError: true,
  }).then((res) => {
    return res.data;
  });
};
