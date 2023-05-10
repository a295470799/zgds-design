import { createContext, useState, useCallback, useMemo } from "react";
import { Dialog, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import BootstrapDialogTitle from "./BootstrapDialogTitle";

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
        <BootstrapDialog open={true} maxWidth="xs">
          <BootstrapDialogTitle
            onClose={handleClose}
            titleSx={{
              padding: "9px 24px",
              textAlign: "center",
              background: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.common.white,
            }}
            closeSx={{
              top: 5,
              color: (theme) => theme.palette.common.white,
            }}
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
