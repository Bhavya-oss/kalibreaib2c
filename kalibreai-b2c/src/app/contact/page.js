import ContactForm from "@/components/contact/ContactForm";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function page() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ marginTop: "150px", marginBottom: "50px" }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
            <Box>
              <Typography variant="h1" textAlign="center">
                Love to hear from you, Get in touch
              </Typography>

              <Box>
                <ContactForm />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
            <Stack
              direction={{ xs: "column", sm: "row", md: "row", lg: "column" }}
              spacing={4}
              justifyContent="center"
              alignItems="start"
              mt={{xs:1,lg:20}}
            >
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="start"
                  justifyContent="center"
                >
                  <Box sx={{ padding: "5px" }}>
                    <LocalPhoneOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography variant="h3">Call us</Typography>
                    <Typography variant="h5">9483225221</Typography>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="start"
                  justifyContent="center"
                >
                  <Box sx={{ padding: "3px" }}>
                    <EmailOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography variant="h3">Email us</Typography>
                    <Typography variant="h4" mt={2} fontWeight={500}>
                      For anything related to Jobs/Careers
                    </Typography>
                    <Typography variant="h5" fontWeight={400}>
                      jobs@kalibre.ai
                    </Typography>
                    <Typography variant="h4" mt={2} fontWeight={500}>
                      For all other things
                    </Typography>
                    <Typography variant="h5" fontWeight={400}>
                      hello@kalibre.ai
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="start"
                  justifyContent="center"
                >
                  <Box sx={{ padding: "3px" }}>
                    <LocationOnOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography variant="h3">Location</Typography>
                    <Typography variant="h4" fontWeight={400}>
                      1st Floor, 247, JCK Industrial Park,
                      <br />
                      Hebbal,Belagola Post Mysuru,
                      <br />
                      Mysuru, Karnataka, 570016
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default page;
