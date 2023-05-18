import * as React from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { Controller } from "react-hook-form-mui";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface OptionsProps {
  id: string;
  label: string;
}

interface Props {
  label: string;
  options: OptionsProps[] | (string | number)[];
  name: string;
}

const MultipleSelectElement: React.FC<Props> = (props) => {
  const { label, options = [], name } = props;
  const newOptions = options.map((item) => {
    if (typeof item == "object") {
      return item;
    }
    return {
      id: item,
      label: item,
    };
  });
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, ref } }) => (
        <Autocomplete
          multiple
          options={newOptions}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label.toString()}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          onChange={(e, value) => {
            onChange(value?.map((item) => item.id));
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} inputRef={ref} />
          )}
          isOptionEqualToValue={(option, value) => {
            return option.id == value.id;
          }}
          value={newOptions.filter((i) => value.includes(i.id))}
          sx={{
            "& .MuiAutocomplete-tag": {
              margin: "2px",
              height: "24px",
            },
            "& .MuiChip-deleteIcon": {
              fontSize: "1.8rem",
            },
          }}
        />
      )}
    />
  );
};

export default MultipleSelectElement;
