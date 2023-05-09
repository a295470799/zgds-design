import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  onSelect: (type: "Dropship" | "Batch order") => void;
};
const OrderTypeSelect: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.open}
      disableEscapeKeyDown={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: "300px",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={(theme) => {
          return {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
            fontSize: "1.4rem",
            padding: "9px 24px",
            textAlign: "center",
          };
        }}
      >
        Please select an order type
      </DialogTitle>
      <DialogActions sx={{ justifyContent: "space-around", padding: "30px 0" }}>
        <Button onClick={() => props.onSelect("Dropship")}>Dropship</Button>
        <Button onClick={() => props.onSelect("Batch order")}>
          Batch order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderTypeSelect;
