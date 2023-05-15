import { Box, Paper, TextField, Typography } from "@mui/material";

interface Props {
  label?: string;
  addressInfo?: API.EyaUserInfo;
  children?: React.ReactNode;
}

const CheckoutCard: React.FC<Props> = (props) => {
  const { label = "BILLING INFORMATION", addressInfo, children } = props;
  return (
    <Paper
      sx={{
        padding: "20px 10px",
        background: "#fff",
        marginBottom: "40px",
        width: "800px",
      }}
    >
      <Typography
        color="primary"
        fontWeight={500}
        fontSize="1.2rem"
        marginBottom="20px"
      >
        {label}
      </Typography>
      {children}
      {addressInfo && (
        <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: "45px" }}>
          <TextField
            label="Client Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={addressInfo?.customerName}
            inputProps={{ readOnly: true }}
          />
          <TextField
            label="Short Name"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              value: addressInfo?.customerShortName,
              readOnly: true,
            }}
          />
          <TextField
            label="Phone"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ value: addressInfo?.telephoneInfo, readOnly: true }}
          />
          <TextField
            label="Tax Code"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ value: addressInfo?.taxNumber, readOnly: true }}
          />
          <TextField
            label="Country"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              value: addressInfo?.countryAreaNameEn,
              readOnly: true,
            }}
          />

          <TextField
            label="City"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ value: "", readOnly: true }}
          />
          <TextField
            label="State"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              value: addressInfo?.provinceAreaNameEn,
              readOnly: true,
            }}
          />
          <TextField
            label="Postal Code"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ value: addressInfo?.postCode, readOnly: true }}
          />
          <TextField
            label="Address"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              value: addressInfo?.addressDetail,
              readOnly: true,
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default CheckoutCard;
