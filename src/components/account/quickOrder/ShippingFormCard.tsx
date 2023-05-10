import { Grid, Typography } from "@mui/material";
import { SelectElement, TextFieldElement } from "react-hook-form-mui";

type Props = {
  countrys: any[];
};
const ShippingFormCard: React.FC<Props> = (props) => {
  const { countrys } = props;

  return (
    <>
      <Typography color={"primary"} mb={"20px"}>
        SHIPPING INFORMATION
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldElement
            name="shipping_name"
            label="Name"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextFieldElement name="shipping_email" label="Email" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextFieldElement name="shipping_phone" label="Phone" fullWidth />
        </Grid>

        <Grid item xs={6}>
          <SelectElement
            name="shipping_country_code"
            label="Country"
            options={countrys}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldElement
            name="shipping_city"
            label="City"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextFieldElement name="shipping_zone" label="State" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextFieldElement
            name="shipping_postcode"
            label="Postal Code"
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextFieldElement
            name="shipping_address"
            label="Address"
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ShippingFormCard;
