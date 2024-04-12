"use client";

import { Box, Slider, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import SwitchInput from "./SwitchInput";
import { makeProperValidation } from "@/utils/CustomFunctions";

function CustomSliderInput(props) {
  const {
    label,
    name,
    min,
    max,
    step,
    marks,
    validation,
    control,
    value,
    updateField,
    error,
    switchLabel,
    switchName,
    switchValue,
  } = props;

  const [Slidervalue, setSliderValue] = useState(value);

  const handleCommitted = useCallback(
    (_, value) => {
      updateField(value, name);
    },
    [name]
  );

  const handleTextChange = useCallback(
    (value) => {
      updateField(value, name);
      setSliderValue(value);
    },
    [name]
  );

  // console.log("qaz error ====", makeProperValidation(validation)?.validate);
  // console.log("qaz error without ====", validation);

  return (
    <Box>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>

        {switchLabel && switchName && (
          <Box>
            <SwitchInput
              label={switchLabel}
              name={switchName}
              update={updateField}
              value={switchValue}
              control={control}
            />
          </Box>
        )}

        {!switchValue && (
          <Stack direction="row" spacing={4}>
            <Controller
              name={name}
              rules={makeProperValidation(validation)}
              control={control}
              render={({ field }) => (
                <Slider
                  {...field}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  disabled={switchValue}
                  min={min}
                  max={max}
                  step={step}
                  value={Slidervalue}
                  marks={marks}
                  onChange={(_, e) => {
                    setSliderValue(e);
                    field.onChange(e);
                  }}
                  onChangeCommitted={handleCommitted}
                  sx={{ width: "57%", minWidth: "400px" }}
                />
              )}
            />
            <Controller
              name={name}
              control={control}
              rules={makeProperValidation(validation)}
              render={({ field }) => (
                <TextField
                  {...field}
                  ref={field.ref}
                  type="number"
                  disabled={switchValue}
                  value={Slidervalue}
                  sx={{
                    width: "60px",
                    padding: 0,
                    "& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button":
                      {
                        appearance: "none",
                        margin: 0,
                      },
                  }}
                  size="small"
                  error={Boolean(error)}
                  InputProps={{
                    inputMode: "numeric",
                  }}
                  onChange={(e) => {
                    let newValue = parseFloat(e.target.value);

                    // Round the value to the nearest integer
                    newValue = Math.round(newValue * 2) / 2; // Round to the nearest 0.5
                    handleTextChange(newValue);
                    field.onChange(newValue);
                  }}
                />
              )}
            />
          </Stack>
        )}
        <Typography sx={{ color: "#FF0000", fontSize: "11px" }}>
          {Boolean(error) && error}
        </Typography>
      </Stack>
    </Box>
  );
}

export default CustomSliderInput;
