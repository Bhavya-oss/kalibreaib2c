"use client";

import {
  S3_FOLDER_NAME,
  S3_PERMISION_METHOD,
  PRESIGNED_URL,
  S3_BUCKET_NAME,
} from "@/constants/TextConstants";
import api from "@/utils/HttpCommons";
import React, { useCallback, useState } from "react";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Controller } from "react-hook-form";
import axios from "axios";

function FileUploader(props) {
  const { label, name, updateValue, control, validation, error, value } = props;

  const [uploaderDetails, setUploaderDetails] = useState(value);

  const updateState = useCallback(
    (value, type) => {
      setUploaderDetails((prev) => {
        return {
          ...prev,
          [type]: value,
        };
      });
    },
    [uploaderDetails]
  );

  const handleUpload = useCallback(
    async (file) => {
      if (file) {
        let newFilename = file?.name?.trim()?.replace(/\s+/g, "");
        newFilename = newFilename.replace(/[^a-zA-Z0-9.]/g, "");

        let info = {
          resume: `${S3_FOLDER_NAME}${newFilename}`,
          resume_parsed_status: "parsed",
          uploaded_by: "self",
          bucket_name: S3_BUCKET_NAME,
          obj_method: S3_PERMISION_METHOD,
          file_name: `${S3_FOLDER_NAME}${newFilename}`,
        };

        try {
          const response = await api.post(PRESIGNED_URL, info);
          const url = response?.data?.url;
          let totalSize = file.size;

          const res = await axios.put(url, file, {
            headers: {
              "Content-Type": file.type,
            },
            onUploadProgress: (event) => {
              let progress = (event.loaded / totalSize) * 100;

              //   setUploadProgress(parseInt(progress.toFixed(0)));
              updateState(parseInt(progress.toFixed(0)), "progress");
            },
          });

          if (res.status === 200) {
            // setUploadStatus(true);
            updateState(true, "uploadStatus");
            updateValue(response?.data?.resume, name);
            let temp = {
              name: file.name,
              progress: 100,
              uploadStatus: true,
            };
            updateValue(temp, "resumedata");
          } else {
            // setUploadStatus(false);
            updateState(false, "uploadStatus");
          }
        } catch (error) {
          console.log("Error from file uploader : ", error);
        }
      }
    },
    [name]
  );

  const handleChange = (file) => {
    if (file) {
      //   setSelectedFile(file);
      updateState(file?.name, "name");
      handleUpload(file);
    }
  };

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>

        <Controller
          name={name}
          rules={validation}
          control={control}
          render={({ field }) => (
            <Box sx={{ maxWidth: "350px" }}>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  field.onChange(e.target.files[0]);
                  handleChange(e.target.files[0]);
                }}
                style={{ display: "none" }}
                id="file-input"
              />

              <>
                {uploaderDetails?.name ? (
                  <Box
                    sx={{
                      border: "1px solid gray",
                      padding: "10px",
                      borderRadius: "14px",
                      textAlign: "center",
                      width: "70%",
                      cursor: "pointer",
                    }}
                  >
                    <Stack direction="column" justifyContent="space-between">
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <InsertDriveFileIcon
                          sx={{
                            fontSize: 15,
                            color: `${
                              uploaderDetails?.uploadStatus
                                ? "#353535"
                                : "#c92519"
                            }`,
                          }}
                        />

                        <Box>
                          {!uploaderDetails?.uploadStatus && (
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "#c92519" }}
                            >
                              Failed
                            </Typography>
                          )}
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: `${
                                uploaderDetails?.uploadStatus
                                  ? "#353535"
                                  : "#c92519"
                              }`,
                              textAlign: "start",
                              width: "150px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            {uploaderDetails?.name}
                          </Typography>
                        </Box>

                        <Box>
                          {uploaderDetails?.uploadStatus &&
                          uploaderDetails?.progress == 100 ? (
                            <CheckCircleIcon
                              sx={{
                                fontSize: 23,
                                color: "#50c878",
                                cursor: "pointer",
                              }}
                            />
                          ) : uploaderDetails?.uploadStatus === false ? (
                            <DeleteIcon
                              sx={{
                                fontSize: 23,
                                color: "#c92519",
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                // setSelectedFile(null);
                                updateState(null, "name");
                              }}
                            />
                          ) : null}
                        </Box>
                      </Stack>

                      {uploaderDetails?.name != null &&
                      uploaderDetails?.progress === 100 ? (
                        <label htmlFor="file-input">
                          <Box
                            sx={{
                              textAlign: "center",
                              width: "30%",
                              minWidth: "150px",
                              cursor: "pointer",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "#2196f3" }}
                            >
                              Click to edit
                            </Typography>
                          </Box>
                        </label>
                      ) : (
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <LinearProgress
                            variant="determinate"
                            value={uploaderDetails?.progress}
                            sx={{
                              height: 7,
                              borderRadius: 6,
                              width: "83%",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor:
                                  uploaderDetails?.progress < 100
                                    ? "#2196f3"
                                    : "#50c878",
                                borderRadius: 6,
                                height: 7,
                              },
                            }}
                          />

                          <Typography>{`${uploaderDetails?.progress} %`}</Typography>
                        </Stack>
                      )}

                      <Box>
                        {uploaderDetails?.uploadStatus &&
                        uploaderDetails?.progress ==
                          100 ? null : uploaderDetails?.uploadStatus ===
                          false ? (
                          <DeleteIcon
                            sx={{
                              fontSize: 23,
                              color: "#c92519",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              updateState(null, "name");

                              //   setSelectedFile(null);
                            }}
                          />
                        ) : null}
                      </Box>
                    </Stack>
                  </Box>
                ) : (
                  <Box>
                    <label htmlFor="file-input">
                      <Box
                        sx={{
                          border: "1px dashed gray",
                          padding: "10px",
                          borderRadius: "14px",
                          textAlign: "center",
                          width: "70%",
                          cursor: "pointer",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="left"
                          alignItems="center"
                        >
                          <UploadFileOutlinedIcon sx={{ fontSize: 25 }} />
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#3ca3f4" }}
                          >
                            Click to upload
                          </Typography>
                        </Stack>
                      </Box>
                    </label>
                  </Box>
                )}
              </>
            </Box>
          )}
        />

        <Typography variant="body1" sx={{ color: "red" }}>
          {Boolean(error) && error}
        </Typography>
      </Stack>
    </>
  );
}

export default FileUploader;
