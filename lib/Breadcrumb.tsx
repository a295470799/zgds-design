import { Breadcrumbs } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBreadcrumb = styled(Breadcrumbs)`
  font-size: 12px;
  margin-block-end: 20px;
`;

type BreadcrumbProps = {
  children: React.ReactNode;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ children }) => {
  return (
    <StyledBreadcrumb aria-label="breadcrumb" separator=">">
      {children}
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
