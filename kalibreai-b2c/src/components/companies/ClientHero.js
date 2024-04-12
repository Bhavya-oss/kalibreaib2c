"use client";

import {
  CLIENT_MOBILE_HERO,
  LG_SCREEN_HERO_IMAGE,
} from "@/constants/MediaConstants";
import { START_HIRING_BUTTON_STRING } from "@/constants/TextConstants";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Hero_Wrraper = styled(Box)(({ theme }) => ({}));

function ClientHero() {
  const [size, setSize] = useState();

  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const isTab = useMediaQuery("(min-width:501px) and (max-width:810px)");
  const isGreaterTab = useMediaQuery(
    "(min-width: 900px) and (max-width: 1200px)"
  );
  const isBeforeDesktop = useMediaQuery(
    "(min-width: 1200px) and (max-width: 1500px)"
  );
  const isDeskTop = useMediaQuery("(min-width:1500px)");

  console.log("jdhbjhdfvjh", isMobile, isTab);

  useEffect(() => {
    // let win = window.innerWidth;
    let win = window.innerHeight;

    console.log("asd  width ==", win);

    setSize(win);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundImage: `url(${
            isTab || isMobile ? CLIENT_MOBILE_HERO : LG_SCREEN_HERO_IMAGE
          })`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: !isTab || (isMobile && "center"),
          backgroundSize: "100% auto",
          position: "relative",
          // border: "1px solid black",
        }}
      >
        {/* <h1>{size}</h1> */}
        <Stack
          direction="row"
          display={"flex"}
          justifyContent="center"
          alignItems={isTab ? "end" : "center"}
          height="100%"
          // border={"1px solid blue"}
        >
          <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Card
              className="card"
              sx={{
                padding: "1rem 0",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <CardContent>
                <div class="wrapper">
                  <div class="static-txt">Put your tech</div>
                  <ul class="dynamic-txts">
                    <li>
                      <span>sourcing</span>
                    </li>
                    <li>
                      <span>screening</span>
                    </li>
                    <li>
                      <span>interviewing</span>
                    </li>
                    <li>
                      <span>hiring</span>
                    </li>
                  </ul>
                </div>
                <div class="static-txts">on auto-pilot</div>
              </CardContent>
            </Card>

            <Typography variant="h2" mt={4} color="#6c6c6b">
              Hire better <span style={{ margin: "0 5px" }}>🌟</span> smarter{" "}
              <span style={{ margin: "0 5px" }}>🤖 </span> faster ⚡
            </Typography>
            <Box mt={5}>
              <Button
                onClick={() => {
                  router.push("/waitlist");
                }}
                variant="contained"
                size="large"
              >
                {START_HIRING_BUTTON_STRING}
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>

      <svg
        id="svg"
        width={isTab ? "98vw" : "100%"}
        height="100%"
        // xmlns="http://www.w3.org/2000/svg"
        // viewBox="0 0 300 300"
        viewBox="-0.5 -0.5 441 81"
        style={{
          position: "absolute",
          top: "100px",
          // border:'1px solid black'
        }}
      >
        {isTab ? (
          <path
            d="M 160 -40 L 105 -40 M 60 -120 L 130 -120 M 240 85 L 240 -5 M 375 -110 L 375 -135"
            fill="none"
            stroke="rgb(200, 200, 200, 0.5)"
            stroke-width="2"
            stroke-miterlimit="10"
            pointer-events="stroke"
            class="marching-ant"
          />
        ) : isMobile ? (
          <path
            d="M 130 -375 L 60 -375  M 155 -315 L 110 -315 M 250 -150 L 250 -268 M 250 -335 L 250 -360 M 375 -370 L 375 -395"
            fill="none"
            stroke="rgb(200, 200, 200, 0.5)"
            stroke-width="2"
            stroke-miterlimit="10"
            pointer-events="stroke"
            class="marching-ant"
          />
        ) : (
          <path
            // d="M 49 108 L 85 108 M 30 80 L 30 52 M 64 89.5 L 64 74 M 123 22 L 115 22 A 8 8, 0, 0, 0, 107 28 L 107 81 A 8 8, 0, 0, 1, 99 90 L 50 90  M 318 22 L 385 22 A 8 8, 0, 0, 0, 393 14 L 393 -8 M 395 10 L 400 10 A 8 8, 0, 0, 1, 405 15 L 405 28 M 358 -20 L 346 -20 M 351 -40 L 330 -40 M 425 -40 L 425 -46 M 270 47 L 270 70 A 8 8, 0, 0, 0, 275 76  M 276.4 76.5 L 410 76.5 A 8 8, 0, 0, 1, 414 81 M 72 -40 L 145 -40  M 366 113 L 350 113 M 220.3 -15 L 220 -20 A 8 8, 0, 0, 0, 215 -25 L 72 -25 "
            d="M 49 108 L 85 108 M 30 80 L 30 52 M 64 89.5 L 64 74 M 123 22 L 115 22 A 8 8, 0, 0, 0, 107 28 L 107 81 A 8 8, 0, 0, 1, 99 90 L 50 90  M 318 22 L 385 22 A 8 8, 0, 0, 0, 393 14 L 393 -10 M 395 10 L 403 10 A 8 8, 0, 0, 1, 408 15 L 408 25 M 362 -22 L 349 -22 M 354 -42 L 332 -42 M 429 -43 L 429 -50 M 270 48 L 270 64 A 8 8, 0, 0, 0, 276 70 L 408 70 A 8 8, 0, 0, 1, 416 80 M 72 -42 L 148 -42  M 370 113 L 351 113 M 220.3 -15 L 220 -20 A 8 8, 0, 0, 0, 215 -25 L 72 -25 "
            fill="none"
            stroke="rgb(200, 200, 200, 0.5)"
            stroke-width="2"
            stroke-miterlimit="10"
            pointer-events="stroke"
            class="marching-ant"
          />
        )}
      </svg>
    </>
  );
}

export default ClientHero;
