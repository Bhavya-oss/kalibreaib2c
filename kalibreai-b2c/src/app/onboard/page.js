"use client";

import Protected from "@/components/auth/Protected";
import { MyContext } from "@/context/ContextProvider";
import { Box, Button, Typography } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getOnboardingPages, signOut } from "../api/ApiHandlers";
import OnboardingPage from "@/components/onboard/OnboardingPage";
import { intialData, onboardingReducer } from "@/hooks/OnboardingReducer";
import { formateOnboardValues } from "@/utils/CustomFunctions";

function Onbording() {
  const { globalState, dispatch } = useContext(MyContext);

  const [onBoardState, onBoardDispatch] = useReducer(
    onboardingReducer,
    intialData
  );

  const [localStoreInfo, setLocalStoreInfo] = useState();

  const getOnboardData = useCallback(async () => {
    //preparing data for backend
    const tempData = {
      phone_number: localStoreInfo?.phone_number,
    };

    const response = await getOnboardingPages(tempData, dispatch);

    let temp = {
      type: "fullData",
      payload: {
        // pageNum: response?.redirect_onboard_page,
        pageNum: 2,
        fields: formateOnboardValues(response?.fields, true),
      },
    };

    onBoardDispatch(temp);
  }, [localStoreInfo]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //localstorage information
      const localStorageInfo = localStorage?.getItem("info");
      // parsing the information
      const USER_INFO = JSON.parse(localStorageInfo);
      setLocalStoreInfo(USER_INFO);
    }
  }, []);

  useEffect(() => {
    if (localStoreInfo) {
      getOnboardData();
    }
  }, [localStoreInfo]);

  // console.log("zzz global data geting ====", globalState.onbordingQuestions);
  // console.log("zzz onboard data geting ====", onBoardState);

  return (
    <>
      <Box>
        <OnboardingPage
          pageData={
            globalState?.onbordingQuestions?.list?.[onBoardState?.pageNum]
          }
          pageNum={onBoardState?.pageNum}
          onBoardDispatch={onBoardDispatch}
          onBoardData={onBoardState?.fields}
        />
      </Box>
    </>
  );
}

// export default Protected(Onbording);

export default Onbording;
