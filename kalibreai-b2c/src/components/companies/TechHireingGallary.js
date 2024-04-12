"use client";

import {
  AI_BASED_AUTO_MATCHING,
  AI_BASED_AUTO_MOBILE_MATCHING_IMAGE,
  AUTOMATED_RESUME_PARSING,
  CANDIDATE_PIPLINES,
  EXPERT_INTERVIEWER_MOBILE_NETWORK_IMAGE,
  EXPERT_INTERVIEWER_NETWORK,
  INTERVIEW_PLATFORM,
  INTERVIEW_TAB_VIEW_PLATFORM,
  INTERVIEW_TAB_VIEW_PLATFORM_IMAGE,
  INTERVIEW_TEMPLATES,
  MULTI_JOB_BOARD_POSTING,
  PRE_VETTED_CAND_IMAGE,
  PRE_VETTED_MOBILE_CAND_IMAGE,
  SCREENING_BOT,
  SMART_INTERVIEW_SHEDULAR,
  VIRTUAL_MOBILE_TABLES_IMAGE,
  VIRTUAL_TABLES,
} from "@/constants/MediaConstants";
import { START_HIRING_BUTTON_STRING } from "@/constants/TextConstants";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
function TechHireingGallary() {
  const router = useRouter();
  const isMobileView = useMediaQuery("(max-width:600px)");
  const isTabView = useMediaQuery("(max-width:900px)");
  return (
    <Box mt={10} margin="auto">
      <Container maxWidth="xl" >
        <Grid container spacing={6} mb={6}>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <Box>
                <img
                  src={
                    isMobileView
                      ? PRE_VETTED_MOBILE_CAND_IMAGE
                      : PRE_VETTED_CAND_IMAGE
                  }
                  alt="Kalibre Companies Pre-Vetted Candidates"
                  width="100%"
                />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  Pre Vetted Candidates
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  Explore top rated candidates screened and interviewed by
                  domain experts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Box>
                <img src={INTERVIEW_TEMPLATES} width="100%" />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  Interview Templates
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  Replicate structured Interviews, with vetted expert interview
                  templates, from top companies.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
       
          <Grid item  xs={12} sm={6} md={4}>
            <Card>
              <Box>
                <img
                  src={MULTI_JOB_BOARD_POSTING}
                  alt="Kalibre Companies Pre-Vetted Candidates"
                  width="100%"
                />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  Multi Job Board Posting
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  Source candidates from multiple portals with just a single
                  posting on our platform.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <Box>
                <img
                  src={
                    isMobileView ? VIRTUAL_MOBILE_TABLES_IMAGE : VIRTUAL_TABLES
                  }
                  width="100%"
                />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  Hyper Sync Tables
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  Power of ATS with the ease of excel sheet.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
       
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Box>
                <img
                  src={
                    isMobileView
                      ? EXPERT_INTERVIEWER_MOBILE_NETWORK_IMAGE
                      : EXPERT_INTERVIEWER_NETWORK
                  }
                  alt="Kalibre Companies Pre-Vetted Candidates"
                  width="100%"
                />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  Expert Interviewer Network
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  Get on demand experts from any domain to any company size.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Box>
                <img src={SMART_INTERVIEW_SHEDULAR} width="100%" />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  Smart Interview Schedular
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  Eliminate confusions, follow ups and missed schedules with our
                  smart interview scheduler.{" "}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Card>
              <Box>
                <img src={isMobileView?AI_BASED_AUTO_MOBILE_MATCHING_IMAGE:isTabView?AI_BASED_AUTO_MATCHING:SCREENING_BOT} width="100%" />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  {isTabView?" AI Based Auto Matching":"Screening Bot"}
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  {isTabView?"Match the perfect role to the perfect candidate using ai based models with 30+ data points.":"Automated chatbot collects missing info, no more follow-up calls."}
                      
                  
                </Typography>
              </CardContent>
            </Card>
          </Grid>
       
          <Grid item xs={12} sm={6} md={8}>
            <Card>
              <Box>
                <img
                  src={
                    isTabView
                      ? SCREENING_BOT
                      : AI_BASED_AUTO_MATCHING
                      
                  }
                  alt="Kalibre Companies Pre-Vetted Candidates"
                  width="100%"
                />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  {isTabView ? "Screening Bot":"AI Based Auto Matching"}
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                 {
                  isTabView?" Automated chatbot collects missing info, no more follow-up calls.":"Match the perfect role to the perfect candidate using ai based models with 30+ data points."
                  
                 }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Box>
                <img src={CANDIDATE_PIPLINES} width="100%" />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  Candidate Pipelines
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  Never run out of candidates again with our ever-active
                  candidate pipelines.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
       
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <Box>
                <img
                  src={isTabView?INTERVIEW_TAB_VIEW_PLATFORM_IMAGE:AUTOMATED_RESUME_PARSING}
                  alt="Kalibre Companies Pre-Vetted Candidates"
                  width="100%"
                />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500}>
                  {isTabView?"Interview Platform":"Automated Resume Parsing"}
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  {isTabView?"Standardize your interviews with transparency and clarity- interview recordings, transcript, feedback and summary.":"Say Goodbye to Resume Overload – Save Time with Data-Rich Candidate Profiles!"}
                 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Card>
              <Box>
                <img src={isTabView?AUTOMATED_RESUME_PARSING:INTERVIEW_PLATFORM} width="100%" />
              </Box>
              <CardContent>
                <Typography variant="h4" fontWeight={500} mt={4}>
                  {isTabView?"Automated Resume Parsing":"Interview Platform"}
                </Typography>
                <Typography variant="h5" mt={1} fontWeight={400}>
                  {
                    isTabView?"Say Goodbye to Resume Overload – Save Time with Data-Rich Candidate Profiles!":"Standardize your interviews with transparency and clarity - interview recordings, transcript, feedback and summary."
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card sx={{ padding: "1rem" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h1">Rev up your Tech hiring</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/waitlist");
                }}
              >
                {START_HIRING_BUTTON_STRING}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default TechHireingGallary;
