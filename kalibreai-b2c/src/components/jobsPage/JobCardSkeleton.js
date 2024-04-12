import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";


const style = {
  xs:220,
  sm:400,
  md:400,
  lg:500,
  xl:550
}

function JobCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={3}>
          <Box>
            <Skeleton
              variant="squre"
              width={40}
              height={40}
              sx={{ borderRadius: "10px", marginTop: "8px" }}
            />
          </Box>
          <Stack direction="column" spacing={1}>
            <Box>
              <Typography variant="h1" 
              width={{
                xs:280,
                sm:500,
                md:500,
                lg:650,
                xl:700
              }} 
              
              >
                <Skeleton />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" width={style}>
                <Skeleton />
              </Typography>
              <Typography variant="h6" width={style}>
                <Skeleton />
              </Typography>
              <Typography variant="h6" width={style}>
                <Skeleton />
              </Typography>
              <Typography variant="h6" width={style}>
                <Skeleton />
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default JobCardSkeleton;
