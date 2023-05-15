// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Login = {
    email: string;
    password: string;
  };

  type Cart = {
    carts: any[];
    snaps_count: number;
    total_price: string;
  };

  type EyaUserInfo = {
    addressDetail: string;
    assistantEmptCode: string;
    assistantEmptName: string;
    businessEmptCode: string;
    businessEmptName: string;
    businessGroupCode: string;
    companyCode: string;
    countryAreaNameEn: string;
    countryAreaShortNameEn: string;
    countryCode: string;
    currencyCode: string;
    customerBusinessScopeCode: string;
    customerCode: string;
    customerName: string;
    customerRankCode: string;
    customerSalesChannelCode: string;
    customerShortName: string;
    customerTradeClauseCode: string;
    customerTypeCode: string;
    partnerCode: string;
    paymentConditionCode: string;
    postCode: string;
    provinceAreaNameEn: string;
    provinceAreaShortNameEn: string;
    provinceCode: string;
    taxNumber: string;
    telephoneInfo: string;
    tradeClauseCodePrice: string;
    user_id: number;
  };

  type LoginUserInfo = {
    id: number;
    eya_code: string;
    group: string;
    type: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    company_name: string;
    vat_number: string;
    website: string;
    annual_sales: string;
    number_of_employees: string;
    main_sales_channels: string;
    cooperation_method: string;
    vasagle_com: number;
    feandrea_com: number;
    other_websites: string;
    sales_recommended: string;
    message?: any;
    password: string;
    admin_id: number;
    audit_date: string;
    created_at: string;
    updated_at: string;
    status: number;
    company_address_address: string;
    company_address_city: string;
    company_address_zone_id: number;
    company_address_country_id: number;
    company_address_postcode: string;
    bill_to_address: string;
    bill_to_city: string;
    bill_to_zone_id: number;
    bill_to_country_id: number;
    bill_to_postcode: string;
    eya_t2: Eyat2;
    users_eya: EyaUserInfo[];
  };

  type Eyat2 = {
    user_id: number;
    companyCode: string;
    customerCode: string;
    partnerCode: string;
    customerTypeCode: string;
    customerShortName: string;
    customerName: string;
    countryCode: string;
    countryAreaNameEn: string;
    provinceCode: string;
    provinceAreaNameEn: string;
    addressDetail: string;
    postCode: string;
    telephoneInfo: string;
    taxNumber: string;
    customerBusinessScopeCode: string;
    customerSalesChannelCode: string;
    customerRankCode: string;
    paymentConditionCode: string;
    currencyCode: string;
    businessGroupCode: string;
    businessEmptCode: string;
    businessEmptName: string;
    assistantEmptCode: string;
    assistantEmptName: string;
    countryAreaShortNameEn: string;
    provinceAreaShortNameEn: string;
    tradeClauseCodePrice: string;
    customerTradeClauseCode: string;
  };

  type CreateOrderParams = {
    orderTypeCode: string;
    fulfillmentChannelCode: string;
    shipTo?: string;
    billTo: string;
    shipping_name?: string;
    shipping_email?: string;
    shipping_phone?: string;
    shipping_country_code?: string;
    shipping_city?: string;
    shipping_zone?: string;
    shipping_postcode?: string;
    shipping_address?: string;
    tradeClauseCode: string;
    pricingTradeClauseCode?: string;
    customContractId?: string;
    skuItems?: {
      sku: string;
      count: number;
    }[];
  };

  type OrderListParams = {
    keyword?: string;
    search_date?: string[];
    order_type?: string[];
    ship_to?: string[];
    page?: number;
    page_size?: number;
    sort?: any[];
    type?: string;
  };

  type InvoiceListParams = {
    keyword?: string;
    search_date?: string[];
    freeFaxNumber?: string[];
    ship_to?: string[];
    page?: number;
    page_size?: number;
    sort?: any[];
    type?: string;
  };

  type ShippingParams = {
    shipping_name: string;
    shipping_email: string;
    shipping_phone: string;
    shipping_country_code: string;
    shipping_city: string;
    shipping_zone: string;
    shipping_postcode: string;
    shipping_address: string;
  };

  type OrderDetailAddressParams = {
    name?: string;
    shortname?: string;
    email?: string;
    phone?: string;
    taxNumber?: string;
    country?: string;
    countryCode?: string;
    zone?: string;
    zoneCode?: string;
    city?: string;
    postcode?: string;
    address?: string;
  };

  type UpdateOrderParams = {
    order_id: number;
    skuItems: {
      sku: string;
      count: number;
    }[];
    shipTo: string;
    billTo: string;
    action: "update" | "get";
  } & ShippingParams;

  type OrderInfo = {
    id?: number;
    status?: number;
    orderNumber?: string;
    orderTime?: string;
    orderType?: string;
    statusStr?: string;
    priceTerm?: string;
    tradeTerm?: string;
    deliveryDateF?: string;
    deliveryDateT?: string;
    paymentTerm?: string;
    items: number;
    tax: string;
    shippingCost: string;
    totalAmount: string;
    productList: any[];
    shippingInfo?: OrderDetailAddressParams;
    billingInfo?: OrderDetailAddressParams;
    shipTo?: string;
    billTo?: string;
    orderInformation?: any[];
    palletInformation?: any[];
    orderTrack?: any[];
    timeLine?: {
      title: string;
      content: string;
    }[];
    countrys?: any[];
    zones?: any[];
  };

  type WishListParams = {
    page?: number;
    cids?: number[];
    bnames?: string[];
  };

  type ProductListParams = {
    category_id?: string;
    wished?: string;
    tags?: string;
    labels?: string;
    brand?: string;
    order?: string;
    page?: number;
    page_size?: number;
    k?: string;
  };

  type ContactUsParams = {
    firstname: string;
    lastname: string;
    email: string;
    subject: string;
    phone?: string;
    order_number?: string;
    content?: string;
  };
}
