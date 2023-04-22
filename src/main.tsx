import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "#lib/theme";
import App from "./App";
import "@/styles/globals.css";
import BackToTop from "#lib/BackToTop";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div id="back-to-top-anchor"></div>
      <CssBaseline />
      <App />
      <BackToTop />
    </ThemeProvider>
  </React.StrictMode>
);
