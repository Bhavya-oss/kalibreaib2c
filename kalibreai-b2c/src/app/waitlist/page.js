"use client";

import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { isPublicDomaiEmail, postClientData } from "../api/ApiHandlers";
import CircularProgress from "@mui/material/CircularProgress";

function page() {
  const [emailWarning, setEmailWarning] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (emailWarning || isSuccessfull) {
      setTimeout(() => {
        setEmailWarning(false);
        setIsSuccessfull(false);
      }, 5000);
    }
  }, [emailWarning, isSuccessfull]);

  // submit the detail
  const submit = (data) => {
    postClientData(data).then((response) => {
      setIsSuccessfull(true);
      reset();
      setIsLoading(false);
    });
  };

  //validating the email
  const validateEmail = async (data) => {
    console.log("form data =", data);
    try {
      setIsLoading(true);
      await isPublicDomaiEmail(data.email).then((response) => {
        if (response?.public_domain) {
          setEmailWarning(true);
          setIsLoading(false);
        } else {
          submit(data);
        }
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <Box>
      <Container maxWidth="xl" sx={{ marginTop: "150px" }}>
        <Typography variant="h1" textAlign="center">
          Early Access Program
        </Typography>
        <Typography
          variant="h5"
          width={600}
          sx={{ margin: "auto", textAlign: "center", marginTop: "15px" }}
        >
          We're rolling out an Early Access program with limited spots. We'd
          love to have you join us as we revolutionize the Tech Hiring
          landscape.
        </Typography>

        <Box sx={{ width: "80", maxWidth: "600px", margin: "3rem auto" }}>
          <form onSubmit={handleSubmit(validateEmail)}>
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
                      value={value || ""}
                      error={Boolean(errors?.name?.message)}
                      helperText={
                        Boolean(errors?.name?.message) && errors?.name?.message
                      }
                      fullWidth
                      placeholder="Enter your full name"
                    />
                  )}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Work Email</Typography>
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
                      value={value || ""}
                      error={Boolean(errors?.email?.message)}
                      helperText={
                        Boolean(errors?.email?.message) &&
                        errors?.email?.message
                      }
                      fullWidth
                      placeholder="Enter your email address"
                    />
                  )}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography variant="h5">Company</Typography>
                <Controller
                  control={control}
                  rules={{
                    required: "Company name is Required!",
                  }}
                  name="company_name"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      error={Boolean(errors?.company_name?.message)}
                      helperText={
                        Boolean(errors?.company_name?.message) &&
                        errors?.company_name?.message
                      }
                      fullWidth
                      placeholder="Enter your Company name"
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
                      value={value || ""}
                      fullWidth
                      multiline
                      minRows={6}
                    />
                  )}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  {isLoading ? (
                    <CircularProgress size={25} color="inherit" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={emailWarning}
          onClose={() => {
            setEmailWarning(false);
          }}
          key={"top" + "center"}
        >
          <Alert
            onClose={() => {
              setEmailWarning(false);
            }}
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            You Cannot login in personal Email!
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={isSuccessfull}
          onClose={() => {
            setIsSuccessfull(false);
          }}
          key={"top" + "ceanter"}
        >
          <Alert
            onClose={() => {
              setIsSuccessfull(false);
            }}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Successfully submitted
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default page;
