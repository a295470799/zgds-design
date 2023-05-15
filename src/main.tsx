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
import { ConfirmProvider } from "#lib/ConfirmProvider";
import { MessageProvider } from "#lib/MessageProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MessageProvider>
        <ConfirmProvider>
          <HelmetProvider>
            <SnackbarProvider
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              TransitionComponent={Grow}
              autoHideDuration={3000}
              variant="success"
            >
              <div id="back-to-top-anchor"></div>
              <CssBaseline />
              <App />
              <BackToTop />
            </SnackbarProvider>
          </HelmetProvider>
        </ConfirmProvider>
      </MessageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
