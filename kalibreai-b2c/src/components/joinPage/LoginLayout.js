"useClient";

import { Box, Stack, Typography } from "@mui/material";
import PhoneNumberForm from "./PhoneNumberForm";
import OtpForm from "./OtpForm";
import { useState } from "react";

function LoginLayout() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isShowOtpForm, setIsShowOtpForm] = useState(false);

  return (
    <Stack sx={{ 
      paddingTop: {xs:"0px",md:"0px",lg:"10px"},
      }}
 
      direction="column"
      alignItems={{xs:"start",sm:"center",md:"center",lg:"start"}}
      
      >
      {isShowOtpForm ? (
        <OtpForm
          setMobileNumber={setMobileNumber}
          setIsShowOtpForm={setIsShowOtpForm}
          mobileNumber={mobileNumber}
        />
      ) : (
        <PhoneNumberForm
          setMobileNumber={setMobileNumber}
          setIsShowOtpForm={setIsShowOtpForm}
        />
      )}
    </Stack>
  );
}

export default LoginLayout;
