import Typography from "@mui/material/Typography";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckboxButtonGroup, FormContainer } from "react-hook-form-mui";
import { useRef, useState } from "react";
import { useHover } from "ahooks";
import Stepper from "#lib/Stepper";
import Breadcrumb from "#lib/Breadcrumb";
import ImageComponent from "#lib/Image";
import WishedIcon from "@assets/icons/wished.svg";
import WishIcon from "@assets/icons/wish.svg";
import Layout from "#lib/Layout";

interface Props {
  id?: string;
}

const StyledMain = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const StyledSidebar = styled("div")`
  flex: 0 0 auto;
  width: 240px;
`;

const StyledContent = styled("div")`
  flex: 0 0 auto;
  width: 840px;
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

const SortbyWrapper = styled("div")`
  position: relative;
  display: inline-block;
  & .MuiSelect-select {
    width: 170px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 1.4rem;
    box-sizing: border-box;
    cursor: pointer;
  }
  & .sortby-paper {
    position: absolute;
    border: 1px solid ${(props) => props.theme.palette.grey["400"]};
    border-top: 0;
    width: 170px;
    z-index: 1;
    .MuiMenuItem-root {
      font-size: 1.2rem;
      color: ${(props) => props.theme.palette.grey["500"]};
    }
  }
`;

const StyledProducts = styled("ul")`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  margin-block-end: 50px;
`;

const ProductItem = styled("li")`
  flex: 0 0 auto;
  width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & img {
    display: block;
  }
  & .badge {
    position: absolute;
    font-size: 1.2rem;
    padding: 0 10px;
    line-height: 20px;
    border: 1px solid ${(props) => props.theme.palette.secondary.main};
  }
  & .badge-sale {
    top: 0;
    left: 0;
    background: ${(props) => props.theme.palette.secondary.main};
    color: #fff;
  }
  & .badge-wish {
    top: 0;
    right: 0;
    background: url(${WishIcon}) no-repeat center;
    width: 28px;
    height: 28px;
    border: 0;
  }
  & .badge-back {
    bottom: 0;
    left: 0;
    background: #fff;
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const ProductList: React.FC<Props> = ({ id }) => {
  console.log(id);
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

  const dropdownRef = useRef(null);
  const isHovering = useHover(dropdownRef);

  const handleSortBy = (value: string) => {
    console.log(value);
  };

  const defaultProducts = [
    {
      id: 396,
      sku: "LNT14BX",
      short_name: "Nesting Table",
      price: "47.99",
      cover: "https://m.media-amazon.com/images/I/41s3IV7tUZL._SL500_.jpg",
      label: "",
      cart_count: 0,
      in_cart: 0,
      qty: 1,
    },
    {
      id: 488,
      sku: "LWD47X",
      short_name: "Computer Desk",
      price: "79.99",
      cover: "https://m.media-amazon.com/images/I/41VFM4b6S4L._SL500_.jpg",
      label: "",
      cart_count: 0,
      in_cart: 0,
      qty: 1,
    },
    {
      id: 371,
      sku: "LLS34X",
      short_name: "Corner Ladder Shelves",
      price: "36.99",
      cover: "https://m.media-amazon.com/images/I/31T5wcv6zCL._SL500_.jpg",
      label: "",
      cart_count: 0,
      in_cart: 0,
      qty: 1,
    },
    {
      id: 372,
      sku: "LLS34X",
      short_name: "Corner Ladder Shelves",
      price: "36.99",
      cover: "https://m.media-amazon.com/images/I/31T5wcv6zCL._SL500_.jpg",
      label: "",
      cart_count: 0,
      in_cart: 0,
      qty: 1,
    },
    {
      id: 373,
      sku: "LLS34X",
      short_name: "Corner Ladder Shelves",
      price: "36.99",
      cover: "https://m.media-amazon.com/images/I/31T5wcv6zCL._SL500_.jpg",
      label: "",
      cart_count: 0,
      in_cart: 0,
      qty: 1,
    },
    {
      id: 374,
      sku: "LLS34X",
      short_name: "Corner Ladder Shelves",
      price: "36.99",
      cover: "https://m.media-amazon.com/images/I/31T5wcv6zCL._SL500_.jpg",
      label: "",
      cart_count: 0,
      in_cart: 0,
      qty: 1,
    },
  ];

  const [products, setProducts] = useState<any[]>(defaultProducts);

  const handleUpdateQty = (value: number | string, index: number) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index].qty = value;
      return newProducts;
    });
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Layout>
      <Breadcrumb>
        <Link href="/">Home</Link>
        <Typography color="secondary.main" fontSize={"1.2rem"}>
          Home Furniture
        </Typography>
      </Breadcrumb>
      <StyledMain>
        <StyledSidebar>
          <FormContainer>
            <SidebarItem>
              <Typography
                fontSize={"1.4rem"}
                color="text.secondary"
                fontWeight={500}
                mb={1}
              >
                Home Furniture
              </Typography>
              <Link
                color="text.secondary"
                href="#"
                pl={2}
                mb={1}
                fontSize={"1.4rem"}
              >
                Living Room (71)
              </Link>
              <Link
                color="text.secondary"
                href="#"
                pl={2}
                mb={1}
                fontSize={"1.4rem"}
              >
                Home Office (91)
              </Link>
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
              <Link
                color="text.secondary"
                href="#"
                pl={2}
                mb={1}
                fontSize={"1.4rem"}
              >
                SONGMICS (143)
              </Link>
              <Link
                color="text.secondary"
                href="#"
                pl={2}
                mb={1}
                fontSize={"1.4rem"}
              >
                VASAGLE (269)
              </Link>
              <Link
                color="text.secondary"
                href="#"
                pl={2}
                mb={1}
                fontSize={"1.4rem"}
              >
                FEANDREA (0)
              </Link>
            </SidebarItem>
            <SidebarItem>
              <CheckboxButtonGroup
                name="tags"
                options={[
                  {
                    id: '{"bought":"1"}',
                    label: renderLable("Bought", "bought"),
                  },
                  {
                    id: '{"wished":"1"}',
                    label: renderLable("wished", "image"),
                  },
                  { id: '{"labels":"NEW"}', label: renderLable("NEW") },
                  {
                    id: '{"labels":"Top%20Rated"}',
                    label: renderLable("Top Rated"),
                  },
                  {
                    id: '{"labels":"Clearance"}',
                    label: renderLable("Clearance"),
                  },
                  {
                    id: '{"labels":"Discount"}',
                    label: renderLable("Discount"),
                  },
                ]}
                // onChange={(e: string[]) => {
                //   router.push({
                //     pathname: "/list/[id]",
                //     query: { id, ...e.map((item: string) => JSON.parse(item)) },
                //   });
                // }}
              />
            </SidebarItem>
          </FormContainer>
        </StyledSidebar>
        <StyledContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBlockEnd: "20px",
            }}
          >
            <SortbyWrapper ref={dropdownRef}>
              <Select defaultValue={0} disabled>
                <MenuItem value="0">Sort By</MenuItem>
              </Select>
              <Paper hidden={!isHovering} className="sortby-paper">
                <MenuItem onClick={() => handleSortBy("discount")}>
                  Discount: High to Low
                </MenuItem>
                <MenuItem onClick={() => handleSortBy("price_lowToheight")}>
                  Price: Low to High
                </MenuItem>
                <MenuItem onClick={() => handleSortBy("price_heightTolow")}>
                  Price: High to Low
                </MenuItem>
                <MenuItem onClick={() => handleSortBy("point")}>
                  Avg: Customer Rating
                </MenuItem>
              </Paper>
            </SortbyWrapper>
            <Box sx={{ display: "flex", columnGap: "10px" }}>
              <Typography color="text.secondary" fontSize={"1.4rem"}>
                Show
              </Typography>
              {[30, 60, 90, 150].map((item) => {
                return (
                  <Link
                    key={item}
                    underline={item == 30 ? "always" : "hover"}
                    color="text.secondary"
                    href="#"
                    fontSize={"1.4rem"}
                  >
                    {item}
                  </Link>
                );
              })}
            </Box>
          </Box>
          <StyledProducts>
            {products.map((item: any, index) => {
              return (
                <ProductItem key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "block",
                      marginBlockEnd: "22px",
                    }}
                  >
                    <Link href={`/product/${item.sku}`}>
                      <ImageComponent
                        src={item.cover}
                        alt={item.short_name}
                        width={270}
                        height={270}
                        loadingType="loading"
                      />
                    </Link>
                    <span className="badge badge-sale">Sale</span>
                    <span className="badge badge-wish"></span>
                    <span className="badge badge-back">Backorder</span>
                  </Box>
                  <Box>
                    <Link
                      color="text.secondary"
                      href={`/product/${item.sku}`}
                      sx={{
                        textOverflow: "ellipsis",
                        fontSize: 14,
                        fontWeight: 500,
                        display: "block",
                        marginBlockEnd: "10px",
                      }}
                    >
                      {item.short_name}
                    </Link>
                    <Typography
                      color="text.fourth"
                      fontSize={"1.2rem"}
                      sx={{ marginBlockEnd: "10px" }}
                    >
                      SKU: {item.sku}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBlockEnd: "10px",
                      }}
                    >
                      <Typography color="text.fourth" fontSize={"1.2rem"}>
                        {item.in_cart} in cart
                      </Typography>
                      <Stepper
                        value={item.qty}
                        onChange={(value) => handleUpdateQty(value, index)}
                      />
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      color="dark"
                      onClick={handleClick}
                    >
                      ADD TO CART
                    </Button>
                  </Box>
                </ProductItem>
              );
            })}
          </StyledProducts>
        </StyledContent>
      </StyledMain>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {"You've added 1 item(s) to your cart."}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ProductList;
