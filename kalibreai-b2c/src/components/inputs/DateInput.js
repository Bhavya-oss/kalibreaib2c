import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import SwitchInput from "./SwitchInput";

function DateInput(props) {
  const {
    label,
    value,
    control,
    name,
    validation,
    updateField,
    error,
    switchLabel,
    switchName,
    switchValue,
  } = props;

  const minAllowedDate = dayjs();

  return (
    <>
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
        {!switchValue && <Controller
          control={control}
          name={name}
          rules={validation}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                minDate={minAllowedDate}
                disabled={switchValue}
                value={value === null ? null : dayjs(value)}
                onChange={(e) => {
                  const formattedDate = dayjs(e).format("YYYY-MM-DD");

                  field.onChange(formattedDate);
                  updateField(formattedDate, name);
                }}
                slotProps={{
                  textField: {
                    helperText: Boolean(error) && error,
                    size: "small",
                    error: Boolean(error),
                  },
                }}
                sx={{ width: "80%", maxWidth: "300px" }}
              />
            </LocalizationProvider>
          )}
        />}
      </Stack>
    </>
  );
}

export default DateInput;
