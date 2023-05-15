import Layout from "#lib/Layout";
import { createQuickOrder } from "@/api/order";
import { getCountrys } from "@/api/country";
import { getEyaUsers, getLoginUser } from "@/api/user";
import AddressModal from "@/components/AddressModal";
import OrderTypeSelect from "@/components/OrderTypeSelect";
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
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import BackIcon from "@assets/icons/account/back.svg";
import ShippingFormCard from "@/components/account/quickOrder/ShippingFormCard";
import AddressCard from "@/components/account/quickOrder/AddressCard";
import ProductTable, {
  ProductListProps,
} from "@/components/account/quickOrder/ProductTable";
import { useMessage } from "#lib/MessageProvider";

const StyledPaper = styled(Paper)`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 20px 30px;
  width: 553px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

type CheckoutState = {
  dialogOpen: boolean;
  orderType?: "Dropship" | "Batch order";
  shipping?: API.EyaUserInfo;
  billing?: API.EyaUserInfo;
  skuItems?: ProductListProps;
};

type AddressInfo = {
  shipping?: API.EyaUserInfo[];
  billing?: API.EyaUserInfo[];
};

export default function QuickOrder() {
  const [state, setState] = useSetState<CheckoutState>({
    dialogOpen: true,
  });
  const { msg } = useMessage();
  const navigate = useNavigate();

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
    { ready: !state.dialogOpen, manual: true, retryCount: 5 }
  );

  // 根据shipping国家id和订单类型获取对应数据
  useEffect(() => {
    if (state.orderType == "Dropship") {
      runGetCountry();
    }
  }, [state.orderType]);

  const handleDialogClick = (type: CheckoutState["orderType"]) => {
    setState({
      orderType: type,
      dialogOpen: false,
    });
  };

  const { loading, runAsync: runPlaceOrder } = useRequest<
    any,
    [API.CreateOrderParams]
  >(createQuickOrder, {
    manual: true,
  });

  const handleSubmit = async (data: any) => {
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

    if ((state.skuItems?.length ?? 0) > 0) {
      if (!state.skuItems?.every((item) => item.status == "Available")) {
        enqueueSnackbar("Product information is incorrect", {
          variant: "error",
        });
        return;
      }
    } else {
      enqueueSnackbar("No product information", {
        variant: "error",
      });
      return;
    }

    await runPlaceOrder({
      skuItems: state.skuItems.map((item) => {
        return {
          sku: item.sku,
          count: item.qty,
        };
      }),
      shipTo: state.shipping?.partnerCode ?? "",
      billTo: state.billing?.partnerCode ?? "",
      shipping_name: data.shipping_name ?? "",
      shipping_email: data.shipping_email ?? "",
      shipping_phone: data.shipping_phone ?? "",
      shipping_country_code: data.shipping_country_code ?? "",
      shipping_city: data.shipping_city ?? "",
      shipping_zone: data.shipping_zone ?? "",
      shipping_postcode: data.shipping_postcode ?? "",
      shipping_address: data.shipping_address ?? "",
      fulfillmentChannelCode: data.fulfillmentChannelCode ?? "",
      orderTypeCode: state.orderType ?? "",
      tradeClauseCode: data.tradeClauseCode ?? "",
      pricingTradeClauseCode: data.pricingTradeClauseCode ?? "",
      customContractId: data.customContractId ?? "",
    });

    msg({
      message: "Order placed, please go to My Orders to confirm!",
      onConfirm() {
        navigate("/account/orders");
      },
    });
  };

  return (
    <Layout title="Quick Order">
      <OrderTypeSelect open={state.dialogOpen} onSelect={handleDialogClick} />

      {state.orderType && (
        <FormContainer onSuccess={handleSubmit}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={"20px"}
          >
            <Box
              display={"flex"}
              columnGap={"60px"}
              alignItems={"center"}
              fontSize={"1.2rem"}
              fontWeight={500}
              color={"text.secondary"}
            >
              <Button onClick={() => navigate(-1)}>
                <img src={BackIcon} />
                <Typography fontSize={"1.2rem"} ml={1}>
                  Back to <b>My Orders</b>
                </Typography>
              </Button>
              {state.orderType == "Batch order" && (
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
                          marginRight: 1,
                        },
                        "& .MuiButtonBase-root": {
                          padding: "0 2px 0 8px",
                        },
                        "& .MuiFormHelperText-root, .MuiFormLabel-asterisk": {
                          display: "none",
                        },
                      },
                    };
                  }}
                >
                  <RadioButtonGroup
                    label="Shipment method: "
                    name="fulfillmentChannelCode"
                    row
                    required
                    options={[
                      { id: "代发", label: "Ship by supplier" },
                      { id: "自提", label: "Self-pickup" },
                    ]}
                  />
                </Box>
              )}
              <Box sx={{ display: "flex" }}>
                <Typography marginRight={1}>Price Term:</Typography>
                <Typography>{userData?.eya_t2.tradeClauseCodePrice}</Typography>
                <TextFieldElement
                  name="pricingTradeClauseCode"
                  value={userData?.eya_t2.tradeClauseCodePrice}
                  sx={{ display: "none" }}
                />
              </Box>
              <Box sx={{ display: "flex" }} alignItems={"center"}>
                <Box sx={{ display: "flex" }} marginRight={1}>
                  <Typography color="secondary">*</Typography>Trade term
                </Box>
                <SelectElement
                  name="tradeClauseCode"
                  required
                  options={["EXW", "DDP", "DDU"].map((item) => {
                    return {
                      id: item,
                      label: item,
                    };
                  })}
                  sx={{
                    width: "77px",
                    fontSize: "1.2rem",
                    "& .MuiInputBase-root": { height: "25px" },
                    "& .MuiFormHelperText-root, .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                    "& .MuiInputBase-input": { fontSize: "1.2rem" },
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Button color="success" type="submit">
                Submit
              </Button>
            </Box>
          </Box>

          <Box
            display={"flex"}
            justifyContent={"center"}
            gap={"46px"}
            flexWrap={"wrap"}
          >
            {/* SHIPPING INFORMATION */}
            <StyledPaper>
              {state.orderType == "Dropship" ? (
                <ShippingFormCard countrys={countrys} />
              ) : (
                <AddressCard type="shipping" addressInfo={state.shipping}>
                  {(addressInfo?.shipping?.length ?? 0) > 1 && (
                    <AddressModal
                      type="shipping"
                      addresses={addressInfo?.shipping ?? []}
                      onSelect={(address) => {
                        setState({
                          shipping: address,
                        });
                      }}
                      trigger={
                        <Button sx={{ marginBlockEnd: "25px" }}>
                          Select Billing Information
                        </Button>
                      }
                    />
                  )}
                </AddressCard>
              )}
            </StyledPaper>

            {/* BILLING INFORMATION */}
            <StyledPaper>
              <AddressCard type="billing" addressInfo={state.billing}>
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
                      <Button sx={{ marginBlockEnd: "25px" }}>
                        Select Billing Information
                      </Button>
                    }
                  />
                )}
              </AddressCard>
            </StyledPaper>

            <StyledPaper sx={{ width: "80%" }}>
              <ProductTable
                onChange={(data) => {
                  setState({ skuItems: data });
                }}
              />
            </StyledPaper>
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
  );
}
