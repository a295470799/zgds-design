import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Link,
  Pagination,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckboxButtonGroup,
  FormContainer,
  SelectElement,
} from "react-hook-form-mui";
import { useEffect, useRef } from "react";
import { useHover, useReactive, useSetState, useUpdateEffect } from "ahooks";
import Stepper from "#lib/Stepper";
import Breadcrumb from "#lib/Breadcrumb";
import ImageComponent from "#lib/Image";
import WishedIcon from "@assets/icons/wished.svg";
import WishIcon from "@assets/icons/wish.svg";
import EmptyIcon from "@assets/icons/empty.svg";
import Layout from "#lib/Layout";
import { enqueueSnackbar } from "notistack";
import { getProductList } from "@/api/product";
import { useRequest } from "ahooks";
import { addToCart } from "@/api/cart";
import qs from "query-string";
import { useLocation, useNavigate } from "react-router";
import ProductListSkeleton from "../skeleton/ProductListSkeleton";
import { addWish, removeWish } from "@/api/account";

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
    border: 0;
  }
  & .badge-back {
    bottom: 0;
    left: 0;
    background: #fff;
    color: ${(props) => props.theme.palette.secondary.main};
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

const ProductList: React.FC<Props> = ({ id }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: productsInfo,
    refresh,
    run,
    loading,
  } = useRequest<any, [API.ProductListParams]>(getProductList, {
    defaultParams: [{ category_id: id }],
    debounceWait: 300,
    loadingDelay: 500,
  });

  const countState = useReactive(new Array(30).fill(1));

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
    setUrlState({
      order: value,
    });
  };

  const handleAddToCart = async (id: number, index: number) => {
    const count = countState[index];
    await addToCart(id, count);
    refresh();
    enqueueSnackbar(`You've added ${count} item(s) to your cart.`, {
      variant: "success",
    });
  };

  const handleWish = async (id: string, wished: number) => {
    if (wished == 0) {
      await addWish(id);
      enqueueSnackbar("Added successfuly.", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } else {
      await removeWish(id);
    }
    refresh();
  };

  const [urlState, setUrlState] = useSetState<API.ProductListParams>({
    category_id: id,
    page: 1,
    page_size: 30,
    ...qs.parse(location.search),
  });

  useUpdateEffect(() => {
    navigate(`?${qs.stringify(urlState)}`);
  }, [urlState]);

  useEffect(() => {
    const state = {
      category_id: id,
      page: 1,
      page_size: 30,
      ...qs.parse(location.search),
    };
    run(state);
  }, [location]);

  return (
    <Layout>
      <Breadcrumb>
        <Link href="/" color="inherit">
          Home
        </Link>
        <Typography color="secondary.main" fontSize={"1.2rem"}>
          Home Furniture
        </Typography>
      </Breadcrumb>
      <FormContainer
        defaultValues={{
          page_size: urlState?.page_size ?? 30,
          tags: urlState?.tags ? [urlState.tags] : [],
          wished: urlState?.wished ? [urlState.wished] : [],
          labels: urlState?.labels ? urlState.labels?.split(",") : [],
        }}
      >
        <StyledMain>
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
                      setUrlState({
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
                      setUrlState({
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
              <CheckboxButtonGroup
                name="tags"
                options={[
                  {
                    id: "bought",
                    label: renderLable("Bought", "bought"),
                  },
                ]}
                onChange={(e: string[]) => {
                  setUrlState({
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
                  setUrlState({
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
                  setUrlState({
                    labels: e.join(","),
                  });
                }}
              />
            </SidebarItem>
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
                <Select defaultValue={0} readOnly>
                  <MenuItem value="0">Sort By</MenuItem>
                </Select>
                <Paper hidden={!isHovering} className="sortby-paper">
                  <MenuItem onClick={() => handleSortBy("discount")}>
                    <Typography
                      color={
                        urlState.order == "discount" ? "secondary" : "inherit"
                      }
                    >
                      Discount: High to Low
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("price_lowToheight")}>
                    <Typography
                      color={
                        urlState.order == "price_lowToheight"
                          ? "secondary"
                          : "inherit"
                      }
                    >
                      Price: Low to High
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("price_heightTolow")}>
                    <Typography
                      color={
                        urlState.order == "price_heightTolow"
                          ? "secondary"
                          : "inherit"
                      }
                    >
                      Price: High to Low
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("point")}>
                    <Typography
                      color={
                        urlState.order == "point" ? "secondary" : "inherit"
                      }
                    >
                      Avg: Customer Rating
                    </Typography>
                  </MenuItem>
                </Paper>
              </SortbyWrapper>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography color="text.secondary" fontSize={"1.4rem"}>
                  Page Size:
                </Typography>
                <SelectElement
                  name="page_size"
                  options={["30", "60", "90", "150"].map((item) => {
                    return {
                      id: item,
                      label: item,
                    };
                  })}
                  sx={{
                    width: 80,
                    "& .MuiInputBase-root": { height: 33 },
                    "& .MuiFormHelperText-root": {
                      display: "none",
                    },
                    "& .MuiInputBase-input": { fontSize: "1.4rem" },
                  }}
                  onChange={(e) =>
                    setUrlState({
                      page_size: e,
                    })
                  }
                />
                {/* {[30, 60, 90, 150].map((item) => {
                return (
                  <Link
                    key={item}
                    sx={{ cursor: "pointer" }}
                    underline={item == urlState.page_size ? "always" : "hover"}
                    color="text.secondary"
                    fontSize={"1.4rem"}
                    onClick={() => {
                      setUrlState({
                        page_size: item,
                      });
                    }}
                  >
                    {item}
                  </Link>
                );
              })} */}
              </Box>
            </Box>
            {!loading && productsInfo?.products?.data ? (
              productsInfo?.products?.data?.length > 0 ? (
                <>
                  <StyledProducts>
                    {productsInfo?.products?.data?.map(
                      (item: any, index: number) => {
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
                              <div className="badge badge-sale">Sale</div>
                              <div className="badge badge-wish">
                                <IconButton
                                  onClick={() =>
                                    handleWish(item.id, item.wished)
                                  }
                                >
                                  <img
                                    src={
                                      item.wished == 0 ? WishIcon : WishedIcon
                                    }
                                  />
                                </IconButton>
                              </div>
                              <div className="badge badge-back">Backorder</div>
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
                                <Typography
                                  color="text.fourth"
                                  fontSize={"1.2rem"}
                                >
                                  {item.cart_count} in cart
                                </Typography>
                                <Stepper
                                  value={countState[index]}
                                  onChange={(value) =>
                                    (countState[index] = value)
                                  }
                                />
                              </Box>
                              <Button
                                fullWidth
                                color="dark"
                                onClick={() => {
                                  handleAddToCart(item.id, index);
                                }}
                              >
                                ADD TO CART
                              </Button>
                            </Box>
                          </ProductItem>
                        );
                      }
                    )}
                  </StyledProducts>
                  {(productsInfo?.products?.last_page ?? 0) > 1 && (
                    <Pagination
                      sx={{
                        marginBottom: "50px",
                        "& .MuiPagination-ul": {
                          justifyContent: "flex-end",
                        },
                      }}
                      count={productsInfo.products.last_page}
                      variant="outlined"
                      shape="rounded"
                      onChange={(e, value) => {
                        setUrlState({
                          page: value,
                        });
                      }}
                      defaultPage={Number(urlState?.page)}
                    />
                  )}
                </>
              ) : (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={300}
                >
                  <Box>
                    <img src={EmptyIcon} />
                  </Box>
                  <Typography>No data</Typography>
                </Box>
              )
            ) : (
              <ProductListSkeleton />
            )}
          </StyledContent>
        </StyledMain>
      </FormContainer>
    </Layout>
  );
};

export default ProductList;
