import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckboxButtonGroup, FormContainer } from "react-hook-form-mui";
import WishedIcon from "@assets/icons/wished.svg";

const StyledSidebar = styled("div")`
  flex: 0 0 auto;
  width: 300px;
`;

const SidebarItem = styled("div")`
  display: flex;
  flex-direction: column;
  margin-block-end: 20px;
  & > .MuiFormControl-root {
    margin-top: -5px;
  }
  .MuiCheckbox-root {
    padding: 6px 9px;
  }
`;

const StyledLink = styled("span")<{ bold?: number }>(({ theme, bold }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.4rem",
  paddingLeft: "16px",
  marginBottom: "8px",
  fontWeight: bold == 1 ? 500 : 400,
  cursor: "pointer",
  ["&:hover"]: {
    textDecoration: "underline",
  },
}));

interface Props {
  urlState: API.ProductListParams;
  onChange: (data: API.ProductListParams) => void;
  productsInfo?: any;
}

const ListFilter: React.FC<Props> = (props) => {
  const { urlState, onChange, productsInfo } = props;

  const renderLable = (name: string, type = "other") => {
    if (type == "image") {
      return <img src={WishedIcon} />;
    } else {
      return (
        <Typography
          bgcolor={type == "other" ? "secondary.main" : "primary.main"}
          color="white"
          p="1px 10px"
          fontSize={"1.2rem"}
        >
          {name}
        </Typography>
      );
    }
  };

  return (
    <StyledSidebar>
      <SidebarItem>
        <Typography
          fontSize={"1.4rem"}
          color="text.secondary"
          fontWeight={500}
          mb={1}
        >
          {productsInfo?.category?.name ?? "All Category"}
        </Typography>
        {productsInfo?.categorys?.map((item: any, index: number) => {
          return (
            <StyledLink
              key={index}
              onClick={() => {
                onChange({
                  category_id: item.id,
                });
              }}
              bold={urlState.category_id == item.id ? 1 : 0}
            >
              {item.name} ({item.product_count})
            </StyledLink>
          );
        })}
      </SidebarItem>
      <SidebarItem>
        <Typography
          fontSize={"1.4rem"}
          color="text.secondary"
          fontWeight={500}
          mb={1}
        >
          Brand
        </Typography>
        {productsInfo?.brands?.map((item: any, index: number) => {
          return (
            <StyledLink
              key={index}
              onClick={() => {
                onChange({
                  brand: item.name,
                });
              }}
              bold={urlState.brand == item.name ? 1 : 0}
            >
              {item.name} ({item.product_count})
            </StyledLink>
          );
        })}
      </SidebarItem>
      <SidebarItem>
        <FormContainer
          defaultValues={{
            tags: urlState?.tags ? [urlState.tags] : [],
            wished: urlState?.wished ? [urlState.wished] : [],
            labels: urlState?.labels ? urlState.labels?.split(",") : [],
          }}
        >
          <SidebarItem>
            <CheckboxButtonGroup
              name="tags"
              options={[
                {
                  id: "bought",
                  label: renderLable("Bought", "bought"),
                },
              ]}
              onChange={(e: string[]) => {
                onChange({
                  tags: e?.[0],
                });
              }}
            />
            <CheckboxButtonGroup
              name="wished"
              options={[
                {
                  id: "1",
                  label: renderLable("wished", "image"),
                },
              ]}
              onChange={(e: string[]) => {
                onChange({
                  wished: e?.[0],
                });
              }}
            />
            <CheckboxButtonGroup
              name="labels"
              options={[
                { id: "NEW", label: renderLable("NEW") },
                {
                  id: "Top Rated",
                  label: renderLable("Top Rated"),
                },
                {
                  id: "Clearance",
                  label: renderLable("Clearance"),
                },
                {
                  id: "Discount",
                  label: renderLable("Discount"),
                },
              ]}
              onChange={(e: string[]) => {
                onChange({
                  labels: e.join(","),
                });
              }}
            />
          </SidebarItem>
        </FormContainer>
      </SidebarItem>
    </StyledSidebar>
  );
};

export default ListFilter;
