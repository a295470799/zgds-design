import React from "react";
import { DialogTitle, IconButton, SxProps, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogTitleProps {
  titleSx?: SxProps<Theme>;
  closeSx?: SxProps<Theme>;
  children?: React.ReactNode;
  onClose?: () => void;
}

const BootstrapDialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { children, onClose, titleSx, closeSx, ...other } = props;

  return (
    <DialogTitle
      sx={{
        fontSize: "1.4rem",
        p: 2,
        ...titleSx,
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
            top: 8,
            ...closeSx,
          }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default BootstrapDialogTitle;
