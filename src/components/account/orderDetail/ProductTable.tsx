import {
  Box,
  Button,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Stepper from "#lib/Stepper";
import WarningCircleIcon from "@assets/icons/account/WarningCircle.svg";
import ImageComponent from "#lib/Image";
import { formatPrice } from "@/utils/format";
import NoteIcon from "@assets/icons/cart/note.svg";

const StyledWrapper = styled("div")`
  position: relative;
  display: inline-block;
`;

const StyledPaper = styled(Paper)`
  display: none;
  position: absolute;
  padding: 4px 10px;
  right: -100px;
  top: -33px;
  background: #e5f1f5;
  white-space: nowrap;
  z-index: 10;
`;

const StyledTrigger = styled("i")`
  position: absolute;
  top: 0;
  right: -10px;
  width: 12px;
  height: 12px;
  background: url(${WarningCircleIcon}) no-repeat center;
  &:hover + .MuiPaper-root {
    display: block;
  }
`;

const xsButton = {
  height: "20px",
  fontSize: "1.2rem",
  padding: "4px 8px",
  minWidth: "fit-content",
};

interface Props {
  type: "show" | "edit";
  status?: number;
  productList: any[];
  onDelete?: (id: string) => void;
  onQtyChange?: (sku: string, qty: number) => void;
  onAddSku?: (open: boolean) => void;
}
const ProductTable: React.FC<Props> = (props) => {
  const {
    type,
    status = -1,
    productList = [],
    onDelete,
    onQtyChange,
    onAddSku,
  } = props;

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

  const canEdit = type == "edit" && status == 0;

  return (
    <Table
      sx={{
        "& th, td": {
          fontSize: "1.2rem",
          color: "text.secondary",
          fontWeight: 500,
          padding: "10px",
        },
        "& th": { backgroundColor: "rgba(102,102,102,.2)" },
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            SKU{" "}
            {canEdit && (
              <Button sx={xsButton} onClick={() => onAddSku?.(true)}>
                +SKU
              </Button>
            )}
          </TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Unit price</TableCell>
          <TableCell align="center">Order Qty</TableCell>
          {status >= 30 && <TableCell align="center">Confirmed Qty</TableCell>}
          <TableCell>Tax total </TableCell>
          <TableCell>
            <StyledWrapper>
              <span>Total shipping</span>
              <Box>
                <StyledTrigger />
                <StyledPaper>Tax included</StyledPaper>
              </Box>
            </StyledWrapper>
          </TableCell>
          <TableCell>Sub total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {productList?.map((item) => {
          return (
            <TableRow key={item.product_id}>
              <TableCell>
                <p>{item.sku0}</p>
                {canEdit && (
                  <Button
                    color="secondary"
                    sx={xsButton}
                    onClick={() => onDelete?.(item.sku0)}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Box display={"flex"} alignItems={"center"}>
                  <ImageComponent
                    src={item.product_cover}
                    width={40}
                    height={40}
                    alt={item.product_short_name}
                  />
                  <Typography
                    title={item.product_short_name}
                    fontSize={"1.2rem"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    maxWidth={"150px"}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.product_short_name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <p>{formatPrice(item.price)}</p>
                {canEdit && (
                  <>
                    <Box
                      aria-owns={
                        Boolean(anchorEls?.[item.product_id])
                          ? `mouse-over-popover-${item.product_id}`
                          : undefined
                      }
                      aria-haspopup="true"
                      onMouseEnter={(e) => {
                        handlePopoverOpen(e, item.product_id);
                      }}
                      onMouseLeave={() => {
                        handlePopoverClose(item.product_id);
                      }}
                      sx={{
                        display: "inline-flex",
                      }}
                    >
                      <Typography
                        fontWeight={500}
                        color="secondary"
                        fontSize={"1.2rem"}
                      >
                        Details
                      </Typography>
                      <img src={NoteIcon} />
                    </Box>

                    <Popover
                      id={`mouse-over-popover-${item.product_id}`}
                      sx={{ pointerEvents: "none" }}
                      open={Boolean(anchorEls?.[item.product_id])}
                      anchorEl={anchorEls?.[item.product_id]}
                      onClose={() => {
                        handlePopoverClose(item.product_id);
                      }}
                      disableRestoreFocus
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Box sx={{ width: 220, padding: "10px 30px 27px" }}>
                        <Typography
                          color="primary"
                          fontWeight={500}
                          textAlign="center"
                          paddingBottom="10px"
                          borderBottom="1px solid rgba(102,102,102,.2)"
                        >
                          Unit Price
                        </Typography>
                        <Box component="ul">
                          {item?.prices?.map((item: any, index: number) => {
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
                  </>
                )}
              </TableCell>
              {canEdit ? (
                <TableCell align="center">
                  <Stepper
                    size="small"
                    value={item.skuNumber}
                    onChange={(e) => onQtyChange?.(item.sku0, e)}
                  />
                </TableCell>
              ) : (
                <>
                  {status >= 30 ? (
                    <>
                      <TableCell align="center">
                        <Typography color={"rgba(102, 102, 102, 0.5)"}>
                          {item.originalNumber}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{item.skuNumber}</TableCell>
                    </>
                  ) : (
                    <TableCell>{item.skuNumber}</TableCell>
                  )}
                </>
              )}
              <TableCell>{formatPrice(item.skuTaxAmount)}</TableCell>
              <TableCell>{formatPrice(item.skuFreight)}</TableCell>
              <TableCell>{formatPrice(item.total_price)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
