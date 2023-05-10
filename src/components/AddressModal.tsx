import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BootstrapDialogTitle from "#lib/BootstrapDialogTitle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
    width: "700px",
  },
}));

type AddressModalProps = {
  type: "shipping" | "billing";
  addresses: API.EyaUserInfo[];
  onSelect: (address: API.EyaUserInfo) => void;
  trigger?: JSX.Element;
};

const AddressModal: React.FC<AddressModalProps> = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    type = "shipping",
    addresses = [],
    onSelect,
    trigger = <Button variant="outlined">Open dialog</Button>,
  } = props;

  const clonedTrigger = React.cloneElement(trigger, {
    onClick: () => {
      trigger?.props?.onClick?.();
      handleClickOpen();
    },
  });

  return (
    <div>
      {clonedTrigger}
      <BootstrapDialog open={open} maxWidth="md">
        <BootstrapDialogTitle onClose={handleClose} titleSx={{ m: 0, p: 2 }}>
          <Typography color="primary" fontWeight={500}>{`Select ${
            type == "shipping" ? "Shipping" : "Billing"
          } Address`}</Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ITEM</TableCell>
                  <TableCell>CLIENT NAME</TableCell>
                  <TableCell>SHORT NAME</TableCell>
                  <TableCell>TAX CODE</TableCell>
                  <TableCell>SELECT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addresses?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {item.customerTypeCode == "T5" ? "Ship to" : ""}
                        {item.customerTypeCode == "T6" ? "Bill to" : ""}
                      </TableCell>
                      <TableCell>{item.customerName}</TableCell>
                      <TableCell>{item.customerShortName}</TableCell>
                      <TableCell>
                        {type == "billing" && item.taxNumber}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => {
                            onSelect(item);
                            handleClose();
                          }}
                        >
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default AddressModal;
