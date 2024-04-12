import { CheckBox } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { Controller } from "react-hook-form";
import CheckBoxInput from "./CheckBoxInput";

function GroupCheckBoxInput(props) {
  const {
    label,
    name,
    control,
    updateValue,
    validation,
    error,
    options,
    value,
  } = props;

  const handleChange = useCallback(
    (data, reactHookFormOnChange) => {
      let tempData = data.target.value;
      let tempValue = [...value];

      if (tempValue?.includes(tempData)) {
        tempValue = tempValue?.filter((data) => data != tempData);
      } else {
        tempValue.push(tempData);
      }

      reactHookFormOnChange(tempValue);

      updateValue(tempValue, name);
    },
    [name, value]
  );

  console.log("message ===", error);

  return (
    <Box>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>

        <Controller
          control={control}
          name={name}
          rules={validation}
          render={({ field }) => (
            <Stack direction="row" spacing={2}>
              {options?.map((data, idx) => (
                <CheckBoxInput
                  key={idx}
                  {...field}
                  label={data?.label}
                  value={data?.value}
                  checked={value?.includes(data?.value)}
                  handleChange={(e) => {
                    handleChange(e, field.onChange);
                  }}
                  size="small"
                />
              ))}
            </Stack>
          )}
        />

        <Typography variant="body1" sx={{ color: "red" }}>
          {Boolean(error) && error}
        </Typography>
      </Stack>
    </Box>
  );
}

export default GroupCheckBoxInput;
