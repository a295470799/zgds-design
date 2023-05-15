import { formatPrice } from "@/utils/format";
import { Box, Button, Paper, SxProps, Theme, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SelectElement } from "react-hook-form-mui";

const StyledLi = styled("li")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  border-bottom: 1px dashed rgba(102, 102, 102, 0.2);
  & > span {
    color: ${(props) => props.theme.palette.text.secondary};
    font-weight: 500;
  }
`;

const LiLeft = styled("span")`
  font-size: 1.2rem;
`;

const LiRight = styled("span")`
  font-size: 1.4rem;
`;

interface Props {
  summary: {
    count?: number;
    totalPrice?: string;
    taxPrice?: string;
    tradeClauseCodePrice?: string;
  };
  type?: "cart" | "checkout";
  onPlaceOrder?: () => void;
  sx?: SxProps<Theme>;
}

export default function CartSummary(props: Props) {
  const { summary, type = "cart", onPlaceOrder, sx } = props;
  return (
    <Paper
      elevation={4}
      sx={{
        position: "sticky",
        top: 15,
        width: 280,
        padding: "10px 25px 36px",
        height: "fit-content",
        ...sx,
      }}
    >
      <Typography
        textAlign={"center"}
        fontWeight={500}
        color="primary"
        paddingBottom="10px"
        borderBottom="1px solid rgba(102,102,102,.2)"
      >
        CART SUMMARY
      </Typography>
      <Box component="ul">
        <StyledLi>
          <LiLeft>Selected Items</LiLeft>
          <LiRight>{summary?.count}</LiRight>
        </StyledLi>
        <StyledLi>
          <LiLeft>Subtotal</LiLeft>
          <LiRight>{formatPrice(summary?.totalPrice)}</LiRight>
        </StyledLi>
        {type == "checkout" && (
          <>
            <StyledLi>
              <LiLeft>Tax</LiLeft>
              <LiRight>{formatPrice(summary?.taxPrice)}</LiRight>
            </StyledLi>
            <StyledLi>
              <LiLeft>Order Total</LiLeft>
              <LiRight>
                <Typography
                  color="secondary"
                  fontSize="1.4rem"
                  fontWeight={700}
                >
                  {formatPrice(summary?.totalPrice)}
                </Typography>
              </LiRight>
            </StyledLi>
          </>
        )}
        <StyledLi>
          <Typography
            color="secondary"
            fontSize="1.2rem"
            textAlign="center"
            width="100%"
          >
            {type == "checkout" && "Shipping Not Included"}
            {type == "cart" && "Tax and Shipping Not Included"}
          </Typography>
        </StyledLi>
        {type == "checkout" && (
          <>
            <StyledLi>
              <LiLeft>Price term</LiLeft>
              <LiRight>{summary?.tradeClauseCodePrice}</LiRight>
            </StyledLi>
            <StyledLi>
              <LiLeft>
                <Box sx={{ display: "flex" }}>
                  <Typography color="secondary">*</Typography>Trade term
                </Box>
              </LiLeft>
              <LiRight>
                <SelectElement
                  // label={
                  //   <Typography
                  //     component="span"
                  //     sx={{
                  //       fontSize: "1.3rem",
                  //       transform: "translate(-2px, -9px) scale(0.9)",
                  //       display: "inline-block",
                  //     }}
                  //   >
                  //     Select
                  //   </Typography>
                  // }
                  name="tradeClauseCode"
                  required
                  options={[
                    { id: "EXW", label: "EXW" },
                    { id: "DDP", label: "DDP" },
                    { id: "DDU", label: "DDU" },
                  ]}
                  sx={{
                    width: "77px",
                    fontSize: "1.2rem",
                    "& .MuiInputBase-root": { height: "25px" },
                    "& .MuiFormHelperText-root, .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                    "& .MuiInputBase-input": { fontSize: "1.2rem" },
                  }}
                />
              </LiRight>
            </StyledLi>
          </>
        )}
      </Box>
      <Button
        size="medium"
        fullWidth
        sx={{ marginTop: "25px" }}
        onClick={onPlaceOrder}
        type="submit"
        disabled={Number(summary?.totalPrice) <= 0}
      >
        PLACE ORDER
      </Button>
    </Paper>
  );
}
