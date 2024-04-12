import { Box, Checkbox, FormControlLabel } from "@mui/material";

function CheckBoxInput(props) {
  const { label, value, checked, handleChange, size } = props;

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox onChange={handleChange} size={size} />}
        label={label}
        value={value}
        checked={checked}
      />
    </Box>
  );
}

export default CheckBoxInput;
