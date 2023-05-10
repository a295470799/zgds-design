import { createContext, useState, useCallback, useMemo } from "react";
import { Dialog, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import React from "react";

interface MessageDialog {
  open: boolean;
  message: React.ReactNode;
  width?: number;
  confirmText?: string;
  onConfirm?: () => void;
}

interface MessageContextProps {
  msg: (params: Omit<MessageDialog, "open">) => void;
}

const MessageContext = createContext<MessageContextProps>({
  msg: () => {},
});

interface MessageProviderProps {
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

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [dialog, setDialog] = useState<MessageDialog | null>(null);

  const handleConfirmOpen = useCallback(
    (params: {
      message: React.ReactNode;
      width?: number;
      confirmText?: string;
      onConfirm?: () => void;
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

  const msg = useCallback(
    (params: {
      message: React.ReactNode;
      confirmText?: string;
      width?: number;
      onConfirm?: () => void;
    }) => {
      handleConfirmOpen(params);
    },
    [handleConfirmOpen]
  );

  const contextValue = useMemo(() => {
    return { msg };
  }, [msg]);

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
      {dialog && (
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={true}
          maxWidth="md"
        >
          <Box
            fontSize={"1.4rem"}
            padding={3}
            textAlign={"center"}
            width={dialog?.width ?? 300}
          >
            {dialog?.message}
          </Box>
          <Box display={"flex"} justifyContent={"center"} marginBottom={3}>
            <Button
              onClick={() => {
                dialog?.onConfirm?.();
                handleClose();
              }}
              sx={{ minWidth: 100 }}
            >
              {dialog?.confirmText ?? "OK"}
            </Button>
          </Box>
        </BootstrapDialog>
      )}
    </MessageContext.Provider>
  );
};

const useMessage = () => useContext(MessageContext);

export { MessageProvider, MessageContext, useMessage };
