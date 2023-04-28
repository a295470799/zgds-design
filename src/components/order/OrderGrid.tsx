import { formatPrice, formateDate } from "@/utils/format";
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
};

const OrderGrid: React.FC<Props> = (props) => {
  const { type, rowData, onChange } = props;

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
    return formateDate(params.value, true);
  };

  const editOrder = (id: string) => {
    window.location.href = "/account/orderShow?type=edit&id=" + id;
  };

  const showOrder = (id: string) => {
    window.location.href = "/account/orderShow?type=show&id=" + id;
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
              variant="contained"
              color="success"
              sx={{ marginRight: 1 }}
              onClick={() => editOrder(params.data.id)}
              disabled={params.data.status != "0"}
            >
              Edit
            </StyledActionButton>
            <StyledActionButton
              variant="contained"
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
    params: {
      type,
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
  });

  const handleSearch = (value: any) => {
    const searchParams = {
      ...state.params,
      ...value,
    };
    if (
      Array.isArray(searchParams.search_date) &&
      searchParams.search_date.length > 0
    ) {
      searchParams.search_date = searchParams.search_date
        .filter((item: string) => item)
        .map((item: string) => new Date(item).toLocaleDateString());
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
      <FormContainer onSuccess={handleSearch}>
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
                        label="Order Date"
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
              placeholder="Order/Order ID/PO NO./SKU"
              InputProps={{
                autoComplete: "off",
              }}
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            color="success"
            size="medium"
          >
            Search
          </Button>
        </Box>
      </FormContainer>
      {type == "pending" && (
        <Box display={"flex"} columnGap={2} padding={"20px 20px 0"}>
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={handleConfirmOrders}
          >
            Confirm selected
            <img src={CheckSquareIcon} style={{ marginLeft: "5px" }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleCancelOrders}
          >
            Cancel selected
            <img src={XSquareIcon} style={{ marginLeft: "5px" }} />
          </Button>
        </Box>
      )}

      {type == "pdf" && (
        <Box display={"flex"} columnGap={2} padding={"20px 20px 0"}>
          <Button variant="contained" color="success" size="medium">
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
        ></AgGridReact>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"20px"}
      >
        <Box display={"flex"} alignItems={"center"} columnGap={1}>
          <Typography>View</Typography>
          <Select
            sx={{ height: "30px" }}
            value={state.params?.page_size}
            onChange={(e) => {
              handleSearch({ page_size: e.target.value as number });
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
          <Typography>Per Page</Typography>
        </Box>
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
          defaultPage={state.params?.page}
        />
      </Box>
    </>
  );
};

export default OrderGrid;
