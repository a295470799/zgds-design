import React, { useState, useCallback } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Remove as RemoveIcon, Add as AddIcon } from "@mui/icons-material";

interface StepperProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  size?: "small" | "medium" | "large";
  onChange: (value: number) => void;
}

const Stepper: React.FC<StepperProps> = React.memo(
  ({ value, minValue = 1, maxValue = 9999, onChange, size = "medium" }) => {
    const [currentValue, setCurrentValue] = useState<number>(value);

    const sizeObject = {
      width: 88,
      fontSize: 16,
    };

    switch (size) {
      case "small":
        sizeObject.width = 70;
        sizeObject.fontSize = 12;
        break;
      case "large":
        sizeObject.width = 100;
        sizeObject.fontSize = 18;
        break;
    }

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
        sx={{ width: sizeObject.width }}
        value={currentValue}
        onChange={(event) => {
          let value =
            Number(event.target.value) >= maxValue
              ? maxValue
              : Number(event.target.value);
          if (isNaN(value) || value <= 0) {
            value = 1;
          }
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
              minWidth: "20px",
            },
          },
          autoComplete: "off",
          startAdornment: (
            <InputAdornment position="start" sx={{ margin: 0 }}>
              <IconButton
                onClick={handleDecrement}
                disabled={currentValue <= minValue}
                aria-label="decrement quantity"
              >
                <RemoveIcon sx={{ fontSize: sizeObject.fontSize }} />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ margin: 0 }}>
              <IconButton
                onClick={handleIncrement}
                disabled={currentValue >= maxValue}
                aria-label="increment quantity"
              >
                <AddIcon sx={{ fontSize: sizeObject.fontSize }} />
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
