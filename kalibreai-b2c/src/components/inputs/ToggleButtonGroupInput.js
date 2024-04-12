import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

function ToggleButtonGroupInput(props) {
  const { label, control, name, validation, options,value,updateField,error } = props;

  // console.log("toggle buttons name ====",name)
  // console.log("toggle buttons validation====",validation)


  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>
        <Controller
          control={control}
          name={name}
          rules={validation}
          render={({ field }) => (
            <ToggleButtonGroup
               {...field}
              color="primary"
              value={value}
              exclusive
              onChange={(e) =>{ 
                updateField(parseInt(e.target.value),name)
                field.onChange(parseInt(e.target.value))
              }}
              aria-label="Platform"
            >
              {options?.map((data, idx) => {
                return (
                  <Box key={idx}>
                    <ToggleButton value={data.value}>
                      {data.name}
                    </ToggleButton>
                  </Box>
                );
              })}
            </ToggleButtonGroup>
          )}
        />
        <Typography sx={{fontSize:"14px", color:"red"}}>{error&&error}</Typography>

      </Stack>
    </>
  );
}

export default ToggleButtonGroupInput;
