import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@mui/material/Container";
import { SxProps, styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { Box, Theme } from "@mui/material";

const StyledLayout = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  & .zgds-layout-wrapper {
    flex: auto;
  }
`;

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  bodyWrapperSx?: SxProps<Theme>;
  bodySx?: SxProps;
  metaChildren?: React.ReactNode;
  spaceBetween?: boolean;
}

const Layout: React.FC<Props> = (props) => {
  const {
    children,
    title = "ZGDS",
    description,
    keywords,
    metaChildren,
    bodyWrapperSx,
    bodySx = { marginBlockStart: "20px" },
  } = props;

  const spaceBetween = props.spaceBetween
    ? { display: "flex", justifyContent: "space-between" }
    : {};

  return (
    <StyledLayout>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {metaChildren}
      </Helmet>
      <Header />
      <Box sx={bodyWrapperSx} className="zgds-layout-wrapper">
        <Container
          maxWidth="lg"
          sx={{
            ...bodySx,
            ...spaceBetween,
          }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
