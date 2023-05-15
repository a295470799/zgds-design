import {
  Box,
  Dialog,
  DialogContent,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import BootstrapDialogTitle from "#lib/BootstrapDialogTitle";
import { AgGridReact } from "ag-grid-react";
import { GridOptions } from "ag-grid-community";

interface Props {
  open: boolean;
  onClose: () => void;
  detailOptions: GridOptions;
  partnersOptions: GridOptions;
  detailData?: any[];
  partnersData?: any[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box width={980}>{children}</Box>}
    </div>
  );
}

const CIDetail: React.FC<Props> = (props) => {
  const {
    open,
    onClose,
    detailData = [],
    partnersData = [],
    detailOptions,
    partnersOptions,
  } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} maxWidth="lg">
      <BootstrapDialogTitle onClose={onClose}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="CI Detail" />
            <Tab label="Partners" />
          </Tabs>
        </Box>
      </BootstrapDialogTitle>
      <DialogContent>
        <TabPanel value={value} index={0}>
          <Box
            width={980}
            height={370}
            className="ag-theme-alpine"
            sx={(theme) => {
              return {
                ".ag-header-cell-text, .ag-cell-value, .ag-group-value": {
                  color: theme.palette.text.third,
                },
              };
            }}
          >
            <AgGridReact
              rowData={detailData}
              gridOptions={detailOptions}
              onFirstDataRendered={(event) => {
                const allColumnIds: any[] =
                  event.columnApi
                    ?.getColumns()
                    ?.map((column) => column.getId()) ?? [];
                event.columnApi?.autoSizeColumns(allColumnIds, false);
              }}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            width={980}
            height={370}
            className="ag-theme-alpine"
            sx={(theme) => {
              return {
                ".ag-header-cell-text, .ag-cell-value, .ag-group-value": {
                  color: theme.palette.text.third,
                },
              };
            }}
          >
            <AgGridReact
              rowData={partnersData}
              gridOptions={partnersOptions}
              onFirstDataRendered={(event) => {
                const allColumnIds: any[] =
                  event.columnApi
                    ?.getColumns()
                    ?.map((column) => column.getId()) ?? [];
                event.columnApi?.autoSizeColumns(allColumnIds, false);
              }}
            />
          </Box>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default CIDetail;
