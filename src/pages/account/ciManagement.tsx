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
import { getInvoiceList } from "@/api/account";
import CIGrid from "@/components/account/CIGrid";

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
    any,
    [API.OrderListParams?]
  >(getInvoiceList, {
    manual: true,
  });

  return (
    <AccountWrapper code="ci">
      <Paper>
        <CIGrid rowData={orderList} onChange={runOrderList} />
      </Paper>
    </AccountWrapper>
  );
}
