import { Box, Stack, TextField, Typography } from "@mui/material";

function TextInput(props) {
  const {
    value,
    placeholder,
    error,
    register,
    name,
    validation,
    label,
    updateValue
  } = props;




  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>
        <TextField
          hiddenLabel
          value={value}
          variant="filled"
          // size="small"
          inputProps={{
            onChange: (e) => {
              // console.log("qqq ====",e.target.value,name)
              updateValue(e.target.value,name)
            },
          }}
          placeholder={placeholder}
          error={Boolean(error)}
          helperText={
            Boolean(error) && <span sx={{ color: "red" }}>{error}</span>
          }
          {...(register && register(name, validation))}
          sx={{ width: "100%", maxWidth: "300px" }}
        />
      </Stack>
    </>
  );
}

export default TextInput;
