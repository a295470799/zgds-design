import { formatPrice, formatBeijingDate, formatDate } from "@/utils/format";
import {
  Box,
  Button,
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
import CheckSquareIcon from "@assets/icons/account/CheckSquare-r.svg";
import XSquareIcon from "@assets/icons/account/XSquare-r.svg";
import { cancelOrders, confirmOrders } from "@/api/order";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const StyledActionButton = styled(Button)`
  height: 22px;
  font-size: 1.2rem;
  padding: 0 10px;
  min-width: auto;
  font-weight: 400;
`;

type State = {
  params?: API.OrderListParams;
  gridOptions: GridOptions;
};

type Props = {
  rowData: any;
  type?: string;
  onChange: (params?: API.OrderListParams) => void;
  defaultParams?: API.OrderListParams;
};

const OrderGrid: React.FC<Props> = (props) => {
  const { type, rowData, onChange, defaultParams } = props;
  const navigate = useNavigate();

  const checkboxSelection = function (params: any) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };

  const headerCheckboxSelection = function (params: any) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };

  const currencyFormatter = (params: any) => {
    return formatPrice(params.value);
  };

  const dateFormatter = (params: any) => {
    return formatDate(params.value, true);
  };

  const editOrder = (id: string) => {
    navigate(`/account/orderDetail?type=edit&id=${id}`, {
      state: state.params,
    });
  };

  const showOrder = (id: string) => {
    navigate(`/account/orderDetail?type=show&id=${id}`, {
      state: state.params,
    });
  };

  const showCheckbox = type == "pending" || type == "pdf";

  const columnDefs: ColDef[] = [
    {
      field: "number",
      headerName: "Order",
      checkboxSelection: showCheckbox ? checkboxSelection : false,
      headerCheckboxSelection: showCheckbox ? headerCheckboxSelection : false,
    },
    {
      headerName: "Action",
      cellRenderer: (params: any) => {
        return (
          <Box>
            <StyledActionButton
              color="success"
              sx={{ marginRight: 1 }}
              onClick={() => editOrder(params.data.id)}
              disabled={params.data.status != "0"}
            >
              Edit
            </StyledActionButton>
            <StyledActionButton
              color="primary"
              onClick={() => showOrder(params.data.id)}
            >
              Detail
            </StyledActionButton>
          </Box>
        );
      },
    },
    { field: "eya_number", headerName: "Order ID" },
    { field: "customContractId", headerName: "PO NO." },
    { field: "status_str", headerName: "Status" },
    { field: "order_type", headerName: "Order Type" },
    { field: "invoiceNumber", headerName: "Invoice NO." },
    { field: "shipping_country", headerName: "Ship to" },
    { field: "snaps_count", headerName: "Item" },
    {
      field: "total_price",
      headerName: "Total Amount",
      valueFormatter: currencyFormatter,
    },
    {
      field: "created_at",
      headerName: "Order Date",
      sortable: true,
      unSortIcon: true,
      valueFormatter: dateFormatter,
    },
    {
      field: "updated_at",
      headerName: "Update Date",
      sortable: true,
      unSortIcon: true,
      valueFormatter: dateFormatter,
    },
  ];

  const [state, setState] = useSetState<State>({
    params: defaultParams,
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
  });

  const handleSearch = (value: any) => {
    const searchParams: API.OrderListParams = {
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

  const handleConfirmOrders = async () => {
    const ids = state.gridOptions?.api
      ?.getSelectedRows()
      ?.map((item) => item.id);
    if (Array.isArray(ids) && ids.length > 0) {
      await confirmOrders(ids);
      enqueueSnackbar("Success!", { variant: "success" });
      handleSearch(state.params);
    }
  };

  const handleCancelOrders = async () => {
    const ids = state.gridOptions?.api
      ?.getSelectedRows()
      ?.map((item) => item.id);
    if (Array.isArray(ids) && ids.length > 0) {
      await cancelOrders(ids);
      enqueueSnackbar("Success!", { variant: "success" });
      handleSearch(state.params);
    }
  };

  return (
    <>
      <FormContainer
        onSuccess={handleSearch}
        values={{
          order_type: defaultParams?.order_type,
          search_date: defaultParams?.search_date?.map(
            (item) => new Date(item)
          ),
          ship_to: defaultParams?.ship_to,
          keyword: defaultParams?.keyword,
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
                    value={value ?? []}
                    selected={value?.[0]}
                    onChange={onChange}
                    startDate={value?.[0]}
                    endDate={value?.[1]}
                    selectsRange
                    customInput={
                      <TextField
                        label="Order Date"
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
                name="order_type"
                options={[
                  { id: "Dropship", label: "Dropship" },
                  { id: "Batch order", label: "Batch order" },
                ]}
                label="Order Type"
              />
            </Box>

            <Box width={"48%"} marginTop={"15px"}>
              <MultipleSelectElement
                name="ship_to"
                options={[
                  { id: "DE", label: "DE" },
                  { id: "FR", label: "FR" },
                  { id: "FI", label: "FI" },
                  { id: "GR", label: "GR" },
                ]}
                label="Ship to"
              />
            </Box>

            <TextFieldElement
              sx={{ width: "48%" }}
              name="keyword"
              label="Search for"
              type="search"
              placeholder="Order/Order ID/PO NO./SKU"
            />
          </Box>
          <Button type="submit" color="success" size="medium">
            Search
          </Button>
        </Box>
      </FormContainer>
      {type == "pending" && (
        <Box display={"flex"} columnGap={2} padding={"20px 20px 0"}>
          <Button color="success" size="medium" onClick={handleConfirmOrders}>
            Confirm selected
            <img src={CheckSquareIcon} style={{ marginLeft: "5px" }} />
          </Button>
          <Button color="secondary" size="medium" onClick={handleCancelOrders}>
            Cancel selected
            <img src={XSquareIcon} style={{ marginLeft: "5px" }} />
          </Button>
        </Box>
      )}

      {type == "pdf" && (
        <Box display={"flex"} columnGap={2} padding={"20px 20px 0"}>
          <Button color="success" size="medium">
            <img src={CheckSquareIcon} style={{ marginRight: "5px" }} />
            Download PI PDF
          </Button>
        </Box>
      )}
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
          gridOptions={state.gridOptions}
          onSortChanged={(e) => {
            var sort = e.columnApi
              .getColumnState()
              .filter(function (s) {
                return s.sort != null;
              })
              .map(function (s) {
                return { name: s.colId, order: s.sort };
              });
            handleSearch({ sort: sort ?? [] });
          }}
          onFirstDataRendered={(e) => {
            const allColumnIds: any[] =
              e.columnApi?.getColumns()?.map((column) => column.getId()) ?? [];
            e.columnApi?.autoSizeColumns(allColumnIds, false);
          }}
        ></AgGridReact>
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
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "flex-end",
              },
            }}
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
    </>
  );
};

export default OrderGrid;
