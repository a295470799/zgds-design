export const formatPrice = (price?: number | string, country = "eu") => {
  const newPrice = typeof price === "string" ? Number(price) : price;
  if (country === "us") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(newPrice ?? 0);
  } else if (country === "uk") {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(newPrice ?? 0);
  }
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(newPrice ?? 0);
};

export function toBase64(str: string): string {
  if (typeof window === "undefined") {
    // Running on server
    const buffer = Buffer.from(str, "utf-8");
    return buffer.toString("base64");
  } else {
    // Running in browser
    return window.btoa(str);
  }
}

export function isDef<T>(val: T) {
  return val !== undefined && val !== null;
}

/**
 * 添加百分比单位
 * @param val
 */
export const addPercentUnit = (val?: string | number) => {
  if (!isDef(val)) return undefined;
  if (typeof val === "string") {
    if (val.endsWith("%")) return val;
  } else {
    return val + "%";
  }
};
