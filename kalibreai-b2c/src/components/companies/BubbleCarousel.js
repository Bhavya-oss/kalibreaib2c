"use client";

// import { BUBBLE_CAROUSEL_IMAGE } from "@/constants/MediaConstants";
// import { margeTwoArrayOfObject } from "@/utils/CustomFunctions";
// import styled from "@emotion/styled";
// import { Box } from "@mui/material";
// import React, { useEffect, useState } from "react";

// const SCROLL_SPEED = 5;
// const CANVAS_WIDTH = 2800;

// const Container = styled(Box)(({ theme }) => ({
//   position: "relative",
//   animation: "logojump 5s infinite linear",

//   // overflow:"hidden",
//   "@keyframes logojump": {
//     "0%": {
//       transform: "translateY(10px)",
//     },
//     "50%": {
//       transform: "translateY(0px)",
//     },
//     "100%": {
//       transform: "translateY(10px)",
//     },
//   },
// }));

// function BubbleCarousel() {
//   const [bubbles, setBubbles] = useState([]);

//   const bgPosition = [
//     {
//       backgroundPosition: "-37px -41px",
//     },
//     {
//       backgroundPosition: "-180px -49px",
//     },
//     {
//       backgroundPosition: "-325px -42px",
//     },
//     {
//       backgroundPosition: "-615px -48px",
//     },
//     {
//       backgroundPosition: "-904px -554px",
//     },
//     {
//       backgroundPosition: "-759px -47px",
//     },
//     {
//       backgroundPosition: "-905px -47px;",
//     },
//     {
//       backgroundPosition: "-33px -213px",
//     },
//     {
//       backgroundPosition: "-179px -215px",
//     },
//     {
//       backgroundPosition: "-324px -208px",
//     },
//     {
//       backgroundPosition: "-470px -50px",
//     },
//     {
//       backgroundPosition: "-614px -203px",
//     },
//     {
//       backgroundPosition: "-754px -217px",
//     },
//     {
//       backgroundPosition: "-903px -213px",
//     },
//     {
//       backgroundPosition: "-34px -384px",
//     },
//     {
//       backgroundPosition: "-179px -377px",
//     },
//     {
//       backgroundPosition: "-475px -381px",
//     },
//     {
//       backgroundPosition: "-469px -220px",
//     },
//     {
//       backgroundPosition: "-615px -386px",
//     },
//     {
//       backgroundPosition: "-763px -377px;",
//     },
//     {
//       backgroundPosition: "-904px -216px",
//     },
//     {
//       backgroundPosition: "-37px -711px",
//     },
//     {
//       backgroundPosition: "-180px -382px",
//     },
//     {
//       backgroundPosition: "-321px -390px",
//     },
//     {
//       backgroundPosition: "-469px -547px",
//     },
//     {
//       backgroundPosition: "-614px -550px",
//     },
//     {
//       backgroundPosition: "-758px -556px",
//     },
//     {
//       backgroundPosition: "-897px -397px",
//     },
//     {
//       backgroundPosition: "-34px -552px",
//     },
//     {
//       backgroundPosition: "-181px -550px",
//     },
//     {
//       backgroundPosition: "-324px -549px",
//     },
//     {
//       backgroundPosition: "-759px -879px",
//     },
//     {
//       backgroundPosition: "-614px -713px;",
//     },
//   ];

//   useEffect(() => {
//     const bubbleSpecs = [
//       { s: 0.6, x: 1134, y: 45 },
//       { s: 0.6, x: 1620, y: 271 },
//       { s: 0.6, x: 1761, y: 372 },
//       { s: 0.6, x: 2499, y: 79 },
//       { s: 0.6, x: 2704, y: 334 },
//       { s: 0.6, x: 2271, y: 356 },
//       { s: 0.6, x: 795, y: 226 },
//       { s: 0.6, x: 276, y: 256 },
//       { s: 0.6, x: 1210, y: 365 },
//       { s: 0.6, x: 444, y: 193 },
//       { s: 0.6, x: 2545, y: 387 },
//       { s: 0.8, x: 1303, y: 193 },
//       { s: 0.8, x: 907, y: 88 },
//       { s: 0.8, x: 633, y: 320 },
//       { s: 0.8, x: 323, y: 60 },
//       { s: 0.8, x: 129, y: 357 },
//       { s: 0.8, x: 1440, y: 342 },
//       { s: 0.8, x: 1929, y: 293 },
//       { s: 0.8, x: 2135, y: 198 },
//       { s: 0.8, x: 2276, y: 82 },
//       { s: 0.8, x: 2654, y: 182 },
//       { s: 0.8, x: 2783, y: 60 },
//       { x: 1519, y: 118 },
//       { x: 1071, y: 233 },
//       { x: 1773, y: 148 },
//       { x: 2098, y: 385 },
//       { x: 2423, y: 244 },
//       { x: 901, y: 385 },
//       { x: 624, y: 111 },
//       { x: 75, y: 103 },
//       { x: 413, y: 367 },
//       { x: 2895, y: 271 },
//       { x: 1990, y: 75 },
//     ];

