"use client";

import { isArrayIterable } from "@/utils/CustomFunctions";
import { Box, Chip, Stack, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import theme from "../../theme/theme";

function ResponsiveChips({ list }) {
  const [visibleChips, setVisibleChips] = useState([]);
  const [hiddenChips, setHiddenChips] = useState([]);

  const calculateEffectiveWidth = useCallback((string) => {
    const fontSize = theme.typography.fontSize; // Font size from your CSS
    const averageCharWidth = fontSize * 0.6; // Adjust as needed
    const horizontalPadding = 15; // 9px on each side
    const margin = 4; // Add border width if applicable

    let textWidth = string?.length * averageCharWidth;
    const effectiveWidth = textWidth + horizontalPadding + margin;

    return parseFloat(effectiveWidth.toFixed(1));
  }, []);

  const handleContainerResize = useCallback(() => {
    const containerWidth = document.querySelector(".responsiveContainer");
    const currentContainerWidth = containerWidth.offsetWidth;

    // console.log("ddd widht ===", currentContainerWidth);
    let totalWidth = 0;
    let visibleChipsArray = [];
    let hiddenChipsArray = [];

    for (let i = 0; i < list?.length; i++) {
      const chipWidth = calculateEffectiveWidth(list[i]);

      if (totalWidth + chipWidth <= currentContainerWidth) {
        visibleChipsArray.push(list[i]);
        totalWidth += chipWidth;
      } else {
        hiddenChipsArray.push(list[i]);
      }
    }

    setVisibleChips(visibleChipsArray);
    setHiddenChips(hiddenChipsArray);
  }, [list, calculateEffectiveWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleContainerResize);

    handleContainerResize();

    return () => {
      window.removeEventListener("resize", handleContainerResize);
    };
  }, [handleContainerResize]);

  return (
    <div className="responsiveContainer">
      <Stack direction="row" spacing={0.5}>
        {visibleChips?.map((data, idx) => {
          return (
            <Chip key={idx} label={data} variant="outlined" size="small" />
          );
        })}

        <Tooltip
          placement="top"
          title={
            <Box>
              <Stack direction="row" flexWrap="wrap" gap={0.5}>
                {hiddenChips?.map((data, idx) => (
                  <Chip
                    key={idx}
                    label={data}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          }
        >
          {isArrayIterable(hiddenChips) && (
            <Chip
              label={` + ${hiddenChips.length}`}
              variant="outlined"
              size="small"
            />
          )}
        </Tooltip>
      </Stack>
    </div>
  );
}

export default ResponsiveChips;
