import Layout from "#lib/Layout";
import { createOrder, getCheckout } from "@/api/checkout";
import { getCountrys } from "@/api/country";
import { getEyaUsers, getLoginUser } from "@/api/user";
import AddressModal from "@/components/AddressModal";
import CartSummary from "@/components/CartSummary";
import OrderTypeSelect from "@/components/OrderTypeSelect";
import CheckoutCard from "@/components/checkout/CheckoutCard";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Typography,
  FormLabel,
} from "@mui/material";
import { useRequest, useSetState } from "ahooks";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import {
  FormContainer,
  RadioButtonGroup,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { useLocation, useNavigate } from "react-router-dom";

type CheckoutState = {
  dialogOpen: boolean;
  orderType?: "Dropship" | "Batch order";
  shipping?: API.EyaUserInfo;
  billing?: API.EyaUserInfo;
};

type AddressInfo = {
  shipping?: API.EyaUserInfo[];
  billing?: API.EyaUserInfo[];
};

export default function QuickOrder() {
  const [state, setState] = useSetState<CheckoutState>({
    dialogOpen: true,
  });

  // 获取Checkout数据
  const { data: checkoutData, run: runCheckoutData } = useRequest<
    any,
    [string?]
  >(getCheckout, {
    onFinally(params, data) {
      if (!(data?.total_price && Number(data?.total_price ?? 0) > 0)) {
        window.location.href = "/cart";
      }
    },
  });

  // 获取登录用户信息
  const { data: userData } = useRequest(getLoginUser, {
    ready: !state.dialogOpen,
  });

  // 获取地址信息
  const { data: addressInfo } = useRequest<
    AddressInfo,
    [CheckoutState["orderType"]]
  >(
    async (param) => {
      if (param == "Dropship") {
        const billing = await getEyaUsers("T6");
        if (billing.length == 1) {
          setState({
            billing: billing[0],
          });
        }
        return {
          billing,
        };
      } else {
        const shipping = await getEyaUsers("T5");
        const billing = await getEyaUsers("T6");
        if (shipping.length == 1) {
          setState({
            shipping: shipping[0],
          });
        }
        if (billing.length == 1) {
          setState({
            billing: billing[0],
          });
        }
        return {
          shipping,
          billing,
        };
      }
    },
    {
      defaultParams: [state.orderType],
      ready: !state.dialogOpen,
    }
  );

  // 获取国家信息
  const { data: countrys, run: runGetCountry } = useRequest(
    async () => {
      const res = await getCountrys();
      return res?.map((item: any) => {
        return {
          id: item.id,
          label: item.area_name_en,
        };
      });
    },
    { ready: !state.dialogOpen, manual: true }
  );

  // 根据shipping国家id和订单类型获取对应数据
  useEffect(() => {
    if (state.shipping?.countryCode) {
      runCheckoutData(state.shipping.countryCode);
    } else if (state.orderType == "Dropship") {
      runGetCountry();
      runCheckoutData();
    }
  }, [state.shipping?.countryCode, state.orderType]);

  const handleDialogClick = (type: CheckoutState["orderType"]) => {
    setState({
      orderType: type,
      dialogOpen: false,
    });
  };

  // 获取国家信息
  const {
    data: placeOrderResult,
    loading,
    runAsync: runPlaceOrder,
  } = useRequest<any, [API.CreateOrderParams]>(createOrder, {
    manual: true,
  });

  const placeOrder = async (data: any) => {
    if (state.orderType == "Batch order" && !state.shipping?.partnerCode) {
      enqueueSnackbar("Please select Shipping Information", {
        variant: "error",
      });
    }

    if (!state.billing?.partnerCode) {
      enqueueSnackbar("Please select Billing Information", {
        variant: "error",
      });
      return;
    }

    runPlaceOrder({
      orderTypeCode: state.orderType ?? "",
      shipTo: state.shipping?.partnerCode ?? "",
      billTo: state.billing?.partnerCode ?? "",
      fulfillmentChannelCode: data.fulfillmentChannelCode ?? "",
      shipping_name: data.shipping_name ?? "",
      shipping_email: data.shipping_email ?? "",
      shipping_phone: data.shipping_phone ?? "",
      shipping_country_code: data.shipping_country_code ?? "",
      shipping_city: data.shipping_city ?? "",
      shipping_zone: data.shipping_zone ?? "",
      shipping_postcode: data.shipping_postcode ?? "",
      shipping_address: data.shipping_address ?? "",
      tradeClauseCode: data.tradeClauseCode ?? "",
      pricingTradeClauseCode: data.pricingTradeClauseCode ?? "",
      customContractId: data.customContractId ?? "",
    });
  };

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout title="Quick Order">
      <OrderTypeSelect open={state.dialogOpen} onSelect={handleDialogClick} />

      {state.orderType && (
        <FormContainer onSuccess={(data) => console.log(data)}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"} columnGap={"40px"} alignItems={"center"}>
              <Button
                onClick={() => {
                  navigate("/account/orders", {
                    state: location.state,
                  });
                }}
              >
                <Typography fontSize={"1.2rem"}>
                  Back to <b>My Orders</b>
                </Typography>
              </Button>
              <Box
                sx={(theme) => {
                  return {
                    ["& > .MuiFormControl-root"]: {
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 0,
                      fontSize: "1.2rem",
                      fontWeight: 500,
                      color: theme.palette.text.secondary,
                      "& .MuiFormLabel-root": {
                        color: "rgba(0,116,163,.8)",
                        fontSize: "1.4rem",
                        fontWeight: 500,
                      },
                    },
                  };
                }}
              >
                <RadioButtonGroup
                  label="Shipment method: "
                  name="ship_method"
                  row
                  required
                  options={[
                    { id: "代发", label: "Ship by supplier" },
                    { id: "自提", label: "Self-pickup" },
                  ]}
                />
              </Box>
              <Box>Price Term:</Box>
              <Box>Trade Term:</Box>
            </Box>
            <Box>
              <Button color="success" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </FormContainer>
      )}
    </Layout>
  );
}
