"use client";

import {
  FACEBOOK_LOGO,
  INSTAGRAM_LOGO,
  KALIBRE_TITLE,
  LINKEDIN_LOGO,
} from "@/constants/MediaConstants";
import { SUBSCRIBE_BUTTON_STRING } from "@/constants/TextConstants";
import api from "@/utils/HttpCommons";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const FooterCard = styled(Box)(({ theme }) => ({
  background: "#fff",
  boxShadow: "0px 4px 14px 0px #DCE3FF",
  padding: "4rem 8rem",
  marginBottom: "3rem",
  borderRadius: "14px",
  "@media (max-width:900px)": {
    padding: "3rem 4rem",
  },
  "@media (max-width:600px)": {
    padding: "2rem 2rem",
  },
}));

function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");

  const [emailStatus, setEmailStatus] = useState({
    emailStatus: false,
    success: false,
  });

  const emailSend = async (data) => {
    try {
      const response = await api.post("client/mail", data);
      const result = response.data;

      return result;
    } catch (erorr) {
      console.log(erorr);
    }
  };

  const submit = useCallback(async () => {
    setEmailStatus((prev) => ({
      ...prev,
      emailStatus: false,
      success: false,
    }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      console.log("email is correct");

      try {
        const data = {
          email: email,
        };

        // Wait for the emailSend function to complete before proceeding
        await emailSend(data);

        // Update state and reset email
        setEmailStatus((prev) => ({
          ...prev,
          emailStatus: false,
          success: true,
        }));

        setEmail("");
        setTimeout(() => {
          setEmailStatus((prev) => ({
            ...prev,
            success: false,
          }));
        }, 5000);
      } catch (error) {
        console.log("Error from footer email submit :", error);
      }
    } else {
      setEmailStatus((prev) => ({
        ...prev,
        emailStatus: true,
      }));

      console.log("email is not correct ");
    }
  }, [email]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEmailStatus((prev) => ({
  //       ...prev,
  //       emailStatus: false,
  //       success: false,
  //     }));
  //   }, 5000);
  // }, [email]);

  // console.log("heknkazjbjahsb", emailStatus);

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Container maxWidth="xl">
          <FooterCard>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Box>
                <Typography variant="h1">Join the Kalibre community</Typography>
              </Box>
              <Box>
                <TextField
                  placeholder="Enter your email"
                  value={email || ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={emailStatus.emailStatus}
                  helperText={
                    emailStatus?.emailStatus == false &&
                    emailStatus?.success == true ? (
                      <Typography color={"green"}>
                        Thanks for subscribe
                      </Typography>
                    ) : emailStatus?.emailStatus == true &&
                      emailStatus?.success == false ? (
                      "Invalid email"
                    ) : (
                      ""
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <Button variant="contained" onClick={submit}>
                        {SUBSCRIBE_BUTTON_STRING}
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Stack>
          </FooterCard>

          <Box sx={{ margin: {xs:"3rem 0 2rem 0",md:"5rem 0  7rem 0"} }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="start"
              spacing={4}
            >
              <Box
                sx={{
                  width: { xs: "180px", sm: "230px", md: "280px", lg: "300px" },
                }}
              >
                <Box>
                  <img src={KALIBRE_TITLE} alt="kalibre ai" width={"80%"} />
                </Box>

                <Box ml={1}>
                  <Typography variant="subtitle1" color="#394a59">
                    &copy; {currentYear} All rights reserverd.
                  </Typography>
                  <Typography variant="subtitle1" color="#394a59">
                    DWise Techlabs Pvt ltd.
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Stack direction="column" spacing={1}>
                  <Link href="/privacy" style={{ textDecoration: "none" }}>
                    <Typography variant="h5" color="#394a59">
                      {" "}
                      Privacy Statement
                    </Typography>
                  </Link>
                  <Link href="/terms" style={{ textDecoration: "none" }}>
                    <Typography variant="h5" color="#394a59">
                      {" "}
                      Terms of Service
                    </Typography>
                  </Link>
                  <Link href="/cancellation" style={{ textDecoration: "none" }}>
                    <Typography variant="h5" color="#394a59">
                      Cancellation and Refund Policy
                    </Typography>
                  </Link>
                  <Link href="/contact" style={{ textDecoration: "none" }}>
                    <Typography variant="h5" color="#394a59">
                      Contact us
                    </Typography>
                  </Link>
                </Stack>
              </Box>
              <Box>
                <Typography variant="h5" color="#394a59">
                  Find us on
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Box
                    width={{ xs: "65px", sm: "70px", md: "90px", lg: "100px" }}
                  >
                    <a
                      href="https://instagram.com/kalibre.ai?igshid=MWQ1ZGUxMzBkMA=="
                      target="_blank"
                    >
                      <img src={INSTAGRAM_LOGO} alt="instagram" width="100%" />
                    </a>
                  </Box>
                  <Box
                    width={{ xs: "65px", sm: "70px", md: "90px", lg: "100px" }}
                  >
                    <a
                      href="https://www.facebook.com/kalibreai"
                      target="_blank"
                    >
                      <img src={FACEBOOK_LOGO} alt="facebook" width="100%" />
                    </a>
                  </Box>
                  <Box
                    width={{ xs: "65px", sm: "70px", md: "90px", lg: "100px" }}
                  >
                    <a
                      href="https://www.linkedin.com/company/kalibreai/"
                      target="_blank"
                    >
                      <img src={LINKEDIN_LOGO} alt="linkedin" width="100%" />
                    </a>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
