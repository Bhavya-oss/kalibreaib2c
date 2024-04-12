import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function RadioButtonsInput(props) {
  const {
    label,
    name,
    options,
    validation,
    value,
    error,
    updateValue,
    control,
    isRowDirection,
  } = props;

  console.log("rrr erorr ===", validation);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>

        <FormControl component="fieldset" error={Boolean(error)}>
          <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field }) => (
              <RadioGroup
                row={isRowDirection}
                aria-label="options"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  if (name === "resigned") {
                    updateValue(JSON.parse(e.target.value), name);
                  } else {
                    updateValue(e.target.value, name);
                  }
                }}
                value={value}
              >
                {options?.map((data, idx) => {
                  return (
                    <FormControlLabel
                      key={idx}
                      value={data?.value}
                      control={<Radio />}
                      label={data?.label}
                    />
                  );
                })}
              </RadioGroup>
            )}
          />
          <FormHelperText>
            {Boolean(error) && <span sx={{ color: "red" }}>{error}</span>}{" "}
          </FormHelperText>
        </FormControl>



        
      </Stack>
    </>
  );
}

export default RadioButtonsInput;
