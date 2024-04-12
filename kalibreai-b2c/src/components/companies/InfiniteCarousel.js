"use client";

import { CompaniesLogo } from "@/constants/MediaConstants";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

const Content_Slide = styled(Box)(({ theme }) => ({
  display: "inline-block",
  animation: "25s slide infinite linear",
  "@keyframes slide": {
    from: {
      transform: "translateX(0)",
    },
    to: {
      transform: "translateX(-100%)",
    },
  },
}));

const Contents = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  padding: "20px 0",
  whiteSpace: "nowrap",
}));

function InfiniteCarousel() {

  return (
    <>
      <Contents>
        <Content_Slide>
          {CompaniesLogo?.map((data, idx) => (
            <img
              src={data.logo}
              key={idx}
              alt={data.alt}
              style={{ margin: "0 3rem" }}
            />
          ))}
        </Content_Slide>

        <Content_Slide>
          {CompaniesLogo?.map((data, idx) => (
            <img
              src={data.logo}
              key={idx}
              alt={data.alt}
              style={{ margin: "0 3rem" }}
            />
          ))}
        </Content_Slide>
      </Contents>
    </>
  );
}

export default InfiniteCarousel;
