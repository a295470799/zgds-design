import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import {
  CheckboxButtonGroup,
  CheckboxElement,
  FormContainer,
  SelectElement,
  TextareaAutosizeElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import { getCountrys, getZones } from "@/api/country";
import { useRequest } from "ahooks";
import { getCategorys } from "@/api/common";

const StyledContainer = styled(Container)`
  margin: 40px auto;
  & .MuiFormControl-root {
    margin: 0;
  }
  & .MuiFormHelperText-root.Mui-error {
    opacity: 0;
    white-space: nowrap;
  }
  & .MuiFormControlLabel-root {
    margin-right: 40px;
  }
`;

const StyledTitle = styled("h1")`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: 70px;
  ::before {
    content: "";
    width: 10px;
    height: 30px;
    background: #ed5933;
    border-radius: 6px;
    margin: 0 20px 0 40px;
  }
`;

export default function Register() {
  const { data: countrys = [] } = useRequest(
    async () => {
      const res = await getCountrys();
      return res?.map((item: any) => {
        return {
          id: item.area_code,
          label: item.area_name_en,
        };
      });
    },
    {
      debounceWait: 500,
    }
  );

  const { data: categorys = [] } = useRequest<any, [number]>(getCategorys, {
    defaultParams: [1],
    debounceWait: 500,
  });

  const { data: companyZoneInfo = [], run: companyRun } = useRequest<
    any,
    [number]
  >(
    async (params) => {
      return await getZones(params);
    },
    {
      manual: true,
      debounceWait: 500,
    }
  );

  const { data: billZoneInfo = [], run: billRun } = useRequest<any, [number]>(
    async (params) => {
      return await getZones(params);
    },
    {
      manual: true,
      debounceWait: 500,
    }
  );

  return (
    <StyledContainer>
      <StyledTitle>Registration application</StyledTitle>
      <FormContainer onSuccess={(data) => console.log(data)}>
        <Grid container rowSpacing={1} columnSpacing={5}>
          <Grid item xs={3}>
            <SelectElement
              label="I am a"
              name="type"
              fullWidth
              required
              options={[
                { label: "Traditional Retailer", id: "Traditional Retailer" },
                { label: "Ecommerce Retailer", id: "Ecommerce Retailer" },
                { label: "Both", id: "Both" },
              ]}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="First Name"
              name="firstname"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="Last Name"
              name="lastname"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="Email"
              name="email"
              type="email"
              fullWidth
              sx={{
                "& .MuiFormHelperText-root.Mui-error": {
                  opacity: 1,
                },
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <TextFieldElement required label="Phone" name="phone" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="Company Name"
              name="company_name"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="Website"
              name="website"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="VAT Number"
              name="vat_number"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldElement
              label="Company Address"
              name="company_address_address"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <SelectElement
              label="Country"
              name="company_address_country_id"
              sx={{ minWidth: 230 }}
              required
              options={countrys}
              onChange={(value) => {
                companyRun(value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="City"
              name="company_address_city"
            />
          </Grid>
          <Grid item xs={3}>
            <SelectElement
              label="State"
              name="company_address_zone_id"
              sx={{ minWidth: 230 }}
              options={companyZoneInfo?.map((item: any) => {
                return {
                  id: item.area_code,
                  label: item.area_name_en,
                };
              })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="Postal Code"
              name="company_address_postcode"
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldElement
              label="Company Address"
              name="company_address_address"
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <SelectElement
              label="Country"
              name="bill_to_country_id"
              sx={{ minWidth: 230 }}
              required
              options={countrys}
              onChange={(value) => {
                billRun(value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement required label="City" name="bill_to_city" />
          </Grid>
          <Grid item xs={3}>
            <SelectElement
              label="State"
              name="bill_to_zone_id"
              sx={{ minWidth: 230 }}
              options={billZoneInfo?.map((item: any) => {
                return {
                  id: item.id,
                  label: item.area_name_en,
                };
              })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFieldElement
              required
              label="Postal Code"
              name="bill_to_postcode"
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldElement
              required
              label="Billing Address"
              name="bill_to_address"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <SelectElement
              label="Annual Sales"
              name="annual_sales"
              required
              options={[
                { label: ">10billion", id: ">10billion" },
                { label: "1billion~10billion", id: "1billion~10billion" },
                { label: "5million~1billion", id: "5million~1billion" },
                { label: "3million~5million", id: "3million~5million" },
                { label: "1million~3million", id: "1million~3million" },
                { label: "1~1million", id: "1~1million" },
                { label: "0", id: "0" },
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <SelectElement
              label="Number of Employees"
              name="number_of_employees"
              required
              options={[
                { label: ">500", id: ">500" },
                { label: "100~500", id: "100~500" },
                { label: "5million~1billion", id: "5million~1billion" },
                { label: "50~100", id: "50~100" },
                { label: "10~50", id: "10~50" },
                { label: "1~10", id: "1~10" },
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <SelectElement
              label="Cooperation Method"
              name="method"
              required
              options={[
                { label: "Dropship Order", id: "Dropship Order" },
                { label: "Batch Order", id: "Batch Order" },
                { label: "Both", id: "Both" },
              ]}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <CheckboxButtonGroup
              label="Category of Interest"
              name="interest_category_ids"
              row
              required
              options={categorys?.map((item: any) => {
                return { label: item.name, id: item.id };
              })}
              helperText=" "
            />
          </Grid>

          <Grid item xs={12} pt={"0!important"}>
            <CheckboxButtonGroup
              label="Main Sales Channels"
              name="sales"
              row
              required
              options={[
                { id: "E-commerce", label: "E-commerce" },
                { id: "Chain store", label: "Chain store" },
                {
                  id: "Engineering contractor",
                  label: "Engineering contractor",
                },
                { id: "Wholesaler", label: "Wholesaler" },
                { id: "Distributor", label: "Distributor" },
              ]}
              helperText=" "
            />
          </Grid>
          <Grid item xs={12} display={"flex"} pt={"0!important"}>
            <CheckboxButtonGroup
              label="How to know"
              name="Vasagle"
              row
              required
              options={[
                { id: "Vasagle", label: "vasagleb2b.com" },
                { id: "Feandrea", label: "songmicshome.com" },
              ]}
              helperText=" "
            />
            <Box mr={"40px"}>
              <InputLabel>&nbsp;</InputLabel>
              <TextFieldElement label="Other websites" name="websites" />
            </Box>
            <Box>
              <InputLabel>&nbsp;</InputLabel>
              <TextFieldElement label="Sales recommended" name="recommended" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosizeElement
              label="Your Message"
              name="message"
              multiline
              rows={5}
              size="medium"
              fullWidth
              placeholder="Max 800 characters"
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxElement
              name="agree"
              label={
                <Box>
                  By creating an account, you are agreeing to our Terms of Use
                  and Privacy Policy.{" "}
                  <Typography color="secondary" component={"span"}>
                    *
                  </Typography>
                </Box>
              }
              required
              helperText=" "
            />
          </Grid>
        </Grid>

        <Box textAlign={"center"} width={"100%"} mt={3}>
          <Button
            type="submit"
            color="success"
            size="large"
            sx={{ width: 240 }}
          >
            REGISTER
          </Button>
        </Box>
      </FormContainer>
    </StyledContainer>
  );
}
