import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "#lib/theme";
import App from "./App";
import "@/styles/globals.css";
import BackToTop from "#lib/BackToTop";
import { SnackbarProvider } from "notistack";
import { HelmetProvider } from "react-helmet-async";
import Grow from "@mui/material/Grow";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          TransitionComponent={Grow}
          autoHideDuration={4000}
        >
          <div id="back-to-top-anchor"></div>
          <CssBaseline />
          <App />
          <BackToTop />
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
