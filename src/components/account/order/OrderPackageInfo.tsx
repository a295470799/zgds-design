import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  orderInformation?: any[];
  palletInformation?: any[];
};

type DialogTitleProps = {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box width={615}>{children}</Box>}
    </div>
  );
}

const OrderPackageInfo: React.FC<Props> = (props) => {
  const {
    open,
    onClose,
    orderInformation = [],
    palletInformation = [],
  } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} maxWidth="md" aria-labelledby="customized-dialog-title">
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Order Information" />
            <Tab label="Pallet Information" />
          </Tabs>
        </Box>
      </BootstrapDialogTitle>
      <DialogContent sx={{ paddingTop: "10px!important" }}>
        <TabPanel value={value} index={0}>
          <Table
            sx={{
              "& th, td": {
                fontSize: "1.2rem",
                color: "text.secondary",
                fontWeight: 500,
                padding: "10px",
              },
              "& th": {
                backgroundColor: "rgba(102,102,102,.2)",
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Order Quantity</TableCell>
                <TableCell>G.W. (kg)</TableCell>
                <TableCell>Available quantity</TableCell>
                <TableCell>Warehouse Name</TableCell>
                <TableCell>Volume (m³)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderInformation?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item?.sku0}</TableCell>
                    <TableCell>{item?.skuNumber}</TableCell>
                    <TableCell>{item?.totalRoughWeight}</TableCell>
                    <TableCell>{item?.qty}</TableCell>
                    <TableCell>{item?.whName}</TableCell>
                    <TableCell>{item?.totalVolume}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Table
            sx={{
              "& th, td": {
                fontSize: "1.2rem",
                color: "text.secondary",
                fontWeight: 500,
                padding: "10px",
              },
              "& th": {
                backgroundColor: "rgba(102,102,102,.2)",
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Reference NO.</TableCell>
                <TableCell>Warehouse Name</TableCell>
                <TableCell>Number of pallets</TableCell>
                <TableCell>Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {palletInformation?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item?.noutoasiakasNo}</TableCell>
                    <TableCell>{item?.whName}</TableCell>
                    <TableCell>{item?.num}</TableCell>
                    <TableCell>{item?.remark}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default OrderPackageInfo;
