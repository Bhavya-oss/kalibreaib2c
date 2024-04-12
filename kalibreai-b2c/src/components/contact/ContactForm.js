"use client";

import { submitContactUs } from "@/app/api/ApiHandlers";
import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const FormLayout = styled(Box)(({ theme }) => ({
  border: "3px solid",
  borderImage: "linear-gradient(45deg, #00E1F9, #5960FF, #6CECF6)",
  borderImageSlice: "1",
  width: "75%",
  margin: "4rem auto",
  padding: "3rem",
  "@media (max-width:700px)": {
    width: "95%",
    padding: "2rem",
  },
}));

function ContactForm() {
  const [state, setState] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const submit = async (data) => {
    console.log("form data =", data);
    try {
      await submitContactUs(data);
      setState(true);
    } catch (error) {
      // Handle submission error
      console.error("Submission failed:", error);
    }
  };

  return (
    <>
      <FormLayout>
        <form onSubmit={handleSubmit(submit)}>
          <Stack
            direction="column"
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Your Name</Typography>
              <Controller
                control={control}
                rules={{
                  required: "Name is Required!",
                }}
                name="name"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors?.name?.message)}
                    helperText={
                      Boolean(errors?.name?.message) && errors?.name?.message
                    }
                    fullWidth
                    placeholder="Enter your name"
                  />
                )}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Phone number</Typography>
              <Controller
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Invalid phone number",
                  },
                }}
                name="phonenumber"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors?.phonenumber?.message)}
                    helperText={
                      Boolean(errors?.phonenumber?.message) &&
                      errors?.phonenumber?.message
                    }
                    fullWidth
                    placeholder="Enter your phone number"
                  />
                )}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Email address</Typography>
              <Controller
                control={control}
                rules={{
                  required: "Email is Required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                }}
                name="email"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors?.email?.message)}
                    helperText={
                      Boolean(errors?.email?.message) && errors?.email?.message
                    }
                    fullWidth
                    placeholder="Enter your email address"
                  />
                )}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography variant="h5">Message</Typography>
              <Controller
                control={control}
                name="message"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    fullWidth
                    multiline
                    minRows={6}
                  />
                )}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Button type="submit" variant="contained" fullWidth size="large">
                Submit
              </Button>
            </Box>
          </Stack>
        </form>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={state}
          onClose={() => {
            setState(false);
          }}
          key={"top" + "center"}
        >
          <Alert
            onClose={() => {
              setState(false);
            }}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Successfully submitted
          </Alert>
        </Snackbar>
      </FormLayout>
    </>
  );
}

export default ContactForm;
