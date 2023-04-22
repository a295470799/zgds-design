import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@mui/material/Container";
import { SxProps, styled } from "@mui/material/styles";
import { Helmet } from "react-helmet";

const StyledLayout = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  & .zgds-layout-container {
    flex: auto;
  }
`;

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  sx?: SxProps;
};

const Layout: React.FC<Props> = (props) => {
  const {
    children,
    title = "ZGDS",
    description = "",
    keywords = "",
    sx = { marginBlockStart: "20px" },
  } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Helmet>

      <StyledLayout>
        <Header />
        <Container className="zgds-layout-container" maxWidth="lg" sx={sx}>
          {children}
        </Container>
        <Footer />
      </StyledLayout>
    </>
  );
};

export default Layout;
