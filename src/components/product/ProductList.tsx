import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Link,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckboxButtonGroup, FormContainer } from "react-hook-form-mui";
import { useRef } from "react";
import { useHover, useReactive, useSetState, useUpdateEffect } from "ahooks";
import Stepper from "#lib/Stepper";
import Breadcrumb from "#lib/Breadcrumb";
import ImageComponent from "#lib/Image";
import WishedIcon from "@assets/icons/wished.svg";
import WishIcon from "@assets/icons/wish.svg";
import Layout from "#lib/Layout";
import { enqueueSnackbar } from "notistack";
import { getProductList } from "@/api/product";
import { useRequest } from "ahooks";
import { addToCart } from "@/api/cart";
import qs from "query-string";
import { useLocation } from "react-router";
import ProductListSkeleton from "../skeleton/ProductListSkeleton";

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

type UrlState = {
  wished?: string;
  tags?: string;
  labels?: string;
  brand?: string;
  order?: string;
  page?: number;
  page_size?: number;
};

const ProductList: React.FC<Props> = ({ id }) => {
  const params = useLocation();
  const { data: products, refresh } = useRequest<any, [string?]>(
    getProductList,
    {
      defaultParams: [id],
    }
  );

  const state = useReactive(new Array(30).fill(1));

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
    const count = state[index];
    try {
      await addToCart(id, count);
      refresh();
      enqueueSnackbar(`You've added ${count} item(s) to your cart.`, {
        variant: "success",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [urlState, setUrlState] = useSetState<UrlState>({
    page: 1,
    page_size: 30,
    ...qs.parse(params.search),
  });

  useUpdateEffect(() => {
    window.location.href = `?${qs.stringify(urlState)}`;
  }, [urlState]);

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
      <StyledMain>
        <StyledSidebar>
          <FormContainer
            defaultValues={{
              tags: urlState?.tags ? [urlState.tags] : [],
              wished: urlState?.wished ? [urlState.wished] : [],
              labels: urlState?.labels ? urlState.labels?.split(",") : [],
            }}
          >
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
                onClick={() => {
                  setUrlState({
                    brand: "SONGMICS",
                  });
                }}
                fontWeight={urlState.brand == "SONGMICS" ? 500 : 400}
              >
                SONGMICS (143)
              </Link>
              <Link
                color="text.secondary"
                href="#"
                pl={2}
                mb={1}
                fontSize={"1.4rem"}
                onClick={() => {
                  setUrlState({
                    brand: "VASAGLE",
                  });
                }}
                fontWeight={urlState.brand == "VASAGLE" ? 500 : 400}
              >
                VASAGLE (269)
              </Link>
              <Link
                color="text.secondary"
                href="#"
                pl={2}
                mb={1}
                fontSize={"1.4rem"}
                onClick={() => {
                  setUrlState({
                    brand: "FEANDREA",
                  });
                }}
                fontWeight={urlState.brand == "FEANDREA" ? 500 : 400}
              >
                FEANDREA (0)
              </Link>
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
                    underline={item == urlState.page_size ? "always" : "hover"}
                    color="text.secondary"
                    href="#"
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
              })}
            </Box>
          </Box>
          {products?.data ? (
            products?.data?.length > 0 ? (
              <>
                <StyledProducts>
                  {products?.data?.map((item: any, index: number) => {
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
                              {item.cart_count} in cart
                            </Typography>
                            <Stepper
                              value={state[index]}
                              onChange={(value) => (state[index] = value)}
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
                  })}
                </StyledProducts>
                {(products?.last_page ?? 0) > 1 && (
                  <Pagination
                    sx={{
                      marginBottom: "50px",
                      "& .MuiPagination-ul": {
                        justifyContent: "flex-end",
                      },
                    }}
                    count={products?.last_page}
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
              <>Empty</>
            )
          ) : (
            <ProductListSkeleton />
          )}
        </StyledContent>
      </StyledMain>
    </Layout>
  );
};

export default ProductList;
