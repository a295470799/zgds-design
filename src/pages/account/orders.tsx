import AccountWrapper from "@/components/account/AccountWrapper";
import { formatPrice } from "@/utils/format";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyReturnIcon from "@assets/icons/account/KeyReturn.svg";
import ListChecksIcon from "@assets/icons/account/ListChecks.svg";
import { useRequest } from "ahooks";
import { useLocation } from "react-router";
import qs from "query-string";
import WarningIcon from "@assets/icons/account/WarningCircle.svg";
import OrderGrid from "@/components/account/orders/OrderGrid";
import { getOrderList } from "@/api/order";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VolumeOrder from "@/components/account/orders/VolumeOrder";

const StyledCardLable = styled("p")`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  font-weight: 500;
`;

const StyledCardValue = styled("p")`
  font-size: 1.6rem;
  font-weight: 700;
`;

const StyledTabButton = styled(Button)<{ badge?: string }>`
  position: relative;
  &.active {
    background: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-weight: 700;
    padding: 6px 10px;
  }
  ${(props) => {
    return props.badge == "Pending"
      ? `&::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 12px;
          height: 12px;
          background: url(${WarningIcon}) no-repeat center;
        }`
      : "";
  }}
`;

export default function () {
  const location = useLocation();
  const navigate = useNavigate();

  const [volumeOrder, setVolumeOrder] = useState(false);

  const locationParams = qs.parse(location.search, {
    arrayFormat: "comma",
  }) as API.OrderListParams;

  if (
    locationParams?.search_date &&
    typeof locationParams?.search_date == "string"
  ) {
    locationParams.search_date = new Array(locationParams.search_date);
  }

  if (
    locationParams?.order_type &&
    typeof locationParams?.order_type == "string"
  ) {
    locationParams.order_type = new Array(locationParams.order_type);
  }

  if (locationParams?.ship_to && typeof locationParams?.ship_to == "string") {
    locationParams.ship_to = new Array(locationParams.ship_to);
  }

  const params: API.OrderListParams = Object.assign(
    {
      page: 1,
      page_size: 50,
      search_date: [],
      order_type: [],
      ship_to: [],
    },
    locationParams
  );

  const { data: orderList, runAsync: runOrderList } = useRequest<
    any,
    [API.OrderListParams?]
  >(getOrderList, {
    defaultParams: [params],
    debounceWait: 300,
    manual: true,
  });

  useEffect(() => {
    runOrderList(params);
  }, [location]);

  return (
    <AccountWrapper code="orders" title="My Orders">
      <Paper
        sx={(theme) => {
          return {
            background: theme.palette.primary.light,
            color: theme.palette.common.white,
          };
        }}
      >
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          height={"60px"}
        >
          <Box textAlign={"center"}>
            <StyledCardLable>Orders</StyledCardLable>
            <StyledCardValue>12</StyledCardValue>
          </Box>
          <Box textAlign={"center"}>
            <StyledCardLable>Ordered items</StyledCardLable>
            <StyledCardValue>471</StyledCardValue>
          </Box>
          <Box textAlign={"center"}>
            <StyledCardLable>Total amount</StyledCardLable>
            <StyledCardValue>{formatPrice(12723.39)}</StyledCardValue>
          </Box>
        </Box>
      </Paper>
      <Paper
        sx={{
          width: "80%",
          margin: "20px auto",
          height: "70px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography color={"primary"} fontSize={"1.2rem"} fontWeight={500}>
          You can also <b>PLACE ORDER</b> by
        </Typography>
        <Button
          color="success"
          sx={{ width: "180px" }}
          onClick={() => navigate("/account/quickOrder")}
        >
          <Typography fontSize={"1.2rem"} fontWeight={700} marginRight={1}>
            Quick Order
          </Typography>
          <img src={KeyReturnIcon} />
        </Button>
        <Button
          color="success"
          sx={{ width: "180px" }}
          onClick={() => setVolumeOrder(true)}
        >
          <Typography fontSize={"1.2rem"} fontWeight={700} marginRight={1}>
            Volume Order
          </Typography>
          <img src={ListChecksIcon} />
        </Button>
      </Paper>

      <Paper>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"10px 20px"}
        >
          <Box display={"flex"} columnGap={"10px"}>
            {[
              "",
              "Pending",
              "Confirmed",
              "Processing",
              "Packed",
              "Completed",
              "Cancelled",
            ].map((item) => {
              const lowerItem = item.toLowerCase();
              return (
                <StyledTabButton
                  variant="text"
                  badge={item}
                  key={item}
                  sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                  onClick={() => {
                    navigate(
                      `/account/orders${item ? `?type=${lowerItem}` : ""}`
                    );
                  }}
                  className={(params?.type ?? "") == lowerItem ? "active" : ""}
                >
                  {item || "All orders"}
                </StyledTabButton>
              );
            })}
          </Box>
          <Box display={"flex"} columnGap={"3px"} fontSize={"1.2rem"}>
            <Typography color={"primary"} fontWeight={700}>
              {orderList?.total ?? 0}
            </Typography>
            <Typography fontWeight={500} color={"text.secondary"}>
              results
            </Typography>
          </Box>
        </Box>
        <Box padding={"10px 20px"}>
          <StyledTabButton
            variant="text"
            onClick={() => navigate("/account/orders?type=pdf")}
            className={params?.type == "pdf" ? "active" : ""}
          >
            <Typography
              color={"secondary"}
              fontSize={"1.2rem"}
              fontWeight={500}
              padding={"6px"}
              sx={{ textDecoration: "underline" }}
            >
              PI PDF download
            </Typography>
          </StyledTabButton>
        </Box>

        <OrderGrid
          type={params?.type}
          rowData={orderList}
          onChange={(data) => {
            navigate(
              qs.stringifyUrl(
                {
                  url: "/account/orders",
                  query: data,
                },
                {
                  arrayFormat: "comma",
                }
              )
            );
          }}
          defaultParams={params}
        />

        <VolumeOrder open={volumeOrder} onClose={() => setVolumeOrder(false)} />
      </Paper>
    </AccountWrapper>
  );
}
