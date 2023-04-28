import Layout from "#lib/Layout";
import { Link, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Layout
      title="404 Not Found"
      bodySx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBlockStart: 0,
      }}
      bodyWrapperSx={{ display: "flex" }}
    >
      <Typography
        variant="h1"
        sx={(theme) => {
          return {
            fontSize: "10rem",
            fontWeight: 700,
            color: theme.palette.text.primary,
            marginBottom: theme.spacing(2),
          };
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={(theme) => {
          return {
            fontSize: "2rem",
            fontWeight: 500,
            color: theme.palette.text.primary,
            textAlign: "center",
            marginBottom: theme.spacing(2),
          };
        }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography
        sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
      >
        <span>Go back to the</span>
        <Link href="/" color="inherit" underline="always" fontWeight={500}>
          homepage
        </Link>
      </Typography>
    </Layout>
  );
}
