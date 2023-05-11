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
