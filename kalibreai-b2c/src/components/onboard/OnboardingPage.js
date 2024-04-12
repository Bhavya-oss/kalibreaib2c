"use client";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CandidateProfileCard from "./CandidateProfileCard";
import { KALIBRE_TITLE } from "@/constants/MediaConstants";
import OnboardingFooter from "./OnboardingFooter";
import { useForm } from "react-hook-form";
import GetDynamicField from "./GetDynamicField";
import { intilData, updateOnboarding } from "@/app/api/ApiHandlers";
import {
  BACK_BUTTON_STRING,
  EXPLORE_JOBS_STRING,
} from "@/constants/TextConstants";
import { useRouter } from "next/navigation";
import { formateOnboardValues } from "@/utils/CustomFunctions";

const leftLayout = {
  padding: "2rem",
  height: "100vh",
  overflow: "hidden",
  "@media (max-width:1200px)": {
    padding: "3rem",
    height: "90vh",

  },
  "@media (max-width:600px)": {
    padding: "1.5rem",
  },

  //   position: "relative",
};

function OnboardingPage(props) {
  const { pageData, pageNum, onBoardDispatch, onBoardData } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    control,
    clearErrors,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      total_experience: 1,
      expected_ctc: 0,
      current_ctc: 0,
    },
  });

  const router = useRouter();
  const [localStoreInfo, setLocalStoreInfo] = useState();


  // //localstorage information
  // const localStorageInfo = localStorage?.getItem("info");

  // // parsing the information
  // const USER_INFO = JSON.parse(localStorageInfo);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //localstorage information
      const localStorageInfo = localStorage?.getItem("info");
      // parsing the information
      const USER_INFO = JSON.parse(localStorageInfo);
      setLocalStoreInfo(USER_INFO);
    }
  }, []);


  const backPage = useCallback(() => {
    const data = { type: "pageNum", payload: pageNum - 1 };

    if (pageNum != 0) {
      onBoardDispatch(data);
    }
  }, [pageNum]);

  const submit = useCallback(() => {
    const manipulatedData = formateOnboardValues(onBoardData);

    manipulatedData.screening = true;

    const tempData = {
      phone_number: localStoreInfo?.phone_number,
      onboarddatas: {
        fields: manipulatedData,
        onboarding_page_num: 8,
      },
    };

    updateOnboarding(tempData);

    router.push("/");
  }, [onBoardData,localStoreInfo]);

  return (
    <>
      <Box>
        <Grid
          container
          sx={{
            background:
              pageNum === 8
                ? "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"
                : null,
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Box sx={leftLayout}>
              {pageNum != 8 ? (
                <>
                  <Box sx={{ width: "150px" }}>
                    <img src={KALIBRE_TITLE} style={{ maxWidth: "100%" }} />
                  </Box>
                  <Box sx={{ marginTop: "2.5rem" }}>
                    <Typography variant={pageNum === 0 ? "h1" : "h3"}>
                      {pageData?.heading}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "18px", marginTop: "1rem" }}
                    >
                      {pageData?.paragraph}
                    </Typography>
                  </Box>

                  <Box sx={{ marginTop: "2rem" }}>
                    <GetDynamicField
                      fields={pageData?.fields}
                      errors={errors}
                      register={register}
                      onBoardData={onBoardData}
                      onBoardDispatch={onBoardDispatch}
                      control={control}
                      clearErrors={clearErrors}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: "fixed",
                      bottom: "20px",
                      width: { xs: "98%", sm: "90%", md: "92%", lg: "45%" },
                      marginLeft: { xs: "-20px", sm: "0px" },
                    }}
                  >
                    <OnboardingFooter
                      pageNum={pageNum}
                      onBoardDispatch={onBoardDispatch}
                      handleSubmit={handleSubmit}
                      onBoardData={onBoardData}
                      reset={reset}
                      isChanged={dirtyFields}
                      setValue={setValue}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "80%" }}
                  >
                    <Box sx={{ padding: "4rem" }}>
                      <Typography variant="h1" color="#fff">
                        Your Profile is Complete! 🌟
                      </Typography>

                      <Typography variant="h4" mt={1} color="#fff">
                        We have sent your information to over 50+ leading
                        companies in your field. Your skills and expertise are
                        now in the hands of potential employers.
                      </Typography>

                      <Stack direction="row" spacing={2} mt={3}>
                        <Button onClick={backPage} variant="outlined">
                          {BACK_BUTTON_STRING}
                        </Button>
                        <Button onClick={submit} variant="contained">
                          {EXPLORE_JOBS_STRING}
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "block",
                  xl: "block",
                },
              }}
            >
              <CandidateProfileCard pageNum={pageNum} {...onBoardData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default OnboardingPage;
