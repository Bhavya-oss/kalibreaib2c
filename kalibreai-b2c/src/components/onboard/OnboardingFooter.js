"use client";

import { updateOnboarding } from "@/app/api/ApiHandlers";
import {
  BACK_BUTTON_STRING,
  CONTINUE_BUTTON_STRING,
  LOADING_SUCCESS,
} from "@/constants/TextConstants";
import { formateOnboardValues, isEmptyObject } from "@/utils/CustomFunctions";
import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

function OnboardingFooter(props) {
  const {
    pageNum,
    onBoardDispatch,
    handleSubmit,
    onBoardData,
    reset,
    isChanged,
    setValue,
  } = props;

  const [localStoreInfo, setLocalStoreInfo] = useState();

  const isMobileView = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (typeof window !== "undefined") {
      //localstorage information
      const localStorageInfo = localStorage?.getItem("info");
      // parsing the information
      const USER_INFO = JSON.parse(localStorageInfo);
      setLocalStoreInfo(USER_INFO);
    }
  }, []);

  const nextPage = useCallback(
    (result) => {
      // console.log("ccc page data before ==", onBoardData);

      if (isEmptyObject(isChanged)) {
        const data = { type: "pageNum", payload: pageNum + 1 };
        if (pageNum != 8) {
          onBoardDispatch(data);
        }
      } else {
        const manipulatedData = formateOnboardValues(onBoardData);

        console.log("ccc page data after ==", manipulatedData);

        const tempData = {
          phone_number: localStoreInfo?.phone_number,
          onboarddatas: {
            fields: manipulatedData,
            onboarding_page_num: pageNum + 1,
          },
        };

        if (pageNum != 8) {
          updateOnboarding(tempData)?.then((response) => {
            const temp = {
              pageNum: response?.onboarding_page_num,
              fields: formateOnboardValues(response?.fields, true),
              loading: LOADING_SUCCESS,
            };

            onBoardDispatch({ type: "fullData", payload: temp });
          });
        }
      }

      reset();
    },
    [pageNum, onBoardData, reset, isChanged, localStoreInfo]
  );

  const backPage = useCallback(() => {
    const data = { type: "pageNum", payload: pageNum - 1 };

    if (pageNum != 0) {
      onBoardDispatch(data);
    }
  }, [pageNum]);

  // console.log("qqqq pagen num ===", pageNum);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Button
            onClick={backPage}
            variant={isMobileView ? "text" : "outlined"}
          >
            {BACK_BUTTON_STRING}
          </Button>
        </Box>
        <Stack direction="row" spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((data) => {
            return (
              <Box
                key={data}
                sx={{
                  width: { xs: "6px", sm: "30px", md: "30px" },
                  height: "6px",
                  backgroundColor: pageNum == data ? "#000" : "#ebebeb",
                  borderRadius: "5px",
                }}
              />
            );
          })}
        </Stack>
        <Box>
          <Button
            onClick={handleSubmit(nextPage)}
            variant={isMobileView ? "text" : "contained"}
          >
            {CONTINUE_BUTTON_STRING}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default OnboardingFooter;
