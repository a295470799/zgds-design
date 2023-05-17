import request from "@/utils/request";

/**
 * 检查sku有效性
 * @returns
 */
export const checkSku = async (sku: string) => {
  return request({
    method: "POST",
    url: "/api/account/checkSku",
    data: {
      sku,
    },
    showError: true,
  }).then((res) => {
    return res.data;
  });
};

/**
 * 获取类目信息
 * @param type 0: 所有类目 else 一级类目
 * @returns
 */
export const getCategorys = async (type = 0) => {
  return request({
    method: "POST",
    url: "/api/common/getCategorys",
    showError: true,
    data: {
      type,
    },
  }).then((res) => {
    return res.data;
  });
};
