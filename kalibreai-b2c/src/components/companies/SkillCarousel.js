"use client";

import { getCandCountPerSkill } from "@/app/api/ApiHandlers";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const Content_Slide_left = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "6rem",
  animation: "15s slide infinite linear",
  "@keyframes carousel": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-100%)" }
  },
}));

const Content_Slide_Right = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "6rem",
  animation: "15s slidel infinite linear",
  "@keyframes slidel": {
    from: {
      transform: "translateX(-100%)",
    },
    to: {
      transform: "translateX(0)",
    },
  },
}));

const Contents = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  padding: "20px 0",
  whiteSpace: "nowrap",
}));

function SkillCarousel() {
  const [skillData, setSkillsData] = useState([]);

  useEffect(() => {
    getSkillsCarouselData();
  }, []);

  const getSkillsCarouselData = async () => {
    const response = await getCandCountPerSkill();

    setSkillsData(response);
  };

  console.log("skills data =====", skillData);
  return (
    <Box mt={5}>
      <Box>
        <Contents>
          <Content_Slide_left>
            {skillData?.map((data, idx) => {
              return (
                <Box>
                  <Card
                    sx={{
                      borderRadius: "20px",
                      padding: ".2rem 2rem",
                      boxShadow: "0px 4px 8px 0px rgba(47, 43, 67, 0.10)",
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                      >
                        <Box>
                          <img
                            src={data?.skill_logo}
                            alt={data?.skill_name}
                            style={{ filter: "grayscale(1)", width: "64px" }}
                          />
                        </Box>
                        <Stack
                          direction="column"
                          spacing={0.5}
                          justifyContent="center"
                          alignItems="start"
                        >
                          <Typography
                            variant="h6"
                            color="#232323"
                            whiteSpace="nowrap"
                          >
                            {data?.skill_name}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="baseline"
                          >
                            <Typography variant="h5" color="#5fd062">
                              {data?.job_count}
                            </Typography>
                            <Typography variant="h6" color="#a7afbc">
                              added
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Content_Slide_left>
        </Contents>
      </Box>

      <Box >
        <Contents>
          <Content_Slide_Right>
            {skillData?.map((data, idx) => {
              return (
                <Box>
                  <Card
                    sx={{
                      borderRadius: "20px",
                      padding: ".2rem 2rem",
                      boxShadow: "0px 4px 8px 0px rgba(47, 43, 67, 0.10)",
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                      >
                        <Box>
                          <img
                            src={data?.skill_logo}
                            alt={data?.skill_name}
                            style={{ filter: "grayscale(1)", width: "64px" }}
                          />
                        </Box>
                        <Stack
                          direction="column"
                          spacing={0.5}
                          justifyContent="center"
                          alignItems="start"
                        >
                          <Typography
                            variant="h6"
                            color="#232323"
                            whiteSpace="nowrap"
                          >
                            {data?.skill_name}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="baseline"
                          >
                            <Typography variant="h5" color="#5fd062">
                              {data?.job_count}
                            </Typography>
                            <Typography variant="h6" color="#a7afbc">
                              added
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Content_Slide_Right>
        </Contents>
      </Box>
    </Box>
  );
}

export default SkillCarousel;
