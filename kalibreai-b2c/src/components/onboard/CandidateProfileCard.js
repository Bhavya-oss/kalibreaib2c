import { ONBOARD_PROFILE_IMAGE } from "@/constants/MediaConstants";
import {
  capitalizeFirstLetter,
  formateAvailability,
  formateExperience,
  formateWorkTypeLocation,
  getInitialLetter,
  getJobStatusColor,
  isArrayIterable,
} from "@/utils/CustomFunctions";
import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import WorkTypeLocation from "./WorkTypeLocation";

const style = {
  height: "100vh",
  width: "100%",
  padding: "20px",
};

const GradientLine = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(270deg,rgba(255, 255, 255, 0) -9.08%, #e3ceec 49.36%,rgba(255, 255, 255, 0) 113.95% )",
  height: "2px",
  width: "95%",
  margin: "auto",
}));

function CandidateProfileCard(props) {
  const {
    pageNum,
    name,
    photo,
    total_experience,
    current_role,
    fresher,
    current_location,
    job_seakers_status,
    preferred_roles,
    p_tech_skills,
    expected_ctc_as_per_company_standards,
    expected_ctc,
    is_immediate_joiny,
    notice_period,
    date_of_joining,
    resigned,
    bootstrapped_or_funded,
    mnc_or_startup,
    product_or_service,
    location_work_type,
  } = props;

  const IntialLetter = getInitialLetter(name);

  // console.log("candidate profile page number ===",pageNum)
  // console.log("candidate profile data ===",name)

  return (
    <>
      <Box
        sx={{
          ...style,

          background:
            pageNum === 8
              ? "transparent"
              : "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        }}
      >
        {pageNum === 0 ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                marginTop: "4rem",
                color: "#614ad3",
              }}
            >
              Let's co-create your profile With our AI.
            </Typography>

            <Box>
              <img src={ONBOARD_PROFILE_IMAGE} style={{ maxWidth: "100%" }} />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              padding: "6rem 1rem",
              "@media (min-width: 1500px)": {
                padding: "5rem  8rem",
              },
            }}
          >
            <Paper sx={{ padding: "2rem", borderRadius: "14px" }}>
              <Box
                sx={{
                  minHeight: "130px",
                  backgroundColor: "#ede3ff",
                  borderRadius: "12px",
                  padding: "15px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                >
                  <Stack direction="row" spacing={2} alignItems="start">
                    <Box>
                      <Avatar
                        sx={{ width: "70px", height: "70px" }}
                        src={photo}
                      >
                        {IntialLetter}
                      </Avatar>
                    </Box>
                    <Box>
                      <Typography variant="h2" color="#614ad3" mb={0.7}>
                        {name && capitalizeFirstLetter(name)}
                      </Typography>
                      <Typography variant="h4" color="#614ad3" mb={-0.5}>
                        {formateExperience(
                          total_experience,
                          current_role,
                          fresher
                        )}
                      </Typography>
                      <Typography variant="h5" color="#614ad3">
                        {current_location?.name}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={getJobStatusColor(job_seakers_status)}>
                    <Typography>
                      {capitalizeFirstLetter(job_seakers_status)}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <fieldset
                  style={{
                    marginTop: "20px",
                    borderRadius: "10px",
                    border: "2px solid #ede3ff",
                    padding: "0 20px",
                  }}
                >
                  <legend
                    style={{
                      color: "#9ea2ff",
                      padding: "0 5px",
                      marginLeft: "8px",
                    }}
                  >
                    Prefferred role
                  </legend>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="start"
                    flexWrap="wrap"
                    gap={1}
                    sx={{
                      minHeight: "60px",
                    }}
                  >
                    {preferred_roles?.map((data, idx) => {
                      return (
                        <Chip
                          key={idx}
                          label={
                            <Typography variant="h5">{data.name}</Typography>
                          }
                          sx={{ backgroundColor: "#f4f2fb", color: "#614ad3" }}
                        />
                      );
                    })}
                  </Stack>
                </fieldset>
              </Box>

              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ minHeight: "60px", margin: "5px 0" }}
                  justifyContent="center"
                  flexWrap="wrap"
                  gap={1}
                >
                  {p_tech_skills?.map((data, idx) => {
                    return (
                      <Chip
                        avatar={
                          data?.active && (
                            <Avatar alt="Natacha" src={data?.active} />
                          )
                        }
                        key={idx}
                        label={
                          <Typography variant="h6">{data.name}</Typography>
                        }
                        sx={{ color: "#614ad3", borderColor: "#9ea2ff" }}
                        variant="outlined"
                      />
                    );
                  })}
                </Stack>
              </Box>

              <GradientLine />

              <Box>
                <fieldset
                  style={{
                    marginTop: "20px",
                    borderRadius: "10px",
                    border: "2px solid #ede3ff",
                  }}
                >
                  <legend
                    style={{
                      color: "#9ea2ff",
                      padding: "0 5px",
                      marginLeft: "8px",
                    }}
                  >
                    Job location
                  </legend>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    gap={0.5}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      minHeight: "100px",
                      padding: "10px",
                      maxHeight: "130px",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    {location_work_type?.map((data, idx, array) => {
                      return (
                        <>
                          <Box key={idx}>
                            <WorkTypeLocation data={data} />
                          </Box>

                          {idx < array?.length - 1 && (
                            <Box>
                              <Divider
                                orientation="vertical"
                                variant="fullWidth"
                                flexItem
                                sx={{
                                  background: "#d2ccff",
                                  width: "2px",
                                  height: "25px",
                                }}
                              />
                            </Box>
                          )}
                        </>
                      );
                    })}
                  </Stack>
                </fieldset>
              </Box>

              <Box>
                <fieldset
                  style={{
                    marginTop: "20px",
                    borderRadius: "10px",
                    border: "2px solid #ede3ff",
                  }}
                >
                  <legend
                    style={{
                      color: "#9ea2ff",
                      padding: "0 5px",
                      marginLeft: "8px",
                    }}
                  >
                    Job preferences
                  </legend>
                  <Stack
                    direction="column"
                    spacing={2}
                    sx={{ padding: "10px", minHeight: "170px" }}
                  >
                    <Box>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ minHeight: "40px", paddingLeft: "1rem" }}
                      >
                        {(expected_ctc_as_per_company_standards ||
                          expected_ctc != 0) && (
                          <Chip
                            icon={
                              <Icon
                                icon="fluent:money-hand-24-regular"
                                width={25}
                                height={25}
                                color="#614ad3"
                              />
                            }
                            label={
                              <Typography variant="h6">{`${
                                expected_ctc_as_per_company_standards
                                  ? "Flexible"
                                  : expected_ctc + " Lpa"
                              }`}</Typography>
                            }
                            sx={{ color: "#614ad3", borderColor: "#9ea2ff" }}
                            variant="outlined"
                          />
                        )}
                        {(date_of_joining || notice_period) && (
                          <Chip
                            icon={
                              <Icon
                                icon="mdi:exit-run"
                                width={25}
                                height={25}
                                color="#614ad3"
                              />
                            }
                            label={
                              <Typography variant="h6">
                                {formateAvailability(
                                  fresher,
                                  is_immediate_joiny,
                                  date_of_joining,
                                  resigned,
                                  notice_period
                                )}
                              </Typography>
                            }
                            sx={{ color: "#614ad3", borderColor: "#9ea2ff" }}
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>

                    <GradientLine />

                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      <Stack
                        direction="row"
                        spacing={2}
                        flexWrap="wrap"
                        gap={2}
                      >
                        {isArrayIterable(bootstrapped_or_funded) && (
                          <Chip
                            label={
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Typography variant="h5">
                                  {bootstrapped_or_funded[0]}
                                </Typography>
                                {bootstrapped_or_funded[1] && (
                                  <Typography variant="h5">•</Typography>
                                )}
                                <Typography variant="h5">
                                  {bootstrapped_or_funded[1]}
                                </Typography>
                              </Stack>
                            }
                            sx={{
                              backgroundColor: "#f4f2fb",
                              color: "#614ad3",
                            }}
                          />
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={2}
                        flexWrap="wrap"
                        gap={2}
                      >
                        {isArrayIterable(product_or_service) && (
                          <Chip
                            label={
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Typography variant="h5">
                                  {product_or_service[0]}
                                </Typography>
                                {product_or_service[1] && (
                                  <Typography variant="h5">•</Typography>
                                )}
                                <Typography variant="h5">
                                  {product_or_service[1]}
                                </Typography>
                              </Stack>
                            }
                            sx={{
                              backgroundColor: "#f4f2fb",
                              color: "#614ad3",
                            }}
                          />
                        )}
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={2}
                        flexWrap="wrap"
                        gap={2}
                      >
                        {isArrayIterable(mnc_or_startup) && (
                          <Chip
                            label={
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                              >
                                <Typography variant="h5">
                                  {mnc_or_startup[0]}
                                </Typography>
                                {mnc_or_startup[1] && (
                                  <Typography variant="h5">•</Typography>
                                )}
                                <Typography variant="h5">
                                  {mnc_or_startup[1]}
                                </Typography>
                              </Stack>
                            }
                            sx={{
                              backgroundColor: "#f4f2fb",
                              color: "#614ad3",
                            }}
                          />
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </fieldset>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </>
  );
}

export default CandidateProfileCard;
