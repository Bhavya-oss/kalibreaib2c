"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { useCallback, useContext, useState } from "react";
import TimeCounter from "./TimeCounter";
import { resendPhoneNumber, sendOtp } from "@/app/api/ApiHandlers";
import { MyContext } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";

function OtpForm(props) {
  const { setMobileNumber, setIsShowOtpForm, mobileNumber } = props;

  const { globalState, dispatch } = useContext(MyContext);

  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(false);

  const router = useRouter();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // resend button enabling purpuse
  const endTime = (info) => {
    if (info) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const resend = useCallback(async () => {
    setStatus(false);

    setOtp("");

    resendPhoneNumber();
  }, [otp]);

  const submit = useCallback(async () => {
    try {
      if (otp.length === 6) {
        const data = {
          userInputCode: otp,
        };

        const response = await sendOtp(data, dispatch);

        // console.log("otp response ===", response);
        if (response) {
          router.push("/onboard");
        }
      }
    } catch (error) {
      console.log("Error from otp submt :", submit);
    }
  }, [otp]);

  return (
    <div>
      <Typography variant="h1">Enter OTP</Typography>
      <Typography variant="h4" mt={1} mb={1} sx={{ fontWeight: 400 }}>
        {`OTP is sent to ${mobileNumber}`}
        <span>
          <ModeEditIcon
            sx={{ fontSize: "17px", marginLeft: "8px", cursor: "pointer" }}
            onClick={() => {
              setMobileNumber("");
              setIsShowOtpForm(false);
              dispatch({ type: "otpErrorStatus", payload: null });
            }}
          />
        </span>
      </Typography>
      <Box
        sx={{
          width: { xs: "100%", sm: "85%", md: "85%" },
          maxWidth: "450px",
        }}
      >
        <MuiOtpInput value={otp} onChange={handleChange} length={6} />
        {globalState?.otpErrorStatus && (
          <Typography variant="body1" color="red">
            {globalState?.otpErrorStatus}
          </Typography>
        )}
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{
            width: { xs: "100%", sm: "85%", md: "85%" },
            maxWidth: "450px",
            mt: "25px",
          }}
          size="large"
          disabled={otp?.length != 6}
          onClick={submit}
        >
          {otp?.length === 6 ? (
            "Verify"
          ) : !status ? (
            <TimeCounter endTime={endTime} min={0} sec={45} />
          ) : (
            <h3>00:00</h3>
          )}
        </Button>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", sm: "85%", md: "85%" },
          maxWidth: "450px",
          mt: "15px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography variant="body1">Didn’t receive the OTP?</Typography>
          </Box>
          <Box>
            <Button
              onClick={() => {
                resend();
              }}
              sx={{
                cursor: "pointer",
                paddingTop: "0px",
              }}
            >
              Request OTP
            </Button>
          </Box>
        </Stack>
      </Box>
    </div>
  );
}

export default OtpForm;
