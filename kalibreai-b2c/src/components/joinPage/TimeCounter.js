"use client";

import React, { useState, useEffect } from "react";

// This function accept minutes, seconds and endtime callback function it gives status true after completing count
function TimeCounter({ endTime, min, sec }) {
  const [minutes, setMinutes] = useState(min);
  const [seconds, setSeconds] = useState(sec);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        setMinutes(min);
        setSeconds(sec);
        endTime(true);
      } else if (seconds === 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [minutes, seconds, endTime]);

  return (
    <>
      <h3>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h3>
    </>
  );
}

export default TimeCounter;
