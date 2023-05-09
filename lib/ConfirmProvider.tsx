import { createContext, useState, useCallback, useMemo } from "react";
import { Dialog, DialogTitle, Button, IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";

interface ConfirmDialog {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

interface ConfirmContextProps {
  confirm: (params: Omit<ConfirmDialog, "open">) => void;
}

const ConfirmContext = createContext<ConfirmContextProps>({
  confirm: () => {},
});

interface ConfirmProviderProps {
  children: React.ReactNode;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={(theme) => {
        return {
          background: theme.palette.primary.main,
          color: theme.palette.common.white,
          fontSize: "1.4rem",
          padding: "9px 24px",
          textAlign: "center",
        };
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 5,
            color: (theme) => theme.palette.common.white,
          }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ConfirmProvider: React.FC<ConfirmProviderProps> = ({ children }) => {
  const [dialog, setDialog] = useState<ConfirmDialog | null>(null);

  const handleConfirmOpen = useCallback(
    (params: {
      title?: string;
      message: string;
      confirmText?: string;
      onConfirm: () => void;
      cancelText?: string;
      onCancel?: () => void;
    }) => {
      setDialog({
        open: true,
        ...params,
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setDialog(null);
  }, []);

  const confirm = useCallback(
    (params: {
      title?: string;
      message: string;
      confirmText?: string;
      onConfirm: () => void;
      cancelText?: string;
      onCancel?: () => void;
    }) => {
      handleConfirmOpen(params);
    },
    [handleConfirmOpen]
  );

  const contextValue = useMemo(() => {
    return { confirm };
  }, [confirm]);

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      {dialog && (
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={true}
          maxWidth="xs"
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {dialog?.title ?? "CONFIRMATION"}
          </BootstrapDialogTitle>
          <Box fontSize={"1.4rem"} padding={3}>
            {dialog?.message}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            marginBottom={3}
          >
            <Button
              color="secondary"
              onClick={() => {
                dialog.onConfirm();
                handleClose();
              }}
            >
              {dialog?.confirmText ?? "Yes"}
            </Button>
            <Button
              onClick={() => {
                dialog.onCancel?.();
                handleClose();
              }}
            >
              {dialog?.cancelText ?? "No"}
            </Button>
          </Box>
        </BootstrapDialog>
      )}
    </ConfirmContext.Provider>
  );
};

const useConfirm = () => useContext(ConfirmContext);

export { ConfirmProvider, ConfirmContext, useConfirm };
