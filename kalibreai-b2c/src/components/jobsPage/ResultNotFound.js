import { NOT_FOUND_IMAGE } from "@/constants/MediaConstants";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

function ResultNotFound() {
  return (
    <Box>
      <Card sx={{ textAlign: "center" }}>
        <CardHeader
          title={<Typography variant="h5">No results found</Typography>}
        />
        <CardContent>
          <img src={NOT_FOUND_IMAGE} />
        </CardContent>
        <CardActions>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Typography variant="h4">No matching jobs found</Typography>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ResultNotFound;
