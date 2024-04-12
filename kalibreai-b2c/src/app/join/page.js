"use client";

import LoginLayout from "@/components/joinPage/LoginLayout";
import {
  ADOBE_CMP,
  AMAZON_CMP,
  EXPEDIA_CMP,
  GOOGLE_CMP,
  KALIBRE_TITLE,
  LINKEDIN_CMP,
  INFINITY_META_CMP,
  MICROSOFT_CMP,
  NVIDIA_CMP,
  RAZORPAY_CMP,
  SWIGGY_CMP,
} from "@/constants/MediaConstants";
import styled from "@emotion/styled";
import { Box, Grid, Stack, Typography } from "@mui/material";

const RightParentBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  height: "100vh",
  width: "100%",
  padding: "14rem 10rem",
  textAlign: "center",
  "@media (max-width:1200px)": {
    padding: "4rem  10rem",
    height: "90vh",
  },
  "@media (max-width:600px)": {
    padding: "2rem  3rem",
    height: "90vh",
  },
}));

const LeftParentBox = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  padding: "5rem",
  "@media (max-width:1200px)": {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    height: "35vh",
    borderRadius: "30px 30px 0px 0px",
    paddingTop: "20px",
  },
  "@media (max-width:900px)": {
    height: "30vh",
  },
  "@media (max-width:600px)": {
    height: "30vh",
    padding: "26px",
  },
}));

const CompaniesLogo = [
  NVIDIA_CMP,
  SWIGGY_CMP,
  EXPEDIA_CMP,
  AMAZON_CMP,
  GOOGLE_CMP,
  LINKEDIN_CMP,
  ADOBE_CMP,
  RAZORPAY_CMP,
  INFINITY_META_CMP,
  MICROSOFT_CMP,
];

function page() {
  return (
    <Box sx={{}}>
      <Stack
        direction={{ xs: "column-reverse", sm: "column", lg: "row" }}
        sx={{ position: "relative" }}
      >
        <LeftParentBox>
          <Box
            sx={{
              width: "180px",
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
          >
            <img src={KALIBRE_TITLE} style={{ maxWidth: "100%" }} />
          </Box>
          <Box marginTop={{ xs: 0, sm: 0, md: 0, lg: 10 }}>
            <LoginLayout />
          </Box>
        </LeftParentBox>
        <RightParentBox>
          <Stack
            direction="column"
            justifyContent={{ xs: "start", lg: "space-between" }}
            spacing={{ xs: 10, sm: 8, md: 10 }}
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <Box>
              <Typography variant="h1" mb={3}>
                Your Potential, Their Priority! 🌟
              </Typography>
              <Typography variant="h2">
                Over 500 Companies Awaiting Your Talent! Let's Complete Your
                Profile Together! 🚀
              </Typography>
            </Box>
            <Box>
              <Stack
                direction="row"
                spacing={0.5}
                flexWrap="wrap"
                gap={1}
                justifyContent="center"
              >
                {CompaniesLogo?.map((data, idx) => {
                  return (
                    <Box
                      key={idx}
                      sx={{ width: { xs: "70px", sm: "100px", md: "120px" } }}
                    >
                      <img src={data} style={{ maxWidth: "100%" }} />
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </RightParentBox>
      </Stack>
    </Box>
  );
}

export default page;
