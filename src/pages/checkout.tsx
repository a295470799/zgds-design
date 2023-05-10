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
  Paper,
  Typography,
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
import { useMessage } from "#lib/MessageProvider";

type CheckoutState = {
  dialogOpen: boolean;
  checkOutType?: "Dropship" | "Batch order";
  shipping?: API.EyaUserInfo;
  billing?: API.EyaUserInfo;
};

type AddressInfo = {
  shipping?: API.EyaUserInfo[];
  billing?: API.EyaUserInfo[];
};

export default function Checkout() {
  const [state, setState] = useSetState<CheckoutState>({
    dialogOpen: true,
  });
  const { msg } = useMessage();

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

  // getLoginUser

  // 获取地址信息
  const { data: addressInfo } = useRequest<
    AddressInfo,
    [CheckoutState["checkOutType"]]
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
      defaultParams: [state.checkOutType],
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
    } else if (state.checkOutType == "Dropship") {
      runGetCountry();
      runCheckoutData();
    }
  }, [state.shipping?.countryCode, state.checkOutType]);

  const handleDialogClick = (type: CheckoutState["checkOutType"]) => {
    setState({
      checkOutType: type,
      dialogOpen: false,
    });
  };

  // 获取国家信息
  const { loading, runAsync: runPlaceOrder } = useRequest<
    any,
    [API.CreateOrderParams]
  >(createOrder, {
    manual: true,
  });

  const placeOrder = async (data: any) => {
    if (state.checkOutType == "Batch order" && !state.shipping?.partnerCode) {
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

    await runPlaceOrder({
      orderTypeCode: state.checkOutType ?? "",
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

    msg({
      message: "Order placed, please go to My Orders to confirm!",
      onConfirm() {
        window.location.href = "/account/orders";
      },
    });
  };

  return checkoutData?.total_price > 0 ? (
    <Layout title="Checkout" bodySx={{ marginBlockStart: 0 }}>
      <OrderTypeSelect open={state.dialogOpen} onSelect={handleDialogClick} />

      {state.checkOutType && (
        <FormContainer onSuccess={placeOrder}>
          <Box
            sx={(theme) => {
              return {
                position: "relative",
                background: theme.palette.background.paper,
                padding: "0 10px",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "space-between",
              };
            }}
          >
            <Box>
              <Typography
                variant="h1"
                color="primary"
                fontWeight={700}
                fontSize="3.2rem"
                padding="20px 0 34px 0"
              >
                {state.checkOutType}
              </Typography>

              <TextFieldElement
                required
                label="PO NO."
                name="customContractId"
              />
              {state.checkOutType == "Dropship" && (
                <Paper
                  sx={{
                    padding: "20px 10px",
                    background: "#fff",
                    marginBottom: "40px",
                    width: "800px",
                  }}
                >
                  <Typography
                    color="primary"
                    fontWeight={500}
                    fontSize="1.2rem"
                    marginBottom="20px"
                  >
                    SHIPPING INFORMATION
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      columnGap: "45px",
                    }}
                  >
                    <TextFieldElement
                      required
                      label="Name"
                      name="shipping_name"
                    />
                    <TextFieldElement label="Email" name="shipping_email" />
                    <TextFieldElement label="Phone" name="shipping_phone" />
                    <SelectElement
                      label="Country"
                      name="shipping_country_code"
                      sx={{ minWidth: 230 }}
                      required
                      options={countrys}
                      onChange={(value) => {
                        runCheckoutData(value);
                      }}
                    />
                    <TextFieldElement
                      required
                      label="City"
                      name="shipping_city"
                    />
                    <TextFieldElement label="State" name="shipping_zone" />
                    <TextFieldElement
                      required
                      label="Postal Code"
                      name="shipping_postcode"
                    />
                    <TextFieldElement
                      required
                      label="Address"
                      name="shipping_address"
                      sx={{ minWidth: 505 }}
                    />
                  </Box>
                </Paper>
              )}

              {state.checkOutType == "Batch order" && (
                <CheckoutCard
                  label="SHIPPING INFORMATION"
                  addressInfo={state.shipping}
                  children={
                    (addressInfo?.shipping?.length ?? 0) > 1 && (
                      <AddressModal
                        type="shipping"
                        addresses={addressInfo?.shipping ?? []}
                        onSelect={(address) => {
                          setState({
                            shipping: address,
                          });
                        }}
                        trigger={
                          <Button sx={{ marginBlockEnd: "35px" }}>
                            Select Shipping Information
                          </Button>
                        }
                      />
                    )
                  }
                />
              )}
              <CheckoutCard addressInfo={state.billing}>
                {(addressInfo?.billing?.length ?? 0) > 1 && (
                  <AddressModal
                    type="billing"
                    addresses={addressInfo?.billing ?? []}
                    onSelect={(address) => {
                      setState({
                        billing: address,
                      });
                    }}
                    trigger={
                      <Button sx={{ marginBlockEnd: "35px" }}>
                        Select Billing Information
                      </Button>
                    }
                  />
                )}
              </CheckoutCard>

              {state.checkOutType == "Batch order" && (
                <Paper
                  sx={{
                    padding: "20px 10px",
                    background: "#fff",
                    marginBottom: "40px",
                    width: "800px",
                  }}
                >
                  <Typography
                    color="primary"
                    fontWeight={500}
                    fontSize="1.2rem"
                    marginBottom="20px"
                  >
                    Shipment method
                  </Typography>
                  <RadioButtonGroup
                    name="fulfillmentChannelCode"
                    row
                    required
                    options={[
                      { id: "代发", label: "Ship by supplier" },
                      { id: "自提", label: "Self-pickup" },
                    ]}
                  ></RadioButtonGroup>
                </Paper>
              )}
            </Box>

            <CartSummary
              summary={{
                count: checkoutData?.snaps_count,
                totalPrice: checkoutData?.total_price,
                tradeClauseCodePrice: userData?.eya_t2.tradeClauseCodePrice,
              }}
              type="checkout"
              sx={{
                marginTop: "95px",
                top: "25px",
              }}
            />
          </Box>
        </FormContainer>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  ) : (
    <></>
  );
}
