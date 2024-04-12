"use client";

import { getFlagEmoji, isArrayIterable } from "@/utils/CustomFunctions";
import { Box, Divider, Stack, Typography } from "@mui/material";

const WorkType = ({ kind }) => {
  return (
    <>
      <Stack direction="row">
        {isArrayIterable(kind) &&
          kind?.map((data, idx) => {
            return <Typography key={idx}>{data?.type}</Typography>;
          })}
      </Stack>
    </>
  );
};

const CityData = ({ city }) => {
  // console.log("city==", city);

  return (
    <>
      <Stack>
        {isArrayIterable(city) &&
          city?.map((data, idx) => {
            return (
              <Stack
                direction="row"
                key={idx}
                spacing={1}
                divider={
                  <Divider orientation="vertical" variant="middle" flexItem />
                }
              >
                <Typography>{data?.city_name}</Typography>
                <WorkType kind={data?.kind} />
              </Stack>
            );
          })}
      </Stack>
    </>
  );
};

function LocationView({ list }) {
  // console.log("location list =====", list);

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        {isArrayIterable(list) &&
          list?.map((data, idx) => {
            return (
              <Box key={idx}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h5">
                    {getFlagEmoji(data?.country_flag)}
                  </Typography>
                  <CityData city={data?.city} />
                </Stack>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
}

export default LocationView;
