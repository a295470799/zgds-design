import Layout from "#lib/Layout";
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { formatPrice } from "@/utils/format";
import Stepper from "#lib/Stepper";
import DeleteIcon from "@assets/icons/cart/delete.svg";
import NoteIcon from "@assets/icons/cart/note.svg";
import { useState } from "react";
import { useRequest } from "ahooks";
import CartSummary from "@/components/CartSummary";
import ImageComponent from "#lib/Image";
import { useNavigate } from "react-router-dom";
import EmptyImg from "@assets/images/cart/empty.png";

type CartProps = {
  carts: any[];
  count: number;
  totalPrice: string;
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const myCart: CartProps = {
    carts: [
      {
        id: 84,
        user_id: 249,
        product_id: 1842,
        count: 1,
        selected: 1,
        created_at: "2023-04-11 09:59:53",
        short_name: "Clothes Rack",
        long_name:
          "SONGMICS Clothes Rack on Wheels, Heavy Duty Clothes Rail, with Extendable Hanging Rail, 90 kg Load Capacity, Easy Assembly, Portable, Silver HSR13S",
        cover: "https://m.media-amazon.com/images/I/31xg+UxKVHL._SL500_.jpg",
        sku: "HSR13S",
        discount: "0.00",
        discount_status: 0,
        whCode: "5101",
        prices: [
          {
            section: "1~4",
            original_price: 0,
            price: "27.00",
          },
          {
            section: "5~49",
            original_price: 0,
            price: "23.14",
          },
          {
            section: "50+",
            original_price: 0,
            price: "21.60",
          },
        ],
        price: "27.00",
        total_price: "27.00",
      },
      {
        id: 7,
        user_id: 249,
        product_id: 1824,
        count: 2,
        selected: 1,
        created_at: "2023-02-15 11:49:14",
        short_name: "Jewelry Case",
        long_name:
          "SONGMICS Jewellery Box, Organiser with 2 Drawers, Lockable Case with Mirror, Portable Travel Case, for Rings, Bracelets, Earrings, Necklaces, Velvet Lining, Gift, White JBC121W",
        cover: "https://m.media-amazon.com/images/I/41tIUUXKNDL._SL500_.jpg",
        sku: "JBC121W",
        discount: "0.00",
        discount_status: 0,
        whCode: "5101",
        prices: [
          {
            section: "1~4",
            original_price: 0,
            price: "28.37",
          },
          {
            section: "5~49",
            original_price: 0,
            price: "24.31",
          },
          {
            section: "50+",
            original_price: 0,
            price: "22.69",
          },
        ],
        price: "28.37",
        total_price: "56.74",
      },
    ],
    count: 6,
    totalPrice: "318.07",
  };

  const {
    loading,
    data: cartInfo,
    run,
  } = useRequest<CartProps, [Pick<CartProps, "carts">[]]>(
    async (param) => {
      return {
        carts: param,
        count: myCart.count,
        totalPrice: myCart.totalPrice,
      };
    },
    {
      defaultParams: [myCart.carts],
    }
  );

  const [anchorEls, setAnchorEls] = useState<HTMLElement[]>([]);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    id: number
  ) => {
    setAnchorEls((prevEls) => {
      const newEls = [...prevEls];
      newEls[id] = event.currentTarget;
      return newEls;
    });
  };

  const handlePopoverClose = (id: number) => {
    setAnchorEls((prevEls) => {
      const newEls = [...prevEls];
      newEls[id] = null as unknown as HTMLElement;
      return newEls;
    });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id: number) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId(0);
  };

  const handleDelete = () => {
    const cart = cartInfo?.carts?.filter((item) => item.id != currentId);
    run(cart ?? []);
    handleClose();
  };

  const [currentId, setCurrentId] = useState<number>(0);

  return (
    <Layout>
      {(cartInfo?.carts?.length ?? 0) > 0 ? (
        <>
          <Typography
            fontSize={"3.2rem"}
            fontWeight={700}
            color="primary.main"
            marginBottom="35px"
          >
            SHOPPING CART
          </Typography>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "50px",
            }}
          >
            <TableContainer sx={{ width: 800 }}>
              <Table
                sx={{ "& th": { fontSize: 12, color: "text.secondary" } }}
                aria-label="shopping cart"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <FormControlLabel
                        label={
                          <Typography
                            fontSize={"1.2rem"}
                            color="text.secondary"
                          >
                            Select all
                          </Typography>
                        }
                        control={
                          <Checkbox
                            checked={cartInfo?.carts?.every(
                              (e) => e.selected == 1
                            )}
                            onChange={(e) => {
                              const cart = cartInfo?.carts.map((item) => {
                                return {
                                  ...item,
                                  selected: e.target.checked ? 1 : 0,
                                };
                              });
                              run(cart ?? []);
                            }}
                          />
                        }
                        sx={{ margin: 0 }}
                      />
                    </TableCell>
                    <TableCell align="center">Unit price</TableCell>
                    <TableCell align="center">Qty</TableCell>
                    <TableCell align="right">Total price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartInfo?.carts?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "& td": {
                          borderBottomStyle: "dashed",
                          padding: "30px 16px",
                        },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "10px",
                            height: "70px",
                          }}
                        >
                          <Checkbox
                            checked={row.selected == 1}
                            onChange={(e) => {
                              row.selected = e.target.checked ? 1 : 0;
                              run(cartInfo?.carts ?? []);
                            }}
                          />
                          <Link href={`/product/${row.sku}`}>
                            <ImageComponent
                              src={row.cover}
                              width={70}
                              height={70}
                              alt={row.short_name}
                            />
                          </Link>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              height: "100%",
                              lineHeight: 1,
                            }}
                          >
                            <Box>
                              <Link
                                href={`/product/${row.sku}`}
                                color="text.secondary"
                                fontSize={"1.2rem"}
                              >
                                {row.short_name}
                              </Link>
                              <Typography
                                fontSize={"1.2rem"}
                                color="text.fourth"
                                sx={{ marginTop: "4px" }}
                              >
                                SKU: {row.sku}
                              </Typography>
                            </Box>
                            <Button
                              sx={{
                                minWidth: "auto",
                                width: 20,
                                height: 20,
                                justifyContent: "flex-start",
                                padding: 0,
                              }}
                              onClick={() => handleClickOpen(row.id)}
                            >
                              <img src={DeleteIcon} />
                            </Button>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          fontWeight={500}
                          fontSize={"1.4rem"}
                          color="text.secondary"
                        >
                          {formatPrice(row.price)}
                        </Typography>
                        <Box
                          aria-owns={
                            Boolean(anchorEls?.[row.id])
                              ? `mouse-over-popover-${row.id}`
                              : undefined
                          }
                          aria-haspopup="true"
                          onMouseEnter={(e) => {
                            handlePopoverOpen(e, row.id);
                          }}
                          onMouseLeave={() => {
                            handlePopoverClose(row.id);
                          }}
                          sx={{ display: "inline-flex", alignItems: "center" }}
                        >
                          <Typography
                            fontWeight={500}
                            color="secondary.main"
                            fontSize={"1.2rem"}
                          >
                            Details
                          </Typography>
                          <img src={NoteIcon} />
                        </Box>

                        <Popover
                          id={`mouse-over-popover-${row.id}`}
                          sx={{ pointerEvents: "none" }}
                          open={Boolean(anchorEls?.[row.id])}
                          anchorEl={anchorEls?.[row.id]}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          onClose={() => {
                            handlePopoverClose(row.id);
                          }}
                          disableRestoreFocus
                          PaperProps={{
                            elevation: 3,
                          }}
                        >
                          <Box sx={{ width: 220, padding: "10px 30px 27px" }}>
                            <Typography
                              color="primary.main"
                              fontWeight={500}
                              textAlign="center"
                              paddingBottom="10px"
                              borderBottom="1px solid rgba(102,102,102,.2)"
                            >
                              Unit Price
                            </Typography>
                            <Box component="ul">
                              {row.prices?.map((item: any, index: number) => {
                                return (
                                  <Box
                                    component="li"
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      height: 38,
                                      borderBottom:
                                        "1px dashed rgba(102,102,102,.2);",
                                    }}
                                    key={index}
                                  >
                                    <Typography
                                      fontSize={"1.2rem"}
                                      color="text.secondary"
                                      fontWeight={500}
                                    >
                                      {item.section}
                                    </Typography>
                                    <Typography
                                      fontSize={"1.4rem"}
                                      color="text.secondary"
                                      fontWeight={500}
                                    >
                                      {formatPrice(item.price)}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        </Popover>
                      </TableCell>
                      <TableCell align="center">
                        <Stepper
                          value={row.count}
                          onChange={(e) => {
                            row.count = e;
                            run(cartInfo.carts);
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: 500, color: "text.secondary" }}
                      >
                        {formatPrice(row.total_price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CartSummary
              summary={{
                count: cartInfo?.count,
                totalPrice: cartInfo?.totalPrice,
              }}
              onPlaceOrder={() => navigate("/checkout")}
            />
          </Box>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">CONFIRMATION</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure to remove this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDelete}
                color="secondary"
                variant="contained"
              >
                Yes
              </Button>
              <Button onClick={handleClose} autoFocus variant="contained">
                No
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Box sx={{ textAlign: "center", marginTop: "50px" }}>
          <Box sx={{ marginBottom: "35px" }}>
            <ImageComponent
              src={EmptyImg}
              width={200}
              height={200}
              alt="cart empty"
              containerSx={{ margin: "0 auto" }}
            />
          </Box>
          <Typography
            fontSize={"2.4rem"}
            color="text.primary"
            fontWeight={500}
            marginBottom="25px"
          >
            Your cart is empty!
          </Typography>
          <Typography color="text.third">
            Did you forget to add something to your cart?
          </Typography>
          <Typography color="text.third">Go ahead and fill it up.</Typography>
          <Button
            href="/"
            variant="contained"
            size="large"
            color="dark"
            sx={{ marginTop: "30px" }}
          >
            START SHOPPING
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default Cart;
