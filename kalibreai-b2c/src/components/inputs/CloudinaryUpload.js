"use client";

import { useCallback, useEffect, useState } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Button, Stack, Typography } from "@mui/material";

const CloudinaryUpload = (props) => {
  const { updateValue,name} = props;

  // State to hold the cloudinary widget instance
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);

  useEffect(() => {
    // Create the cloudinary widget
    const widget = window?.cloudinary?.createUploadWidget(
      {
        cloudName: "kalibre-ai",
        uploadPreset: "ssks3uvf",
        multiple: true,
        folder: "newbees_images",
        maxImageFileSize: 2000000,
        resourceType: "image",
        maxFiles: 1,
        sources: ["local", "camera", "google_drive"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result);
          // setResult(result.info.url);

          //   updateOnbordingData(result.info.url, name, setResult);
          console.log("qwe cloudinary url ===",result.info.url)
          updateValue(result.info.url,name)
        }
      }
    );

    // Set the widget instance in state
    setCloudinaryWidget(widget);
    console.log("calling the cloudinary",window.cloudinary)


    // Cleanup on component unmount
    return () => {
      widget?.destroy();
    };
  }, [name]);

  const handleButtonClickk = (e) => {
    // Open the cloudinary widget
    console.log("calling the cloudinary")
    cloudinaryWidget?.open();
    e.preventDefault();
  };

  const handleButtonClick = useCallback((e) => {

    console.log("calling the cloudinary",cloudinaryWidget)
    cloudinaryWidget?.open();
    e.preventDefault();

  },[cloudinaryWidget])

  return (
    <Stack direction="column" spacing={1}>
      <Button
        id="upload_widget"
        onClick={handleButtonClick}
        startIcon={<AddPhotoAlternateOutlinedIcon sx={{ fontSize: "20px" }} />}
        variant="outlined"
        sx={{ width: "50%", maxWidth: "150px" }}
      >
        Upload Photo
      </Button>
    </Stack>
  );
};

export default CloudinaryUpload;
