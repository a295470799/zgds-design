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

/**
 * Contact Us Feedback
 * @param product_id
 */
export const createFeedback = async (data: API.ContactUsParams) => {
  return request({
    method: "POST",
    url: "/api/account/feedback",
    data,
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * Account Dashboard
 */
export const getDashboard = async () => {
  return request({
    method: "POST",
    url: "/api/account/getDashboard",
  }).then((res) => {
    return res.data;
  });
};

/**
 * Account Information
 */
export const getInformation = async () => {
  return request({
    method: "POST",
    url: "/api/account/getInformation",
  }).then((res) => {
    return res.data;
  });
};

/**
 * 更新FirstName
 */
export const updateFirstName = async (firstname: string) => {
  return request({
    method: "POST",
    url: "/api/account/updateFirstName",
    data: { firstname },
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 更新LastName
 */
export const updateLastName = async (lastname: string) => {
  return request({
    method: "POST",
    url: "/api/account/updateLastName",
    data: { lastname },
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 更新Email
 */
export const updateEmail = async (email: string) => {
  return request({
    method: "POST",
    url: "/api/account/updateEmail",
    data: { email },
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 更新Email
 */
export const updatePassword = async (data: API.InformationParams) => {
  return request({
    method: "POST",
    url: "/api/account/updatePassword",
    data,
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 下载PI发票
 */
export const downloadPiInvoice = async (ids: string[]) => {
  return request({
    method: "POST",
    url: "/api/account/downPiInvoice",
    responseType: "blob",
    data: { ids },
    showError: true,
  }).then((res) => {
    return res;
  });
};

/**
 * 下载CI发票
 */
export const downloadCiInvoice = async (ids: string[]) => {
  return request({
    method: "POST",
    url: "/api/account/downCiInvoice",
    responseType: "blob",
    data: { ids },
    showError: true,
  }).then((res) => {
    return res;
  });
};

/**
 * 获取Orders列表筛选信息
 * @returns
 */
export const getOrdersFilter = () => {
  return request({
    method: "POST",
    url: "/api/account/getOrdersFilter",
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取CiManager列表筛选信息
 * @returns
 */
export const getCiFilter = () => {
  return request({
    method: "POST",
    url: "/api/account/getCiFilter",
  }).then((res) => {
    return res.data;
  });
};
