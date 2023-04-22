import request from "@/utils/request";

// /**
//  * 创建地址
//  * @param uid
//  * @param data
//  */
// export const createAddress = (uid: string, data: AddressType) => {
//   return request({
//     method: "POST",
//     url: `${BASE_URL}/account/${uid}/shippingAddress`,
//     data,
//   });
// };

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
