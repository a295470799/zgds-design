import { getZones } from "@/api/country";
import { getEyaUsers } from "@/api/user";
import AddressModal from "@/components/AddressModal";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import { useState } from "react";
import {
  SelectElement,
  TextFieldElement,
  UseFormSetValue,
} from "react-hook-form-mui";

interface Props {
  action?: string; // "show" | "edit"
  status?: number;
  orderType?: string; // "Dropship" | "Batch order"
  addressType?: "shipping" | "billing";
  addressInfo: API.OrderDetailAddressParams;
  countrys?: any[];
  zones?: any[];
  control?: any;
  callBack?: (data: API.EyaUserInfo) => void;
  setValue?: UseFormSetValue<API.ShippingParams>;
  onCountryChange?: (countryCode: string) => void;
}

const OrderAddress: React.FC<Props> = (props) => {
  const {
    action = "show",
    status = -1,
    orderType = "Dropship",
    addressType = "shipping",
    addressInfo,
    countrys = [],
    zones = [],
    control,
    callBack,
    setValue,
    onCountryChange,
  } = props;

  const [address, setAddress] =
    useState<API.OrderDetailAddressParams>(addressInfo);

  const { data: addressList, runAsync: runAddressList } = useRequest<
    API.EyaUserInfo[],
    [string]
  >(getEyaUsers, {
    manual: true,
  });

  const handleClick = () => {
    runAddressList(addressType == "shipping" ? "T5" : "T6");
  };

  const handleSelect = (data: API.EyaUserInfo) => {
    setAddress({
      name: data.customerName,
      shortname: data.customerShortName,
      email: "",
      phone: data.telephoneInfo,
      taxNumber: data.taxNumber,
      country: data.countryAreaNameEn,
      zone: data.provinceAreaNameEn,
      city: "",
      postcode: data.postCode,
      address: data.addressDetail,
    });
    callBack?.(data);
  };

  const canEdit = action == "edit" && status == 0;

  const { data: zoneInfo = zones, run: runZone } = useRequest<any, [number]>(
    async (params) => {
      return await getZones(params);
    },
    {
      manual: true,
    }
  );

  return (
    <Paper sx={{ padding: "20px", marginTop: "20px" }}>
      <Typography
        fontSize={"1.4rem"}
        marginBottom={"20px"}
        color={"primary"}
        fontWeight={500}
        textTransform={"capitalize"}
      >
        {addressType} Information
      </Typography>

      {canEdit &&
        ((orderType != "Dropship" && addressType == "shipping") ||
          addressType == "billing") && (
          <AddressModal
            trigger={
              <Button sx={{ marginBottom: "20px" }} onClick={handleClick}>
                Select {addressType == "shipping" ? "ship" : "bill"} to
              </Button>
            }
            type={addressType}
            addresses={addressList ?? []}
            onSelect={handleSelect}
          />
        )}

      {canEdit && orderType == "Dropship" && addressType == "shipping" ? (
        <Box
          sx={{
            "& .MuiInputBase-input, .MuiInputBase-input.MuiSelect-select": {
              fontSize: "1.4rem",
              height: "26px",
              lineHeight: "26px",
              padding: "0 14px",
            },
            "& .MuiFormHelperText-root": {
              marginTop: 0,
            },
          }}
        >
          <TextFieldElement
            name="shipping_name"
            placeholder="Name"
            required
            control={control}
          />
          <TextFieldElement
            name="shipping_email"
            placeholder="Email"
            control={control}
          />
          <TextFieldElement
            name="shipping_phone"
            placeholder="Phone"
            control={control}
          />
          <SelectElement
            name="shipping_country_code"
            placeholder="Country"
            options={countrys.map((item) => {
              return {
                id: item.area_code,
                label: item.area_name_en,
              };
            })}
            onChange={(value) => {
              runZone(value);
              setValue?.("shipping_zone", "");
              onCountryChange?.(value);
            }}
            required
            sx={{ width: "100%" }}
            control={control}
          />
          <TextFieldElement
            name="shipping_city"
            placeholder="City"
            required
            control={control}
          />
          <SelectElement
            name="shipping_zone"
            placeholder="State"
            options={zoneInfo?.map((item: any) => {
              return {
                id: item.area_code,
                label: item.area_name_en,
              };
            })}
            sx={{ width: "100%" }}
            control={control}
          />
          <TextFieldElement
            name="shipping_postcode"
            placeholder="Postal Code"
            required
            control={control}
          />
          <TextFieldElement
            name="shipping_address"
            placeholder="Address"
            required
            control={control}
          />
        </Box>
      ) : (
        <Box
          component={"ul"}
          sx={(theme) => {
            return {
              "& li": {
                fontSize: "1.2rem",
                color: theme.palette.text.secondary,
                marginBottom: "5px",
                wordBreak: "break-all",
              },
            };
          }}
        >
          <Typography component={"li"}>{address?.name}</Typography>
          <Typography component={"li"}>{address?.shortname}</Typography>
          <Typography component={"li"}>{address?.email}</Typography>
          <Typography component={"li"}>{address?.phone}</Typography>
          <Typography component={"li"}>{address?.taxNumber}</Typography>
          <Typography component={"li"}>{address?.country}</Typography>
          <Typography component={"li"}>{address?.zone}</Typography>
          <Typography component={"li"}>{address?.city}</Typography>
          <Typography component={"li"}>{address?.postcode}</Typography>
          <Typography component={"li"}>{address?.address}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default OrderAddress;
