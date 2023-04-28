import { createTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0074a3",
    },
    secondary: {
      main: "#e14101",
    },
    success: {
      main: "#00a65a",
      contrastText: "#ffffff",
    },
    dark: {
      main: "#222222",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
      third: "#888888",
      fourth: "#999999",
      fifth: "#555555",
    },
    background: {
      default: "#ffffff",
      paper: "#fafafa",
    },
  },
  typography: {
    fontFamily: "Poppins, serif",
    fontWeightMedium: 500,
    fontWeightBold: 700,
    htmlFontSize: 10,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 3,
      },
      styleOverrides: {
        elevation24: {
          background: "#ffffff",
          boxShadow: "0 5px 8px rgba(0,0,0,.1)",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        style: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        sizeSmall: {
          height: "30px",
          lineHeight: 1,
        },
        sizeMedium: {
          height: "40px",
        },
        sizeLarge: {
          height: "50px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#e14101",
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
        margin: "dense",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "none",
        size: "small",
        helperText: " ",
      },
    },
  },
});

export default theme;
