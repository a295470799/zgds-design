import React, { useState, useCallback } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

interface StepperProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
}

const Stepper: React.FC<StepperProps> = React.memo(
  ({ value, minValue = 1, maxValue = 999, onChange }) => {
    const [currentValue, setCurrentValue] = useState<number>(value);

    const handleDecrement = useCallback(() => {
      const newValue = currentValue - 1;
      if (minValue === undefined || newValue >= minValue) {
        setCurrentValue(newValue);
        onChange(newValue);
      }
    }, [currentValue, minValue, onChange]);

    const handleIncrement = useCallback(() => {
      const newValue = currentValue + 1;
      if (maxValue === undefined || newValue <= maxValue) {
        setCurrentValue(newValue);
        onChange(newValue);
      }
    }, [currentValue, maxValue, onChange]);

    return (
      <TextField
        type="text"
        sx={{ width: 95 }}
        value={currentValue}
        onChange={(event) => {
          const value =
            Number(event.target.value) >= maxValue
              ? maxValue
              : Number(event.target.value);
          setCurrentValue(value);
          onChange(value);
        }}
        InputProps={{
          sx: { padding: 0 },
          inputProps: {
            min: minValue,
            max: maxValue,
            style: {
              textAlign: "center",
              padding: "6px 0",
              fontSize: 12,
            },
          },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={handleDecrement}
                disabled={currentValue <= minValue}
                aria-label="decrement quantity"
              >
                <RemoveIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleIncrement}
                disabled={currentValue >= maxValue}
                aria-label="increment quantity"
              >
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText=""
      />
    );
  }
);

Stepper.displayName = "Stepper";

export default Stepper;
