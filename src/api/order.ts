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
export const cancelOrders = async (order_ids: (string | number)[]) => {
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

const mapOrderInfo = (data: any): API.OrderInfo => {
  const orderInfo: API.OrderInfo = {
    id: data.order.id,
    status: Number(data.order.status),
    orderNumber: data.order.number,
    orderTime: data.order.created_at,
    orderType: data.order.orderTypeCode,
    statusStr: data.order.status_str,
    priceTerm: data.order.pricingTradeClauseCode,
    tradeTerm: data.order.tradeClauseCode,
    deliveryDateF: data.order.shippingWindowStart,
    deliveryDateT: data.order.shippingWindowEnd,
    paymentTerm: data.order.paymentConditionValue,
    items: data.order.snaps_count,
    tax: data.order.tax_amount,
    shippingCost: data.order.freight,
    totalAmount: data.order.total_price,
    shipTo: data.order.shipTo,
    billTo: data.order.billTo,
    productList: data.order.snaps,
    shippingInfo: {
      name: data?.order?.shipping_name,
      shortname: data?.order?.shipping_shortname,
      email: data?.order?.shipping_email,
      phone: data?.order?.shipping_phone,
      taxNumber: data?.order?.shipping_taxNumber,
      countryCode: data?.order?.shipping_country_code,
      country: data?.order?.shipping_country,
      zone: data?.order?.shipping_zone,
      zoneCode: data?.order?.shipping_zone_code,
      city: data?.order?.shipping_city,
      postcode: data?.order?.shipping_postcode,
      address: data?.order?.shipping_address,
    },
    billingInfo: {
      name: data?.order?.billing_name,
      shortname: data?.order?.billing_shortname,
      email: data?.order?.billing_email,
      phone: data?.order?.billing_phone,
      taxNumber: data?.order?.billing_taxNumber,
      countryCode: data?.order?.billing_country_code,
      country: data?.order?.billing_country,
      zone: data?.order?.billing_zone,
      zoneCode: data?.order?.billing_zone_code,
      city: data?.order?.billing_city,
      postcode: data?.order?.billing_postcode,
      address: data?.order?.billing_address,
    },
    orderInformation: data.order_noutoasiakaswarehouse,
    palletInformation: data.order_noutoasiakaspallet,
    orderTrack: data.order_track,
    timeLine: [],
    countrys: data.countrys,
    zones: data.zones,
  };
  if (data?.order?.date1) {
    orderInfo?.timeLine?.unshift({
      title: "Place the order",
      content: data?.order?.date1,
    });
  }
  if (data?.order?.date2) {
    orderInfo?.timeLine?.unshift({
      title: "Pending",
      content: data?.order?.date2,
    });
  }
  if (data?.order?.date3) {
    orderInfo?.timeLine?.unshift({
      title: "Confirmed",
      content: data?.order?.date3,
    });
  }
  if (data?.order?.date4) {
    orderInfo?.timeLine?.unshift({
      title: "Processing",
      content: data?.order?.date4,
    });
  }
  if (data?.order?.date5) {
    orderInfo?.timeLine?.unshift({
      title: "Packed",
      content: data?.order?.date5,
    });
  }
  if (data?.order?.date6) {
    orderInfo?.timeLine?.unshift({
      title: "Completed",
      content: data?.order?.date6,
    });
  }
  return orderInfo;
};

const mapUpdateOrderInfo = (data: any): API.OrderInfo => {
  const orderInfo: API.OrderInfo = {
    items: data.snaps_count,
    tax: data.tax_amount,
    shippingCost: data.freight,
    totalAmount: data.total_price,
    productList: data.snaps,
  };
  return orderInfo;
};

/**
 * 获取订单详情
 * @param data
 */
export const getOrder = async (
  id: string,
  type: string
): Promise<API.OrderInfo> => {
  return request({
    method: "POST",
    url: "/api/account/getOrder",
    data: { id, type },
  }).then((res) => {
    if (res?.data) return mapOrderInfo(res?.data);
    return {} as API.OrderInfo;
  });
};

/**
 * 更新订单信息
 * @param data API.UpdateOrderParams
 */
export const updateOrder = async (data: API.UpdateOrderParams) => {
  return request({
    method: "POST",
    url: "/api/account/updateOrder",
    data,
    isShowError: true,
  }).then((res) => {
    if (res?.data) return mapUpdateOrderInfo(res?.data);
    return {} as API.OrderInfo;
  });
};

/**
 * 订单详情获取或者更新订单信息
 * @param data API.UpdateOrderParams
 */
export const getOrUpdateOrder = async (
  init: boolean,
  data: API.UpdateOrderParams | { id: string; type: string }
) => {
  return request({
    method: "POST",
    url: init ? "/api/account/getOrder" : "/api/account/updateOrder",
    data,
    isShowError: true,
  }).then((res) => {
    if (res?.data) return mapOrderInfo(res?.data);
    return {} as API.OrderInfo;
  });
};

/**
 * 创建Drop订单
 * @returns
 */
export const createdropOrders = async (data: FormData) => {
  return request({
    method: "POST",
    url: "/api/account/createOrders_drop",
    data,
  }).then((res) => {
    return res;
  });
};

/**
 * 快捷下单
 * @returns
 */
export const createQuickOrder = async (data: API.CreateOrderParams) => {
  return request({
    method: "POST",
    url: "/api/account/createOrders2",
    data,
    isShowError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 上传Quick Order SKU表格
 * @returns
 */
export const uploadQuickOrderSku = async (data: FormData) => {
  return request({
    method: "POST",
    url: "/api/account/uploadSku",
    data,
    isShowError: true,
  }).then((res) => {
    return res.data;
  });
};
