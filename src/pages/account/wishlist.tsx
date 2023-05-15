import AccountWrapper from "@/components/account/AccountWrapper";
import WishlisBannerIcon from "@assets/icons/account/wishlist-banner.svg";
import {
  Box,
  Paper,
  Button,
  Typography,
  IconButton,
  Pagination,
} from "@mui/material";
import FilterIcon from "@assets/icons/account/icon-filter.svg";
import AddToCartIcon from "@assets/icons/account/addtocart.svg";
import DeleteIcon from "@assets/icons/account/delete.svg";
import ImageComponent from "#lib/Image";
import Link from "@mui/material/Link";
import { useRequest } from "ahooks";
import { getWishList, removeWish } from "@/api/account";
import { useConfirm } from "#lib/ConfirmProvider";
import { useMessage } from "#lib/MessageProvider";
import { addToCart } from "@/api/cart";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import WishListFilter from "@/components/account/WishListFilter";

export default function () {
  const { params, data, runAsync } = useRequest<any, [API.WishListParams?]>(
    getWishList,
    {
      retryCount: 5,
    }
  );

  const { confirm } = useConfirm();
  const { msg } = useMessage();

  const handleRemove = (id: string) => {
    confirm({
      message: "Are you sure to remove this item?",
      async onConfirm() {
        await removeWish(id);
        msg({
          message: "Delete successfully!",
          onConfirm() {
            runAsync();
          },
        });
      },
    });
  };

  const handleAddtocart = async (id: number) => {
    await addToCart(id, 1, "inc");
    enqueueSnackbar("You've added 1 item to your cart.");
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  return (
    <AccountWrapper code="wishlist">
      <Box>
        <img src={WishlisBannerIcon} />
      </Box>
      <Paper
        elevation={24}
        sx={{
          margin: "-30px auto 0",
          width: "94%",
          position: "relative",
          padding: "30px",
        }}
      >
        <Box textAlign={"right"} marginBottom={"20px"}>
          <Button variant="outlined" color="dark" onClick={handleClick}>
            <img src={FilterIcon} />
            <Typography color="text.secondary" ml="5px">
              FILTER
            </Typography>
          </Button>

          <WishListFilter
            id={id}
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            data={data}
            onFilter={(values) => {
              runAsync(values);
              handleClose();
            }}
          />
        </Box>
        <Box component={"ul"} display={"flex"} flexWrap={"wrap"} gap={"20px"}>
          {data?.products?.data?.map((item: any) => {
            return (
              <Box component={"li"} fontSize={"1.2rem"} key={item.id}>
                <Paper
                  elevation={2}
                  sx={{ padding: "18px 25px", width: "188px", height: "100%" }}
                >
                  <Box>
                    <ImageComponent
                      src={item.cover}
                      width={80}
                      height={80}
                      fit="cover"
                      containerSx={{ margin: "0 auto" }}
                      sx={{ borderRadius: "20px" }}
                    />
                  </Box>
                  <Link href={`/product/${item.sku}`}>
                    <Typography
                      margin={"10px 0"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      maxWidth={"140px"}
                      textAlign={"center"}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.short_name}
                    </Typography>
                  </Link>

                  <Typography textAlign={"center"} color={"text.fourth"}>
                    {item.sku0}
                  </Typography>
                  <Box display={"flex"} justifyContent={"center"} mt={1}>
                    <IconButton onClick={() => handleAddtocart(item.id)}>
                      <img src={AddToCartIcon} />
                    </IconButton>
                    <IconButton onClick={() => handleRemove(item.id)}>
                      <img src={DeleteIcon} />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </Box>
        {data?.products?.last_page && data?.products?.last_page > 1 && (
          <Pagination
            sx={{ mt: 3 }}
            count={data?.products?.last_page}
            variant="outlined"
            shape="rounded"
            onChange={(e, value) => {
              runAsync({ ...params[0], page: value });
            }}
            defaultPage={params?.[0]?.page ?? 1}
          />
        )}
      </Paper>
    </AccountWrapper>
  );
}
