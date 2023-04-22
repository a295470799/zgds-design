import request from "@/utils/request";

/**
 * 获取国家信息
 * @returns
 */
export const getCountrys = () => {
  return request({
    method: "POST",
    url: "/api/account/getCountrys",
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取地区信息
 * @returns
 */
export const getZones = (countryId: string | number) => {
  return request({
    method: "POST",
    url: "/api/account/getZones",
    data: {
      area_code: countryId,
    },
  }).then((res) => {
    return res.data;
  });
};
