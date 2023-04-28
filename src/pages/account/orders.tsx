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
import OrderGrid from "@/components/order/OrderGrid";
import { getOrderList } from "@/api/order";

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
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  const type = (qs.parse(location.search)?.type as string) ?? "";

  const { data: orderList, runAsync: runOrderList } = useRequest<
    any[],
    [API.OrderListParams?]
  >(getOrderList, {
    manual: true,
  });

  return (
    <AccountWrapper code="orders">
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
        elevation={24}
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
        <Button variant="contained" color="success" sx={{ width: "180px" }}>
          <Typography fontSize={"1.2rem"} fontWeight={700} marginRight={1}>
            Quick Order
          </Typography>
          <img src={KeyReturnIcon} />
        </Button>
        <Button variant="contained" color="success" sx={{ width: "180px" }}>
          <Typography fontSize={"1.2rem"} fontWeight={700} marginRight={1}>
            Volume Order
          </Typography>
          <img src={ListChecksIcon} />
        </Button>
      </Paper>

      <Paper elevation={24}>
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
                  badge={item}
                  key={item}
                  sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                  onClick={() => {
                    window.location.href = `/account/orders${
                      item ? `?type=${lowerItem}` : ""
                    }`;
                  }}
                  className={type == lowerItem ? "active" : ""}
                >
                  {item || "All orders"}
                </StyledTabButton>
              );
            })}
          </Box>
          <Box display={"flex"} columnGap={"3px"} fontSize={"1.2rem"}>
            <Typography fontSize={"inherit"} color={"primary"} fontWeight={700}>
              80
            </Typography>
            <Typography
              fontSize={"inherit"}
              fontWeight={500}
              color={"text.secondary"}
            >
              results
            </Typography>
          </Box>
        </Box>
        <Box padding={"10px 20px"}>
          <StyledTabButton
            onClick={() => {
              window.location.href = `/account/orders?type=pdf`;
            }}
            className={type == "pdf" ? "active" : ""}
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

        <OrderGrid type={type} rowData={orderList} onChange={runOrderList} />
      </Paper>
    </AccountWrapper>
  );
}
