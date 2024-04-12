"use client";

import { TABS_DATA } from "@/constants/TextConstants";
import { Icon } from "@iconify/react";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

const style = {
  padding: "2rem",
  borderRadius: "0px 0px 18px 18px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "right",
  width: "90%",
  maxWidth: "1200px",
  margin: "0 auto",
  height: "350px",
};

import React, { useState } from "react";

function ClientTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [...TABS_DATA];

  return (
    <Box mt={5} mb={5}>
      <Container maxWidth="xl">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Speedy" value={0} />
          <Tab label="Smart" value={1} />
          <Tab label="Simple" value={2} />
          <Tab label="Sensible" value={3} />
        </Tabs>
        <Box
          sx={{
            ...style,
            backgroundImage: `url(${tabs[value].bgImage})`,
          }}
        >
          {tabs[value].list?.map((data, idx) => {
            return (
              <List key={idx}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ marginBottom: "-25px" }}
                >
                  <ListItemAvatar sx={{ marginRight: "-26px" }}>
                    <Icon icon="ph:star-four-fill" width={18} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="h5">{data}</Typography>}
                  />
                </ListItem>
              </List>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default ClientTabs;
