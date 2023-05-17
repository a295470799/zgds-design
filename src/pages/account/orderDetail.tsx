import Layout from "#lib/Layout";
import OrderAddress from "@/components/account/orderDetail/OrderAddress";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import OrderTimeline from "@/components/account/orderDetail/OrderTimeline";
import { formatDate, formatPrice } from "@/utils/format";
import CheckCircleIcon from "@assets/icons/account/CheckCircle.svg";
import ProhibitIcon from "@assets/icons/account/Prohibit.svg";
import RadioButtonIcon from "@assets/icons/account/RadioButton-f.svg";
import SpinnerGapIcon from "@assets/icons/account/SpinnerGap-r.svg";
import CurrencyCircleDollarIcon from "@assets/icons/account/CurrencyCircleDollar-r.svg";
import ScalesIcon from "@assets/icons/account/Scales-r.svg";
import CalendarIcon from "@assets/icons/account/Calendar-r.svg";
import CircleWavyWarningIcon from "@assets/icons/account/CircleWavyWarning.svg";
import { styled } from "@mui/material/styles";
import { useConfirm } from "#lib/ConfirmProvider";
import { useMessage } from "#lib/MessageProvider";
import { useRequest, useUpdateEffect } from "ahooks";
import ProductTable from "@/components/account/orderDetail/ProductTable";
import { cancelOrders, getOrder, updateOrder } from "@/api/order";
import qs from "query-string";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { checkSku } from "@/api/common";
import OrderPackageInfo from "@/components/account/orderDetail/OrderPackageInfo";
import BackIcon from "@assets/icons/account/back.svg";

