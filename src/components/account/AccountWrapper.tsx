import Layout from "#lib/Layout";
import React from "react";
import AccountSide from "./AccountSide";
import { Box } from "@mui/material";

interface Props {
  title?: string;
  code?: "dashboard" | "information" | "orders" | "ci" | "wishlist" | "signout";
  children: React.ReactNode;
}

const AccountWrapper: React.FC<Props> = (props) => {
  return (
    <Layout
      title={props.title ?? "My Account"}
      spaceBetween
      bodyWrapperSx={(theme) => {
        return { background: theme.palette.background.paper };
      }}
    >
      <AccountSide code={props.code} />
      <Box width="930px" marginBottom={3}>
        {props.children}
      </Box>
    </Layout>
  );
};

export default AccountWrapper;
