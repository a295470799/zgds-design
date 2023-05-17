import Typography from "@mui/material/Typography";
import { Box, Button, Link, IconButton, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stepper from "#lib/Stepper";
import ImageComponent from "#lib/Image";
import WishedIcon from "@assets/icons/wished.svg";
import WishIcon from "@assets/icons/wish.svg";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/format";

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

interface Props {
  urlState: API.ProductListParams;
  products: any;
  onAddCart: (id: number, count: number) => void;
  onAddWish: (id: string, wished: number) => void;
  onPaginationChange: (data: API.ProductListParams) => void;
}

const ProductList: React.FC<Props> = (props) => {
  const { urlState, products, onAddCart, onAddWish, onPaginationChange } =
    props;

  const [countArray, setCountArray] = useState<number[]>(new Array(30).fill(1));

  useEffect(() => {
    if (urlState?.page_size) {
      setCountArray(new Array(Number(urlState.page_size)).fill(1));
    }
  }, [urlState]);

  return (
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
                {item?.label && (
                  <div className="badge badge-sale">{item?.label}</div>
                )}
                <div className="badge badge-wish">
                  <IconButton onClick={() => onAddWish(item.id, item.wished)}>
                    <img src={item.wished == 0 ? WishIcon : WishedIcon} />
                  </IconButton>
                </div>
                {item.stock == 0 && (
                  <div className="badge badge-back">Backorder</div>
                )}
              </Box>
              <Box>
                <Link
                  color="text.secondary"
                  href={`/product/${item.sku}`}
                  sx={{
                    textOverflow: "ellipsis",
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    display: "block",
                    marginBlockEnd: "10px",
                  }}
                >
                  {item.short_name}
                </Link>
                <Typography
                  color="text.secondary"
                  fontSize={"1.4rem"}
                  sx={{ marginBlockEnd: "10px" }}
                >
                  Wholesale Price: <b>{item.price_str}</b>
                </Typography>
                <Typography
                  color="text.fourth"
                  fontSize={"1.2rem"}
                  sx={{ marginBlockEnd: "10px" }}
                >
                  SKU: {item.sku}
                </Typography>
                {item?.restock?.restock_date && (
                  <Typography
                    color="text.fourth"
                    fontSize={"1.2rem"}
                    sx={{ marginBlockEnd: "10px" }}
                  >
                    Restock Date: {formatDate(item.restock.restock_date, true)}
                  </Typography>
                )}
                {item?.restock?.restock_quantity && (
                  <Typography
                    color="text.fourth"
                    fontSize={"1.2rem"}
                    sx={{ marginBlockEnd: "10px" }}
                  >
                    Restock Quantity: {item.restock.restock_quantity}
                  </Typography>
                )}

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
                    value={countArray[index] ?? 1}
                    onChange={(value) => {
                      countArray[index] = value;
                      setCountArray(countArray);
                    }}
                  />
                </Box>
                <Button
                  fullWidth
                  color="dark"
                  onClick={() => {
                    onAddCart(item.id, countArray[index]);
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
          count={products.last_page}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => {
            onPaginationChange({
              page: value,
            });
          }}
          page={Number(urlState?.page)}
        />
      )}
    </>
  );
};

export default ProductList;
