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
import { Button, InputLabel } from "@mui/material";
import { getCountrys, getZones } from "@/api/country";
import { useRequest } from "ahooks";

const StyledContainer = styled(Container)`
  margin: 40px auto;
  & > form {
    display: flex;
    flex-wrap: wrap;
    column-gap: 77px;
  }
  & .MuiFormControl-root {
    margin: 0;
  }
  & .MuiFormHelperText-root.Mui-error {
    opacity: 0;
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

const StyledBlock = styled("div")`
  display: flex;
  column-gap: 50px;
  width: 100%;
  & .MuiFormControlLabel-root {
    margin-right: 50px;
    :last-of-type {
      margin-right: 0;
    }
  }
`;

const StyledFormSubmit = styled("div")`
  width: 100%;
  text-align: center;
  margin-top: 20px;
  & .MuiButtonBase-root {
    width: 240px;
  }
`;

const StyledRequired = styled("span")`
  color: ${(props) => props.theme.palette.secondary.main};
`;

export default function Register() {
  const { data: countrys } = useRequest(async () => {
    const res = await getCountrys();
    return res?.map((item: any) => {
      return {
        id: item.id,
        label: item.area_name_en,
      };
    });
  });

  const { data: companyZoneInfo, run: companyRun } = useRequest<any, [number]>(
    async (params) => {
      return await getZones(params);
    },
    {
      manual: true,
    }
  );

  const { data: billZoneInfo, run: billRun } = useRequest<any, [number]>(
    async (params) => {
      return await getZones(params);
    },
    {
      manual: true,
    }
  );

  return (
    <StyledContainer>
      <StyledTitle>Registration application</StyledTitle>
      <FormContainer onSuccess={(data) => console.log(data)}>
        <SelectElement
          label="I am a"
          name="type"
          sx={{ minWidth: 230 }}
          required
          options={[
            { label: "Traditional Retailer", id: "Traditional Retailer" },
            { label: "Ecommerce Retailer", id: "Ecommerce Retailer" },
            { label: "Both", id: "Both" },
          ]}
        />

        <TextFieldElement required label="First Name" name="firstname" />

        <TextFieldElement required label="Last Name" name="lastname" />

        <TextFieldElement required label="Email" name="email" />

        <TextFieldElement required label="Phone" name="phone" />

        <TextFieldElement required label="Company Name" name="company_name" />

        <TextFieldElement required label="Website" name="website" />

        <TextFieldElement required label="VAT Number" name="vat_number" />

        <TextFieldElement
          label="Company Address"
          name="company_address_address"
          fullWidth
        />

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

        <TextFieldElement required label="City" name="company_address_city" />

        <SelectElement
          label="State"
          name="company_address_zone_id"
          sx={{ minWidth: 230 }}
          options={companyZoneInfo?.map((item: any) => {
            return {
              id: item.id,
              label: item.area_name_en,
            };
          })}
        />

        <TextFieldElement
          required
          label="Postal Code"
          name="company_address_postcode"
        />

        <TextFieldElement
          label="Company Address"
          name="company_address_address"
          fullWidth
        />

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

        <TextFieldElement required label="City" name="bill_to_city" />

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

        <TextFieldElement
          required
          label="Postal Code"
          name="bill_to_postcode"
        />

        <TextFieldElement
          label="Billing Address"
          name="bill_to_address"
          fullWidth
        />

        <SelectElement
          label="Annual Sales"
          name="annual_sales"
          sx={{ minWidth: 230 }}
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
        />

        <SelectElement
          label="Number of Employees"
          name="number_of_employees"
          sx={{ minWidth: 230 }}
          required
          options={[
            { label: ">500", id: ">500" },
            { label: "100~500", id: "100~500" },
            { label: "5million~1billion", id: "5million~1billion" },
            { label: "50~100", id: "50~100" },
            { label: "10~50", id: "10~50" },
            { label: "1~10", id: "1~10" },
          ]}
        />

        <SelectElement
          label="Cooperation Method"
          name="method"
          sx={{ minWidth: 230 }}
          required
          options={[
            { label: "Dropship Order", id: "Dropship Order" },
            { label: "Batch Order", id: "Batch Order" },
            { label: "Both", id: "Both" },
          ]}
        />

        <StyledBlock>
          <CheckboxButtonGroup
            label="Category of Interest"
            name="interest_category_ids"
            row
            required
            options={[
              { id: 1, label: "Home Furniture" },
              { id: 48, label: "Home & Kitchen" },
              { id: 57, label: "Outdoor & Garden" },
              { id: 78, label: "Pet Supplies" },
              { id: 87, label: "Fashion & Beauty" },
              { id: 92, label: "DIY & Tools" },
            ]}
            helperText=" "
          />
        </StyledBlock>

        <StyledBlock>
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
        </StyledBlock>

        <StyledBlock>
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
          <div>
            <InputLabel>&nbsp;</InputLabel>
            <TextFieldElement label="Other websites" name="websites" />
          </div>
          <div>
            <InputLabel>&nbsp;</InputLabel>
            <TextFieldElement label="Sales recommended" name="recommended" />
          </div>
        </StyledBlock>

        <TextareaAutosizeElement
          label="Your Message"
          name="message"
          multiline
          rows={5}
          size="medium"
          fullWidth
          placeholder="Max 800 characters"
        />

        <CheckboxElement
          name="agree"
          label={
            <div>
              By creating an account, you are agreeing to our Terms of Use and
              Privacy Policy. <StyledRequired>*</StyledRequired>
            </div>
          }
          required
          helperText=" "
        />

        <StyledFormSubmit>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            fullWidth
          >
            REGISTER
          </Button>
        </StyledFormSubmit>
      </FormContainer>
    </StyledContainer>
  );
}
