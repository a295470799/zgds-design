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
    isShowError: true,
  }).then((res) => {
    return res.data;
  });
};
