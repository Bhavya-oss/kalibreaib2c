import { Avatar, Box, Stack } from "@mui/material";
import React, { useCallback } from "react";
import TextInput from "../inputs/TextInput";
import CloudinaryUpload from "../inputs/CloudinaryUpload";
import RadioButtonsInput from "../inputs/RadioButtonsInput";
import AutoCompleteInput from "../inputs/AutoCompleteInput";
import SwitchInput from "../inputs/SwitchInput";
import CustomSliderInput from "../inputs/CustomSliderInput";
import {
  isArrayIterable,
  isValidToShow,
  manipulateOnboardValidation,
  workTypeFormatingValues,
} from "@/utils/CustomFunctions";
import DateInput from "../inputs/DateInput";
import ToggleButtonGroup from "../inputs/ToggleButtonGroupInput";
import SelectInput from "../inputs/SelectInput";
import GroupCheckBoxInput from "../inputs/GroupCheckBoxInput";
import AvailabilityInput from "../inputs/AvailabilityInput";
import FileUploader from "../inputs/FileUploader";

function GetDynamicField(props) {
  const {
    fields,
    errors,
    register,
    onBoardData,
    onBoardDispatch,
    control,
    clearErrors,
  } = props;

  const updateOnboardFields = useCallback(
    (value, type) => {
      if (type === "location_work_type") {
        const result = workTypeFormatingValues(value);

        onBoardDispatch({ type: type, payload: result });
      } else if (type === "any_location") {
        onBoardDispatch({ type: type, payload: value });
        if (value) {
          onBoardDispatch({
            type: "location_work_type",
            payload: [{ name: "Any", value: "Any", workType: ["office"] }],
          });
        } else {
          onBoardDispatch({
            type: "location_work_type",
            payload: [],
          });
        }
      } else {
        // console.log("update fields ====", type, value);
        onBoardDispatch({ type: type, payload: value });
      }
    },
    [onBoardData]
  );

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        {fields?.map((data, idx) => {
          switch (data.type) {
            case "input":
              return (
                <Box key={idx}>
                  <TextInput
                    updateValue={updateOnboardFields}
                    label={data?.label}
                    register={register}
                    name={data?.name}
                    placeholder={data?.placeholder}
                    validation={data?.validation}
                    error={errors?.[data?.name]?.message}
                    value={onBoardData?.[data?.name]}
                  />
                </Box>
              );
            case "photo_uploader":
              return (
                <Box key={idx}>
                  <Box>
                    <Avatar
                      src={onBoardData?.[data?.name]}
                      sx={{
                        width: "70px",
                        height: "70px",
                        margin: "30px 0 16px 29px",
                      }}
                    />
                  </Box>
                  <CloudinaryUpload
                    label={data?.label}
                    updateValue={updateOnboardFields}
                    name={data?.name}
                  />
                </Box>
              );
            case "radio_button":
              {console.log("rrr value ===",onBoardData?.[data?.name])}
              return (
                
                <Box key={idx}>
                  {isValidToShow(
                    data?.display,
                    data?.condition,
                    onBoardData
                  ) && (
                    <RadioButtonsInput
                      label={data?.label}
                      name={data?.name}
                      options={data?.options}
                      value={onBoardData?.[data?.name]}
                      register={register}
                      validation={onBoardData?.[data?.name] ? null:data?.validation}
                      updateValue={updateOnboardFields}
                      error={errors?.[data?.name]?.message}
                      control={control}
                      isRowDirection={data?.isRowDirection}
                    />
                  )}
                </Box>
              );
            case "auto_complete":
              return (
                <Box key={idx}>
                  {isValidToShow(
                    data?.display,
                    data?.condition,
                    onBoardData
                  ) && (
                    <AutoCompleteInput
                      label={data?.label}
                      name={data?.name}
                      validation={onBoardData?.[data?.name] != null && onBoardData?.[data?.name]?.length !== 0  ? null : data?.validation}
                      // validation={manipulateOnboardValidation(onBoardData?.[data?.name],data?.validation)}
                      multiple={data?.multiple}
                      updateValue={updateOnboardFields}
                      error={errors?.[data?.name]?.message}
                      control={control}
                      isElasticSearch={data?.isElasticSearch}
                      ListType={data?.listType}
                      value={onBoardData?.[data?.name]}
                      apiPath={data?.api_path}
                      switchLabel={data?.switchLabel}
                      switchName={data?.switchName}
                      switchValue={onBoardData?.[data?.switchName]}
                    />
                  )}
                </Box>
              );
            case "switch":
              return (
                <Box key={idx} sx={data?.style}>
                  {isValidToShow(
                    data?.display,
                    data?.condition,
                    onBoardData
                  ) && (
                    <SwitchInput
                      label={data?.label}
                      update={updateOnboardFields}
                      value={onBoardData?.[data?.name]}
                      name={data?.name}
                      control={control}

                    />
                  )}
                </Box>
              );
            case "slider":
              return (
                <Box
                  key={idx}
                  sx={{
                    display: isValidToShow(
                      data?.display,
                      data?.condition,
                      onBoardData
                    )
                      ? "block"
                      : "none",
                  }}
                >
                  {isValidToShow(
                    data?.display,
                    data?.condition,
                    onBoardData
                  ) && (
                    <CustomSliderInput
                      label={data?.label}
                      name={data?.name}
                      min={data?.min}
                      max={data?.max}
                      step={data?.step}
                      marks={data?.marks}
                      control={control}
                      value={onBoardData?.[data?.name]}
                      updateField={updateOnboardFields}
                      validation={ onBoardData?.[data?.name] != 0 ?  null : data?.validation}
                      error={errors?.[data?.name]?.message}
                      switchLabel={data?.switchLabel}
                      switchName={data?.switchName}
                      switchValue={onBoardData?.[data?.switchName]}
                    />
                  )}
                </Box>
              );
            case "date":
              return (
                <>
                  {isValidToShow(
                    data?.display,
                    data?.condition,
                    onBoardData
                  ) && (
                    <Box key={idx}>
                      <DateInput
                        label={data?.label}
                        value={onBoardData?.[data?.name]}
                        name={data?.name}
                        control={control}
                        updateField={updateOnboardFields}
                        error={errors?.[data?.name]?.message}
                        validation={onBoardData?.[data?.name] != null ? null : data?.validation}
                        switchLabel={data?.switchLabel}
                        switchName={data?.switchName}
                        switchValue={onBoardData?.[data?.switchName]}
                      />
                    </Box>
                  )}
                </>
              );
            case "group_buttons":
              return (
                <Box key={idx}>
                  {isValidToShow(
                    data?.display,
                    data?.condition,
                    onBoardData
                  ) && (
                    <ToggleButtonGroup
                      label={data?.label}
                      value={onBoardData?.[data?.name]}
                      name={data?.name}
                      control={control}
                      updateField={updateOnboardFields}
                      options={data?.options}
                      error={errors?.[data?.name]?.message}
                      validation={onBoardData?.[data?.name]? null : data?.validation}
                    />
                  )}
                </Box>
              );
            case "select":
              return (
                <Box key={idx}>
                  {isValidToShow(
                    data?.display,
                    data?.condition,
                    onBoardData
                  ) && (
                    <SelectInput
                      label={data?.label}
                      value={onBoardData?.[data?.name]}
                      name={data?.name}
                      control={control}
                      updateField={updateOnboardFields}
                      options={data?.options}
                    />
                  )}
                </Box>
              );
              case"checkBox_button":
                return (
                  <Box key={idx}>
                    <GroupCheckBoxInput
                      updateValue={updateOnboardFields}
                      label={data?.label}
                      name={data?.name}
                      control={control}
                      options={data?.options}
                      validation={onBoardData?.[data?.name]?.length !== 0 ?null : data?.validation}
                      error={errors?.[data?.name]?.message}
                      value={onBoardData?.[data?.name]}
                    />
                  </Box>
                );
                case"availability":
                return (
                  <Box key={idx}>
                    <AvailabilityInput
                      updateValue={updateOnboardFields}
                      label={data?.label}
                      name={data?.name}
                      control={control}
                      validation={onBoardData?.[data?.name]?.length !== 0 ?null : data?.validation}
                      error={errors?.[data?.name]?.message}
                      value={onBoardData?.[data?.name]}
                      maxCount={data?.max_available_slot}

                    />
                  </Box>
                );
                case"file_uploader":
                return (
                  <Box key={idx}>
                    <FileUploader
                      updateValue={updateOnboardFields}
                      label={data?.label}
                      name={data?.name}
                      control={control}
                      validation={onBoardData?.[data?.name] != null ? null : data?.validation}
                      error={errors?.[data?.name]?.message}
                      value={onBoardData?.[data?.fullData]}
                    />
                  </Box>
                );
            default:
              return null;
          }
        })}
      </Box>
    </>
  );
}

export default GetDynamicField;
