import { Box, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

function WorkTypeLocation(props) {
  const { data} = props;


  return (
    <Box>
      <Stack direction="row" spacing={0.8}>
        {data?.workType?.includes("office") && (
          <Icon icon="fluent:building-24-regular" width={20} color="#5b4988" />
        )}
        {data?.workType?.includes("hybrid") && (
          <Icon
            icon="fluent:building-home-16-regular"
            width={20}
            color="#5b4988"
          />
        )}

        {data?.workType?.includes("remote") && (
          <Icon icon="fluent:home-16-regular" width={20} color="#5b4988" />
        )}
        <Typography variant="h6" color="#644ed4">
          {data?.name}
        </Typography>
       
      </Stack>
    </Box>
  );
}

export default WorkTypeLocation;
