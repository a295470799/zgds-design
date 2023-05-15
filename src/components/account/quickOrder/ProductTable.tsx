import {
  Box,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TextField,
  TableHead,
  Checkbox,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import NotePencilIcon from "@assets/icons/account/NotePencil.svg";
import TrashIcon from "@assets/icons/account/Trash.svg";
import CheckIcon from "@assets/icons/account/check-red.svg";
import XCircleIcon from "@assets/icons/account/XCircle.svg";
import PlusIcon from "@assets/icons/account/plusx20.svg";
import DeleteIcon from "@assets/icons/account/delete-all.svg";
import UploadSimpleIcon from "@assets/icons/account/UploadSimple-r.svg";
import UploadDisabledIcon from "@assets/icons/account/upload_disabled.svg";
import DownloadSimpleIcon from "@assets/icons/account/DownloadSimple-r.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { checkSku } from "@/api/common";
import { enqueueSnackbar } from "notistack";
import { TextFieldElement } from "react-hook-form-mui";
import { uploadQuickOrderSku } from "@/api/order";
import { useConfirm } from "#lib/ConfirmProvider";

interface Props {
  onChange?: (data: ProductListProps) => void;
}

export type ProductListProps = {
  sku: string;
  qty: number;
  checked?: boolean;
  status?: "Available" | "Unavailable" | "validing";
}[];

const ProductTable: React.FC<Props> = (props) => {
  const [productList, setProductList] = useState<ProductListProps>([]);
  const [canUpload, setCanUpload] = useState(true);
  const { onChange } = props;
  const { confirm } = useConfirm();

  useEffect(() => {
    onChange?.(productList);
    if (productList.length == 0) {
      setCanUpload(true);
    }
  }, [productList]);

  const handleCheckSku = async (sku: string, index: number) => {
    const res = await checkSku(sku);
    if (res == 0) {
      enqueueSnackbar("SKU is unavailable", { variant: "error" });
    } else if (res == 1) {
      setProductList(
        productList.map((l, k) => {
          if (k == index) {
            return { ...l, status: "Available" };
          }
          return l;
        })
      );
      setCanUpload(false);
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var formdata = new FormData();
      formdata.set("file", file);
      const res = await uploadQuickOrderSku(formdata);
      if (Array.isArray(res)) {
        const uploadList = res.map((item) => {
          return {
            sku: item.sku,
            qty: item.count,
            checked: false,
            status: (item.status == 1 ? "Available" : "Unavailable") as any,
          };
        });
        setProductList([...productList, ...uploadList]);
        setCanUpload(false);
      }
      event.target.value = "";
    }
  };

  const handleRemoveSku = (index: number) => {
    confirm({
      message: "Are you sure to remove this item?",
      onConfirm() {
        setProductList(productList.filter((i, k) => k != index));
      },
    });
  };

  const handleRemoveSelected = () => {
    if (productList.filter((i) => i.checked).length > 0) {
      confirm({
        message: "Are you sure to remove this items?",
        onConfirm() {
          setProductList(productList.filter((i) => !i.checked));
        },
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={"10px"}
      >
        <Button color="secondary" onClick={handleRemoveSelected}>
          <img src={DeleteIcon} />
          <Typography ml={"4px"}>Delete</Typography>
        </Button>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          columnGap={"20px"}
        >
          <Button
            color="success"
            sx={{ fontSize: "1.2rem" }}
            disabled={!canUpload}
          >
            <Typography
              component="label"
              marginRight={"5px"}
              htmlFor="upload_order"
              display={"flex"}
              columnGap={"5px"}
              sx={{ cursor: "pointer" }}
            >
              Upload order
              <img src={canUpload ? UploadSimpleIcon : UploadDisabledIcon} />
            </Typography>
            <TextField
              type="file"
              id="upload_order"
              onChange={handleChange}
              inputProps={{
                accept: ".xls,.xlsx",
              }}
              sx={{ display: "none" }}
            />
          </Button>
          <Button href="/file/orderTemplate.xlsx">
            <Typography marginRight={"5px"}>Template</Typography>
            <img src={DownloadSimpleIcon} />
          </Button>

          <TextFieldElement
            name="customContractId"
            placeholder="Input PO NO."
            helperText=""
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "1.4rem",
                height: "30px",
                boxSizing: "border-box",
              },
            }}
          />
        </Box>
      </Box>
      <TableContainer>
        <Table
          sx={{
            "& th, td": {
              fontSize: "1.2rem",
              color: "text.secondary",
              fontWeight: 500,
              padding: "0 10px",
            },
            "& th": {
              backgroundColor: "rgba(102,102,102,.2)",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell width="10%">
                <Checkbox
                  checked={
                    productList.length > 0 &&
                    productList?.every((e) => e.checked)
                  }
                  onChange={(e) => {
                    setProductList(
                      productList.map((item) => {
                        return {
                          ...item,
                          checked: e.target.checked,
                        };
                      })
                    );
                  }}
                />
              </TableCell>
              <TableCell width="25%">SKU</TableCell>
              <TableCell width="25%">Qty</TableCell>
              <TableCell width="20%">Status</TableCell>
              <TableCell width="10%">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList?.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  sx={() => {
                    return item.status == "Unavailable"
                      ? {
                          "& td": { color: "#66666680" },
                        }
                      : null;
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={item.checked}
                      onChange={(e) => {
                        setProductList(
                          productList.map((l, k) => {
                            if (k == index) {
                              return { ...l, checked: e.target.checked };
                            }
                            return l;
                          })
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {item.status == "validing" ? (
                      <TextField
                        value={item.sku}
                        sx={{
                          "& .MuiInputBase-input": {
                            height: "20px",
                            fontSize: "1.2rem",
                            padding: "0 5px",
                          },
                        }}
                        helperText=""
                        autoFocus
                        onChange={(e) => {
                          setProductList(
                            productList.map((l, k) => {
                              if (k == index) {
                                return { ...l, sku: e.target.value };
                              }
                              return l;
                            })
                          );
                        }}
                      />
                    ) : (
                      item.sku
                    )}
                  </TableCell>
                  <TableCell>
                    {item.status == "validing" ? (
                      <TextField
                        value={item.qty}
                        sx={{
                          "& .MuiInputBase-input": {
                            height: "20px",
                            fontSize: "1.2rem",
                            padding: "0 5px",
                          },
                        }}
                        type="number"
                        helperText=""
                        onChange={(e) => {
                          setProductList(
                            productList.map((l, k) => {
                              if (k == index) {
                                return { ...l, qty: Number(e.target.value) };
                              }
                              return l;
                            })
                          );
                        }}
                      />
                    ) : (
                      item.qty
                    )}
                  </TableCell>
                  <TableCell>
                    {item.status == "validing" ? (
                      <Box>
                        <IconButton
                          onClick={() => handleCheckSku(item.sku, index)}
                        >
                          <img src={CheckIcon} />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveSku(index)}>
                          <img src={XCircleIcon} />
                        </IconButton>
                      </Box>
                    ) : (
                      item.status
                    )}
                  </TableCell>
                  <TableCell>
                    {item.status != "validing" && (
                      <Box>
                        <IconButton
                          onClick={() => {
                            setProductList(
                              productList.map((l, k) => {
                                if (k == index) {
                                  return { ...l, status: "validing" };
                                }
                                return l;
                              })
                            );
                          }}
                        >
                          <img src={NotePencilIcon} />
                        </IconButton>
                        <IconButton onClick={() => handleRemoveSku(index)}>
                          <img src={TrashIcon} />
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell colSpan={5}>
                <IconButton
                  sx={{ margin: "4px 0" }}
                  onClick={() =>
                    setProductList([
                      ...productList,
                      {
                        sku: "",
                        qty: 1,
                        checked: false,
                        status: "validing",
                      },
                    ])
                  }
                >
                  <img src={PlusIcon} />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductTable;
