import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function SelectInput(props) {
  const { label, name, control, validation, options, value, updateField } =
    props;

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>

        <Controller
          name={name}
          control={control}
          validation={validation}
          render={({ field }) => (
            <Select
              {...field}
              size="small"
              value={value}
              onChange={(e) => {
                field.onChange(e.target.value);
                updateField(e.target.value, name);
              }}
              sx={{ width: "85%", maxWidth: "450px" }}
            >
              {options?.map((data) => {
                return <MenuItem value={data.value}>{data.name}</MenuItem>;
              })}
            </Select>
          )}
        />
      </Stack>
    </>
  );
}

export default SelectInput;