//     const createBubble = (index, { x, y, s = 1 }) => {
//       return {
//         index,
//         x,
//         y,
//         scale: s,
//       };
//     };

//     const initialBubbles = bubbleSpecs.map((spec, index) =>
//       createBubble(index, spec)
//     );

//     const tempData = margeTwoArrayOfObject(initialBubbles, bgPosition);
//     setBubbles(tempData);

//     // console.log("created bubbles ===", initialBubbles);
//     // console.log("created result ===", tempData);

//     const updateBubbles = () => {
//       setBubbles((prevBubbles) =>
//         prevBubbles.map((bubble) => {
//           let newX = bubble.x < -200 ? CANVAS_WIDTH : bubble.x - SCROLL_SPEED;
//           return { ...bubble, x: newX };
//         })
//       );
//       requestAnimationFrame(updateBubbles);
//     };

//     const animationId = requestAnimationFrame(updateBubbles);

//     return () => cancelAnimationFrame(animationId);
//   }, []);

//   console.log("created bubbles ===", bubbles);

//   return (
//     <>
//       <Container>
//         {bubbles.map(({ index, x, y, scale, style }) => (
//           <Box
//             key={index}
//             sx={{
//               transform: `translate(${x}px, ${y}px) scale(${scale})`,
//               position: "absolute",
//               width: "135px",
//               height: "135px",
//               borderRadius: "50%",
//               boxShadow:
//                 "0 15px 35px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1)",
//               backgroundImage: `url(${BUBBLE_CAROUSEL_IMAGE})`,
//               backgroundSize: "1076px 1076px",
//               ...style,
//             }}
//           />
//         ))}
//       </Container>
//     </>
//   );
// }

// export default BubbleCarousel;

import React, { useEffect, useState } from "react";

const SCROLL_SPEED = 0.7;
const CANVAS_WIDTH = 2800;

function BubbleCarousel() {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    const bubbleSpecs = [
      { s: 0.6, x: 1134, y: 45 },
      { s: 0.6, x: 1620, y: 271 },
      { s: 0.6, x: 1761, y: 372 },
      { s: 0.6, x: 2499, y: 79 },
      { s: 0.6, x: 2704, y: 334 },
      { s: 0.6, x: 2271, y: 356 },
      { s: 0.6, x: 795, y: 226 },
      { s: 0.6, x: 276, y: 256 },
      { s: 0.6, x: 1210, y: 365 },
      { s: 0.6, x: 444, y: 193 },
      { s: 0.6, x: 2545, y: 387 },
      { s: 0.8, x: 1303, y: 193 },
      { s: 0.8, x: 907, y: 88 },
      { s: 0.8, x: 633, y: 320 },
      { s: 0.8, x: 323, y: 60 },
      { s: 0.8, x: 129, y: 357 },
      { s: 0.8, x: 1440, y: 342 },
      { s: 0.8, x: 1929, y: 293 },
      { s: 0.8, x: 2135, y: 198 },
      { s: 0.8, x: 2276, y: 82 },
      { s: 0.8, x: 2654, y: 182 },
      { s: 0.8, x: 2783, y: 60 },
      { x: 1519, y: 118 },
      { x: 1071, y: 233 },
      { x: 1773, y: 148 },
      { x: 2098, y: 385 },
      { x: 2423, y: 244 },
      { x: 901, y: 385 },
      { x: 624, y: 111 },
      { x: 75, y: 103 },
      { x: 413, y: 367 },
      { x: 2895, y: 271 },
      { x: 1990, y: 75 },
    ];

    const createBubble = (index, { x, y, s = 1 }) => {
      return {
        index,
        x,
        y,
        scale: s,
      };
    };

    const initialBubbles = bubbleSpecs.map((spec, index) =>
      createBubble(index, spec)
    );
    setBubbles(initialBubbles);

    const updateBubbles = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          let newX = bubble.x < -200 ? CANVAS_WIDTH : bubble.x - SCROLL_SPEED;
          return { ...bubble, x: newX };
        })
      );
      requestAnimationFrame(updateBubbles);
    };

    const animationId = requestAnimationFrame(updateBubbles);

    return () => cancelAnimationFrame(animationId);
  }, []);
  return (
    <div className="bubbles-container">
      <div className="bubbles">
        {bubbles.map(({ index, x, y, scale }) => (
          <div
            key={index}
            className={`bubble logo${index + 1}`}
            style={{ transform: `translate(${x}px, ${y}px) scale(${scale}) ` }}
          />
        ))}
      </div>
    </div>
  );
}

export default BubbleCarousel;
