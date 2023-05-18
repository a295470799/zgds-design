import {
  formatPrice,
  formatBeijingDate,
  formatDate,
  blobToJson,
} from "@/utils/format";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, GridOptions } from "ag-grid-community";
import { styled } from "@mui/material/styles";
import {
  Controller,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import DatePicker from "react-datepicker";
import "@/styles/react-datepicker.css";
import { useSetState } from "ahooks";
import MultipleSelectElement from "#lib/MultipleSelectElement";
import CheckSquareIcon from "@assets/icons/account/CheckSquare.svg";
import CIDetail from "./CIDetail";
import { downloadCiInvoice, getInvoiceInfo } from "@/api/account";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const StyledActionButton = styled(Button)`
  height: 22px;
  font-size: 1.2rem;
  padding: 0 10px;
  min-width: auto;
  font-weight: 400;
`;

type State = {
  open: boolean;
  params?: API.InvoiceListParams;
  gridOptions: GridOptions;
  gridDetailOptions: GridOptions;
  gridPartnersOptions: GridOptions;
  gridDetailData?: any[];
  gridPartnersData?: any[];
};

interface Props {
  rowData: any;
  onChange: (params?: API.InvoiceListParams) => void;
  filters?: any;
}

const CIGrid: React.FC<Props> = (props) => {
  const { rowData, onChange, filters } = props;

  const currencyFormatter = (params: any) => {
    return formatPrice(params.value);
  };

  const dateFormatter = (params: any) => {
    return formatDate(params.value, true);
  };

  const showDetail = async (invoiceNumber: string) => {
    setState({
      open: true,
      gridDetailData: [],
      gridPartnersData: [],
    });

    const res = await getInvoiceInfo(invoiceNumber);
    setState({
      gridDetailData: res.items,
      gridPartnersData: res.partners,
    });
  };

  const columnDefs: ColDef[] = [
    {
      field: "invoiceNumber",
      headerName: "CI NO.",
      width: 200,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      headerName: "Action",
      cellRenderer: (params: any) => {
        return (
          <Box>
            <StyledActionButton
              color="primary"
              onClick={() => showDetail(params.data.invoiceNumber)}
            >
              Detail
            </StyledActionButton>
          </Box>
        );
      },
    },
    { field: "orderNumber", headerName: "Order" },
    { field: "orderId", headerName: "Order ID" },
    { field: "oldOrderId", headerName: "Order ID (old)" },
    { field: "oldInvoiceNumber", headerName: "CI NO. (old)" },
    { field: "customContractId", headerName: "PO NO." },
    { field: "customerName", headerName: "Client name" },
    { field: "invoiceBusinessTypeValue", headerName: "Invoice type" },
    { field: "currencyCode", headerName: "Currency" },
    { field: "fromCountryCode", headerName: "From country" },
    { field: "fromProvinceCode", headerName: "From province" },
    { field: "destCountryCode", headerName: "To country" },
    { field: "destProvinceCode", headerName: "To province" },
    { field: "paymentConditionValue", headerName: "Price term" },
    { field: "tradeClauseCode", headerName: "Trade term" },
    {
      field: "orderTotalAmount",
      headerName: "Order total",
      valueFormatter: currencyFormatter,
    },
    {
      field: "orderTaxAmount",
      headerName: "Tax",
      valueFormatter: currencyFormatter,
    },
    { field: "orderTaxRadio", headerName: "Tax rate" },
    {
      field: "orderFreight",
      headerName: "Shipping",
      valueFormatter: currencyFormatter,
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      sortable: true,
      unSortIcon: true,
      valueFormatter: dateFormatter,
    },
  ];

  const columnDetailDefs: ColDef[] = [
    { field: "orderId", headerName: "Order ID" },
    { field: "invoiceNumberCode", headerName: "CI NO." },
    { field: "productMainCode", headerName: "SKU" },
    { field: "productNameEn", headerName: "Product" },
    { field: "skuNumber", headerName: "Qty" },
    { field: "customDisplayCode", headerName: "Customer's SKU" },
    {
      field: "excludingTaxPrices",
      headerName: "ex.Tax Total",
      valueFormatter: currencyFormatter,
    },
    {
      field: "skuFreight",
      headerName: "Shipping",
      valueFormatter: currencyFormatter,
    },
    {
      field: "skuTaxAmount",
      headerName: "Tax",
      valueFormatter: currencyFormatter,
    },
    {
      field: "includingTaxPrices",
      headerName: "incl.Tax Total",
      valueFormatter: currencyFormatter,
    },
    { field: "skuTaxRadio", headerName: "Tax rate" },
    {
      field: "sellingPrice",
      headerName: "Selling Price",
      valueFormatter: currencyFormatter,
    },
    {
      field: "includeTaxPrice",
      headerName: "incl.Tax Unit",
      valueFormatter: currencyFormatter,
    },
    {
      field: "excludeTaxPrice",
      headerName: "ex.Tax Unit",
      valueFormatter: currencyFormatter,
    },
  ];

  const columnPartnersDefs: ColDef[] = [
    { field: "partnerType", headerName: "Partner type" },
    { field: "partnerName", headerName: "Partner name" },
    { field: "contractName", headerName: "Contact name" },
    { field: "contractAddress1", headerName: "Add1" },
    { field: "contractAddress2", headerName: "Add2" },
    { field: "contractPhone", headerName: "Phone" },
    { field: "contractEmail", headerName: "Mail" },
    { field: "contractCountryCode", headerName: "Country" },
    { field: "contractStateyCode", headerName: "Province" },
    { field: "contractCityCode", headerName: "City" },
    { field: "contractPostalCode", headerName: "Postcode" },
  ];

  const [state, setState] = useSetState<State>({
    open: false,
    params: {
      page: 1,
      page_size: 50,
    },
    gridOptions: {
      defaultColDef: {
        initialWidth: 160,
        resizable: true,
      },
      rowSelection: "multiple",
      ensureDomOrder: true,
      enableCellTextSelection: true,
      multiSortKey: "ctrl",
      onSortChanged: onChange,
      columnDefs: columnDefs,
    },
    gridDetailOptions: {
      defaultColDef: {
        initialWidth: 140,
        resizable: true,
        filter: true,
        sortable: true,
        floatingFilter: true,
      },
      ensureDomOrder: true,
      enableCellTextSelection: true,
      columnDefs: columnDetailDefs,
      rowData: [],
    },
    gridPartnersOptions: {
      defaultColDef: {
        initialWidth: 140,
        resizable: true,
      },
      ensureDomOrder: true,
      enableCellTextSelection: true,
      columnDefs: columnPartnersDefs,
      rowData: [],
    },
  });

  const handleSearch = (value: any) => {
    const searchParams: API.InvoiceListParams = {
      ...state.params,
      ...value,
    };
    if (
      Array.isArray(searchParams.search_date) &&
      searchParams.search_date.length > 0
    ) {
      searchParams.search_date = searchParams.search_date
        .filter((item: string) => item)
        .map((item: string) => formatBeijingDate(item));
    }
    setState({ params: searchParams });
    onChange(searchParams);
  };
  const [loading, setLoading] = useState(false);
  const handleDownloadCI = async () => {
    const ids = state.gridOptions.api?.getSelectedRows().map((item) => item.id);
    if (Array.isArray(ids) && ids.length > 0) {
      try {
        setLoading(true);
        const res = await downloadCiInvoice(ids);
        if (res?.data?.type == "application/pdf") {
          const fileUrl = window.URL.createObjectURL(new Blob([res.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileUrl;
          fileLink.setAttribute(
            "download",
            `${Math.round(new Date().valueOf() / 1000)}.pdf`
          ); // 设置下载文件的名称
          document.body.appendChild(fileLink);
          fileLink.click();
        } else {
          blobToJson(res.data)
            .then((json) => {
              enqueueSnackbar(json?.message || "System busy, please retry", {
                variant: "error",
              });
            })
            .catch((error) => {
              console.error(error);
              enqueueSnackbar("System busy, please retry", {
                variant: "error",
              });
            });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <FormContainer
        onSuccess={handleSearch}
        values={{
          ship_to: [],
          freeFaxNumber: [],
        }}
      >
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          padding={"0 20px"}
          columnGap={"25px"}
          sx={{
            "& .MuiFormHelperText-root": {
              display: "none",
            },
          }}
        >
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            flex={1}
            sx={{
              "> .MuiFormControl-root": {
                marginTop: "15px",
              },
            }}
          >
            <Box
              width={"48%"}
              marginTop={"15px"}
              sx={{
                "& .mui__clear_icon": {
                  "&::after": {
                    content: '""',
                    width: "20px",
                    height: "20px",
                    padding: "3px",
                    background:
                      "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzcwNzA3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiPjwvcGF0aD4KPC9zdmc+)",
                  },
                  "&:hover::after": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                },
              }}
            >
              <Controller
                name="search_date"
                render={({ field: { value, onChange, ref } }) => (
                  <DatePicker
                    selected={value?.[0]}
                    onChange={onChange}
                    startDate={value?.[0]}
                    endDate={value?.[1]}
                    selectsRange
                    customInput={
                      <TextField
                        label="Invoice Date"
                        value={value ?? ""}
                        inputRef={ref}
                        InputProps={{
                          autoComplete: "off",
                        }}
                        fullWidth
                      />
                    }
                    dateFormat="yyyy/MM/dd"
                    monthsShown={2}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormatCalendar="yyyy/MM/dd"
                    isClearable
                    clearButtonTitle="Clear"
                    clearButtonClassName="mui__clear_icon"
                  />
                )}
              />
            </Box>

            <Box width={"48%"} marginTop={"15px"}>
              <MultipleSelectElement
                name="ship_to"
                options={
                  filters?.shipping_countrys?.map((item: any) => {
                    return {
                      id: item?.area_code,
                      label: item?.area_short_name_en,
                    };
                  }) ?? []
                }
                label="Ship to"
              />
            </Box>

            <Box width={"48%"} marginTop={"15px"}>
              <MultipleSelectElement
                name="freeFaxNumber"
                options={filters?.freeFaxNumbers ?? []}
                label="VAT NO"
              />
            </Box>

            <TextFieldElement
              sx={{ width: "48%" }}
              name="keyword"
              label="Search for"
              type="search"
              placeholder="Input CI NO./Order/Order ID"
              InputProps={{
                autoComplete: "off",
              }}
            />
          </Box>
          <Button type="submit" color="success" size="medium">
            Search
          </Button>
        </Box>
      </FormContainer>
      <Box display={"flex"} columnGap={2} padding={"20px 20px 0"}>
        <Button color="success" size="medium" onClick={handleDownloadCI}>
          <img src={CheckSquareIcon} style={{ marginRight: "5px" }} />
          Download CI PDF
        </Button>
      </Box>
      <Box
        width={930}
        height={500}
        className="ag-theme-alpine"
        marginTop={"20px"}
        sx={(theme) => {
          return {
            ".ag-header-cell-text, .ag-cell-value, .ag-group-value": {
              color: theme.palette.text.third,
            },
          };
        }}
      >
        <AgGridReact
          rowData={rowData?.data}
          onGridReady={() => onChange(state.params)}
          gridOptions={state.gridOptions}
          onSortChanged={(e) => {
            var sort = state.gridOptions?.columnApi
              ?.getColumnState()
              ?.filter(function (s) {
                return s.sort != null;
              })
              .map(function (s) {
                return { name: s.colId, order: s.sort };
              });
            handleSearch({ sort: sort ?? [] });
          }}
          onFirstDataRendered={(event) => {
            const allColumnIds: any[] =
              event.columnApi?.getColumns()?.map((column) => column.getId()) ??
              [];
            event.columnApi?.autoSizeColumns(allColumnIds, false);
          }}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"20px"}
      >
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <Typography fontSize={"1.4rem"}>View</Typography>
          <Select
            sx={{ height: "30px", fontSize: "1.4rem" }}
            value={state.params?.page_size}
            onChange={(e) => {
              handleSearch({ page: 1, page_size: e.target.value as number });
            }}
          >
            {[50, 100, 200, 300, 500].map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
          <Typography fontSize={"1.4rem"}>Per Page</Typography>
        </Box>
        {rowData?.last_page && (
          <Pagination
            count={rowData?.last_page}
            variant="outlined"
            shape="rounded"
            onChange={(e, value) => {
              handleSearch({ page: value });
            }}
            defaultPage={Number(state.params?.page) ?? 1}
          />
        )}
      </Box>

      <CIDetail
        open={state.open}
        onClose={() => setState({ open: false })}
        detailOptions={state.gridDetailOptions}
        partnersOptions={state.gridPartnersOptions}
        detailData={state.gridDetailData}
        partnersData={state.gridPartnersData}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CIGrid;
