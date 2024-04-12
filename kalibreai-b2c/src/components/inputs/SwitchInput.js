import { Box, FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function SwitchInput(props) {
  const { label, update, value, name, control } = props;

  return (
    <>
      <Box sx={{ marginLeft: "2px" }}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={
                <Switch
                  checked={value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    update(e.target.checked, name);
                  }}
                  //   size="small"
                />
              }
              label={label}
            />
          )}
        />
      </Box>
    </>
  );
}

export default SwitchInput;
