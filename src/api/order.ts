import request from "@/utils/request";

/**
 * 获取订单列表
 * @param data
 */
export const getOrderList = async (data?: API.OrderListParams) => {
  return request({
    method: "POST",
    url: "/api/account/getOrdersPaginate",
    data,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 批量确认订单
 * @param order_ids
 */
export const confirmOrders = async (order_ids: string[]) => {
  return request({
    method: "POST",
    url: "/api/account/confirmOrders",
    data: { order_ids },
    isShowError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 批量取消订单
 * @param order_ids
 */
export const cancelOrders = async (order_ids: string[]) => {
  return request({
    method: "POST",
    url: "/api/account/cancelOrders",
    data: { order_ids },
    isShowError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 批量下载发票
 * @param order_ids
 */
// export const cancelOrders = async (order_ids: string[]) => {
//   return request({
//     method: "POST",
//     url: "/api/account/downPiInvoice",
//     data: { order_ids },
//   }).then((res) => {
//     return res.data;
//   });
// };
