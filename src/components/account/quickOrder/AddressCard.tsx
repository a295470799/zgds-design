import { Button, Grid, TextField, Typography } from "@mui/material";

interface Props {
  type: "shipping" | "billing";
  children?: React.ReactNode;
  addressInfo?: API.EyaUserInfo;
}
const AddressCard: React.FC<Props> = (props) => {
  const { type, children, addressInfo } = props;
  return (
    <>
      <Typography color={"primary"} mb={"20px"} textTransform={"uppercase"}>
        {type} INFORMATION
      </Typography>
      <Grid container spacing={2}>
        {children && (
          <Grid item xs={12}>
            {children}
          </Grid>
        )}

        {addressInfo && (
          <>
            <Grid item xs={6}>
              <TextField
                label="Client Name"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.customerName}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Short Name"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.customerShortName}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.telephoneInfo}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Tax Code"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.taxNumber}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Country"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.countryAreaNameEn}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="City"
                InputLabelProps={{
                  shrink: true,
                }}
                value={""}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.provinceAreaNameEn}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Postal Code"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.postCode}
                inputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                InputLabelProps={{
                  shrink: true,
                }}
                value={addressInfo?.addressDetail}
                inputProps={{ readOnly: true }}
                fullWidth
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default AddressCard;
