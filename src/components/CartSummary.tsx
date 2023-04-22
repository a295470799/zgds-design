import { formatPrice } from "@/utils/format";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

type Props = {
  summary: {
    count?: number;
    totalPrice?: string;
  };
  type?: "cart" | "checkout";
  onPlaceOrder?: () => void;
};

export default function CartSummary(props: Props) {
  const { summary, type = "cart", onPlaceOrder } = props;
  return (
    <Paper
      elevation={4}
      sx={{
        position: "sticky",
        top: 15,
        width: 280,
        padding: "10px 25px 36px",
        height: "fit-content",
      }}
    >
      <Typography
        textAlign={"center"}
        fontWeight={500}
        color="primary.main"
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
        {type == "checkout" && <></>}
        <StyledLi>
          <Typography
            color="secondary.main"
            fontSize="1.2rem"
            textAlign="center"
            width="100%"
          >
            Tax and Shipping Not Included
          </Typography>
        </StyledLi>
      </Box>
      <Button
        variant="contained"
        size="medium"
        fullWidth
        sx={{ marginTop: "25px" }}
        onClick={onPlaceOrder}
      >
        PLACE ORDER
      </Button>
    </Paper>
  );
}
