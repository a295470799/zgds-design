import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

export const formatPrice = (price?: number | string, country = "eu") => {
  const newPrice = typeof price === "string" ? Number(price) : price;
  if (country === "us") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(newPrice ?? 0);
  } else if (country === "uk") {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(newPrice ?? 0);
  }
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(newPrice ?? 0);
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

/**
 * 把北京时间转换为浏览器时间
 * @param date 从后端获取的北京时间
 */
export const formatDate = (date: string, onlyDay?: boolean) => {
  if (date) {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    // 创建一个当前时间的实例
    const now = dayjs();

    // 获取浏览器时区字符串
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 将北京时间转换为浏览器时间
    const beijingTime = dayjs(date).tz(browserTimezone);

    const browserTime = now
      .year(beijingTime.year())
      .month(beijingTime.month())
      .date(beijingTime.date())
      .hour(beijingTime.hour())
      .minute(beijingTime.minute())
      .second(beijingTime.second());

    const formatString = onlyDay ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss";

    return browserTime.format(formatString);
  }
  return "";
};

/**
 * 把浏览器时间转换为北京时间
 * @param date 浏览器时间
 */
export const formatBeijingDate = (date: dayjs.ConfigType) => {
  if (date) {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    return dayjs(date).tz("Asia/Shanghai").format("YYYY-MM-DD");
  }
  return "";
};
