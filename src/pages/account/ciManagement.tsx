import AccountWrapper from "@/components/account/AccountWrapper";
import { Paper } from "@mui/material";
import { useRequest } from "ahooks";
import { useLocation } from "react-router";
import qs from "query-string";
import { getInvoiceList } from "@/api/account";
import CIGrid from "@/components/account/ciManagement/CIGrid";
import { getCiFilter } from "@/api/account";

export default function () {
  const location = useLocation();
  const type = (qs.parse(location.search)?.type as string) ?? "";

  const { data: invoiceList, runAsync: runInvoiceList } = useRequest<
    any,
    [API.InvoiceListParams?]
  >(getInvoiceList, {
    manual: true,
  });

  const { data: filters } = useRequest(getCiFilter, {
    debounceWait: 300,
  });

  return (
    <AccountWrapper code="ci">
      <Paper>
        <CIGrid
          rowData={invoiceList}
          onChange={runInvoiceList}
          filters={filters}
        />
      </Paper>
    </AccountWrapper>
  );
}
