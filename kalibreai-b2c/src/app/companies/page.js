"use Client";

import BubbleCarousel from "@/components/companies/BubbleCarousel";
import ClientHero from "@/components/companies/ClientHero";
import ClientTabs from "@/components/companies/ClientTabs";
import InfiniteCarousel from "@/components/companies/InfiniteCarousel";
import SkillCarousel from "@/components/companies/SkillCarousel";
import TechHireingGallary from "@/components/companies/TechHireingGallary";
import { TECH_GROWTH } from "@/constants/MediaConstants";
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
} from "@mui/material";

function page() {
  return (
    <Box width={"100%"}>
      <Box sx={{ marginTop: "70px" }}>
        <ClientHero />
      </Box>

      <Box mt={4}>
        <Typography variant="h2" textAlign="center" mb={4}>
          100s of tech companies are hiring on Kalibre
        </Typography>
        <InfiniteCarousel />
      </Box>
      <Box mt={15} textAlign="center" >
        <Box display={"flex"} flexWrap={"wrap"}>
          <Typography variant="h1" width={500} margin="auto">
            The secret sauce: How we nail the perfect match
          </Typography>
        </Box>
        <ClientTabs />
      </Box>
      <Box mt={15} textAlign="center">
        <Box display={"flex"} flexWrap={"wrap"}>
          <Typography variant="h1" width={600} margin="auto">
            Perpetually building the ultimate Tech talent pool..
          </Typography>
        </Box>
        <SkillCarousel />
      </Box>
      <Box mt={15} display={"flex"} flexWrap={"wrap"}>
        <Typography variant="h1" width={600} margin="auto">
          All-in-one Tech hiring solution
        </Typography>
        <TechHireingGallary />
      </Box>

      <Box>
        <BubbleCarousel />
      </Box>

      <Box mb={35}>
        <Container maxWidth="xl">
          <Box
            sx={{
              background:
                "linear-gradient(180deg, rgba(238, 238, 255, 0.60) 0%, rgba(238, 252, 253, 0.60) 100%)",
              borderRadius: "20px",
              padding: "2rem 4rem",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Grid container spacing={10}>
              <Grid item md={6}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="start"
                  height="100%"
                  spacing={6}
                >
                  <Typography
                    variant="h1"
                    fontWeight={400}
                  >
                    100+ Companies hyper growing through Kalibre
                  </Typography>
                  <Typography
                    variant="h4"
                    mt={2}
                    display={"flex"}
                    flexWrap={"wrap"}
                  >
                    From innovative startups to global tech titans, hundreds of
                    companies are using Kalibre to scale their tech teams.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={6}>
                <img
                  src={TECH_GROWTH}
                  alt="Thech growth"
                  style={{ width: "100%", marginTop: "2rem" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default page;