const StyledFulfilled = styled(Box)<{ fulfilled: number }>`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 0 10px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.fulfilled == 0 ? "rgba(102,102,102,.2)" : "rgba(0,166,90,.5)"};
`;

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirm } = useConfirm();
  const { msg } = useMessage();

  const { type, id } = qs.parse(location.search);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);

  const handleDelete = (sku: string | number) => {
    confirm({
      message: "Are you sure to remove this item?",
      onConfirm() {
        setOrderParams({
          ...orderParams,
          skuItems: orderParams.skuItems.filter((item) => item.sku != sku),
        });
      },
    });
  };

  const { data: initOrderInfo } = useRequest<
    API.OrderInfo,
    [id: string, type: string]
  >(getOrder, {
    defaultParams: [id as string, type as string],
    debounceWait: 300,
  });

  const {
    data: orderInfo = initOrderInfo,
    runAsync: runUpdateOrder,
    loading,
  } = useRequest<API.OrderInfo, [API.UpdateOrderParams]>(
    async (data) => {
      const res = await updateOrder(data);
      return Object.assign(initOrderInfo as API.OrderInfo, res);
    },
    {
      manual: true,
    }
  );

  const formContent = useForm({
    values: {
      shipping_name: orderInfo?.shippingInfo?.name ?? "",
      shipping_email: orderInfo?.shippingInfo?.email ?? "",
      shipping_phone: orderInfo?.shippingInfo?.phone ?? "",
      shipping_country_code: orderInfo?.shippingInfo?.countryCode ?? "",
      shipping_zone: orderInfo?.shippingInfo?.zoneCode ?? "",
      shipping_city: orderInfo?.shippingInfo?.city ?? "",
      shipping_postcode: orderInfo?.shippingInfo?.postcode ?? "",
      shipping_address: orderInfo?.shippingInfo?.address ?? "",
    },
  });

  const [orderParams, setOrderParams] = useState<API.UpdateOrderParams>({
    action: "get",
  } as API.UpdateOrderParams);

  useUpdateEffect(() => {
    if (orderInfo) {
      setOrderParams({
        order_id: orderInfo?.id ?? 0,
        skuItems:
          orderInfo?.productList?.map((item) => {
            return {
              sku: item.sku0,
              count: item.skuNumber,
            };
          }) ?? [],
        shipTo: orderInfo?.shipTo ?? "",
        billTo: orderInfo?.billTo ?? "",
        ...formContent.getValues(),
        action: "get",
      });
    }
  }, [orderInfo]);

  const goBack = () => {
    if (location.state) {
      navigate(-1);
    } else {
      navigate("/account/orders");
    }
  };

  const handleSubmit = async (data: API.ShippingParams) => {
    const params: API.UpdateOrderParams = {
      ...orderParams,
      ...data,
      action: "update",
    };
    setOrderParams(params);
    await runUpdateOrder(params);

    msg({
      message: "Successfully!",
      onConfirm: goBack,
    });
  };

  const handleQtyChange = async (sku: string, count: number) => {
    const params: API.UpdateOrderParams = {
      ...orderParams,
      skuItems: orderParams?.skuItems?.map((item) => {
        if (item.sku == sku) {
          return { ...item, count };
        }
        return item;
      }),
      action: "get",
    };
    setOrderParams(params);
    await runUpdateOrder(params);
  };

  const handleAddSku = async (sku: string, count: number) => {
    if (orderParams?.skuItems?.findIndex((item) => item.sku == sku) != -1) {
      enqueueSnackbar("This order includes this SKU.", {
        variant: "error",
      });
    } else {
      const res = await checkSku(sku);
      if (res == 0) {
        enqueueSnackbar("SKU is unavailable", {
          variant: "error",
        });
      } else {
        orderParams?.skuItems?.push({ sku, count });
        const params: API.UpdateOrderParams = {
          ...orderParams,
          skuItems: orderParams?.skuItems,
          action: "get",
        };
        setOrderParams(params);
        await runUpdateOrder(params);
        setDialogOpen(false);
      }
    }
  };

  const handleAddressChange = async (
    type: "shipping" | "billing",
    data: API.EyaUserInfo
  ) => {
    if (data) {
      const params: API.UpdateOrderParams = {
        ...orderParams,
        shipTo: type == "shipping" ? data.partnerCode : orderParams.shipTo,
        billTo: type == "billing" ? data.partnerCode : orderParams.billTo,
        action: "get",
      };
      setOrderParams(params);
      if (type == "shipping") {
        await runUpdateOrder(params);
      }
    }
  };

  const handleCountryChange = async (code: string) => {
    const params: API.UpdateOrderParams = {
      ...orderParams,
      shipping_country_code: code,
      action: "get",
    };
    setOrderParams(params);
    await runUpdateOrder(params);
  };

  const handleCancelOrder = () => {
    if (orderParams?.order_id) {
      confirm({
        message: "Are you sure to cancel this order?",
        async onConfirm() {
          await cancelOrders([orderParams.order_id]);
          msg({
            message: "Cancel successfully!",
            onConfirm() {
              window.location.reload();
            },
          });
        },
      });
    } else {
      enqueueSnackbar("Invalid Order ID", {
        variant: "error",
      });
    }
  };

  return (
    <Layout
      title="Order Detail"
      bodyWrapperSx={(theme) => {
        return { background: theme.palette.background.paper };
      }}
    >
      <FormContainer formContext={formContent} onSuccess={handleSubmit}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Box flex={"0 0 auto"} width={"260px"} padding={"0 25px 20px"}>
            <Button onClick={goBack}>
              <img src={BackIcon} />
              <Typography fontSize={"1.2rem"} ml={1}>
                Back to <b>My Orders</b>
              </Typography>
            </Button>
            {orderInfo?.shippingInfo && (
              <OrderAddress
                action={type as string}
                status={orderInfo?.status}
                orderType={orderInfo?.orderType}
                addressInfo={orderInfo?.shippingInfo}
                countrys={orderInfo.countrys}
                zones={orderInfo.zones}
                callBack={(data) => handleAddressChange("shipping", data)}
                setValue={formContent.setValue}
                onCountryChange={handleCountryChange}
              />
            )}

            {orderInfo?.billingInfo && (
              <OrderAddress
                addressType="billing"
                action={type as string}
                status={orderInfo?.status}
                orderType={orderInfo?.orderType}
                addressInfo={orderInfo?.billingInfo}
                callBack={(data) => handleAddressChange("billing", data)}
              />
            )}

            <Paper sx={{ marginTop: "20px" }}>
              {orderInfo?.timeLine && (
                <OrderTimeline items={orderInfo?.timeLine} />
              )}
            </Paper>
          </Box>

          <Box flex={1}>
            <Paper
              sx={{
                padding: "21px 10px 16px",
                background: "rgba(0,116,163,.1)",
                color: "text.secondary",
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Typography>
                    <span>Order:</span> <b>{orderInfo?.orderNumber}</b>
                  </Typography>
                  <Typography>
                    <span>Order time:</span>{" "}
                    <b>{formatDate(orderInfo?.orderTime ?? "")}</b>
                  </Typography>
                  <Typography>
                    <span>Order type:</span> <b>{orderInfo?.orderType}</b>
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} columnGap={"10px"}>
                  <Typography fontSize={"1.6rem"} fontWeight={700}>
                    {orderInfo?.statusStr}
                  </Typography>
                  {type == "edit" && orderInfo?.status == 0 && (
                    <>
                      <Button color="success" type="submit">
                        <Typography fontSize="1.2rem" fontWeight={700}>
                          Confirm the order
                        </Typography>
                        <img src={CheckCircleIcon} />
                      </Button>
                      <Button color="secondary" onClick={handleCancelOrder}>
                        <Typography fontSize="1.2rem" fontWeight={700}>
                          Cancel the order
                        </Typography>
                        <img src={ProhibitIcon} />
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
              <Box display={"flex"} columnGap={"10px"} marginTop={"10px"}>
                <Typography fontWeight={700}>
                  Package/Shipping Status:
                </Typography>
                {(orderInfo?.status ?? 0) >= 30 ? (
                  <>
                    <StyledFulfilled fulfilled={1}>
                      <img src={RadioButtonIcon} />
                      <Typography color={"white"}>Fulfilled</Typography>
                    </StyledFulfilled>
                    <Button
                      sx={{ height: "20px", fontSize: "1.2rem" }}
                      onClick={() => setInfoDialogOpen(true)}
                    >
                      Detail
                    </Button>
                  </>
                ) : (
                  <StyledFulfilled fulfilled={0}>
                    <img src={SpinnerGapIcon} />
                    <Typography>Unfulfilled</Typography>
                  </StyledFulfilled>
                )}
              </Box>
            </Paper>
            <Paper
              sx={(theme) => {
                return {
                  padding: "26px 20px",
                  marginTop: "40px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  ["& .MuiBox-root"]: {
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.2rem",
                    color: theme.palette.text.secondary,
                    span: {
                      margin: "0 10px 0 2px",
                    },
                  },
                };
              }}
            >
              <Box>
                <img src={CurrencyCircleDollarIcon} />
                <span>Price Term</span>
                <b>{orderInfo?.priceTerm}</b>
              </Box>
              <Box>
                <img src={ScalesIcon} />
                <span>Trade Term</span>
                <b>{orderInfo?.tradeTerm}</b>
              </Box>
              <Box>
                <img src={CalendarIcon} />
                <span>Delivery Date(F)</span>
                <b>{formatDate(orderInfo?.deliveryDateF ?? "", true)}</b>
              </Box>
              <Box>
                <img src={CalendarIcon} />
                <span>Delivery Date(T)</span>
                <b>{formatDate(orderInfo?.deliveryDateT ?? "", true)}</b>
              </Box>
              <Box width={"100%"} marginTop={"10px"}>
                <img src={CircleWavyWarningIcon} />
                <span>Payment Term</span>
                <b>{orderInfo?.paymentTerm}</b>
              </Box>
            </Paper>
            <Paper sx={{ marginTop: "40px" }}>
              <Box
                height={"64px"}
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                sx={(theme) => {
                  return {
                    ["& .MuiBox-root"]: {
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.4rem",
                      color: theme.palette.text.secondary,
                      columnGap: "20px",
                      b: {
                        fontSize: "1.6rem",
                      },
                    },
                  };
                }}
              >
                <Box>
                  <span>Items:</span>
                  <b>{orderInfo?.items}</b>
                </Box>
                <Box>
                  <span>Tax:</span>
                  <b>{formatPrice(orderInfo?.tax)}</b>
                </Box>
                <Box>
                  <span>Shipping cost:</span>
                  <b>{formatPrice(orderInfo?.shippingCost)}</b>
                </Box>
                <Box>
                  <span>Total amount:</span>
                  <b>{formatPrice(orderInfo?.totalAmount)}</b>
                </Box>
              </Box>

              <ProductTable
                type="edit"
                status={orderInfo?.status}
                productList={orderInfo?.productList ?? []}
                onDelete={handleDelete}
                onQtyChange={handleQtyChange}
                onAddSku={setDialogOpen}
              />
            </Paper>
          </Box>
        </Box>
      </FormContainer>

      <Dialog open={dialogOpen} maxWidth="xs">
        <FormContainer
          onSuccess={async (data) => handleAddSku(data.sku, data.qty)}
        >
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent sx={{ paddingTop: "10px!important" }}>
            <TextFieldElement
              required
              label="SKU"
              name="sku"
              fullWidth
              autoFocus
            />

            <TextFieldElement
              required
              label="Qty"
              name="qty"
              fullWidth
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </FormContainer>
      </Dialog>

      <OrderPackageInfo
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        orderInformation={orderInfo?.orderInformation}
        palletInformation={orderInfo?.palletInformation}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
