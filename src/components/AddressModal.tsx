import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
    width: "700px",
  },
}));

type DialogTitleProps = {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
};

type AddressModalProps = {
  type: "shipping" | "billing";
  addresses: API.EyaUserInfo[];
  onSelect: (address: API.EyaUserInfo) => void;
  trigger?: JSX.Element;
};

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
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

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
    onClick: handleClickOpen,
  });

  return (
    <div>
      {clonedTrigger}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
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
                          variant="contained"
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
