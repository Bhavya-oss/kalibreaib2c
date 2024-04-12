import { getLocations, getRolesSkills, getSkills } from "@/app/api/ApiHandlers";
import { MyContext } from "@/context/ContextProvider";
import { formateQueary, makeProperValidation } from "@/utils/CustomFunctions";
import {
  Autocomplete,
  Box,
  Button,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import SwitchInput from "./SwitchInput";

function AutoCompleteInput(props) {
  const {
    label,
    name,
    validation,
    multiple,
    updateValue,
    error,
    control,
    isElasticSearch,
    ListType,
    value,
    apiPath,
    switchLabel,
    switchName,
    switchValue,
  } = props;

  const { globalState, dispatch } = useContext(MyContext);
  const [isCalledApi, setIsCalledApi] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const apicalls = {
    skills: getSkills,
    locations: getLocations,
  };

  // console.log("valid validation ===",name,validation)
  // console.log("valid function valid ===",makeProperValidation(validation))

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const cleanedInput = inputValue
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.toLowerCase();

      if (inputValue === "") {
        setInputValue("");
        getMoreList(apiPath, false);
      } else {
        let path = `${apiPath}&value__wildcard=*${cleanedInput}*`;

        getMoreList(path, false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue, apiPath]);

  const getMoreList = useCallback(
    async (path, update = true) => {
      try {
        setIsCalledApi(true);
        //taking list from old list
        let tempList = [...globalState?.[ListType]?.list];

        //next path shuld be not null before calling the api
        if (path) {
          const response = await apicalls[ListType](path);

          //marging old list and new list
          const data = {
            list: update
              ? [...tempList, ...response.results]
              : response.results,
            nextPath: formateQueary(response.next),
          };

          dispatch({ type: ListType, payload: data });
        }
      } catch (error) {
        console.log("getMoreList function ===", error);
      } finally {
        setIsCalledApi(false);
      }
    },
    [globalState, ListType, apiPath]
  );

  const handleScroll = useCallback(
    async (e) => {
      const listboxNode = e.currentTarget;

      //this variable true when scroll comes to bottom
      const isCloseToBottom =
        listboxNode.scrollHeight -
          (listboxNode.scrollTop + listboxNode.clientHeight) <
        300;

      if (isCloseToBottom && !isCalledApi) {
        const urlPath = globalState?.[ListType]?.nextPath;
        getMoreList(urlPath);
      }
    },
    [isCalledApi, globalState, ListType]
  );

  useEffect(() => {
    if (!isElasticSearch) {
      getRolesSkills(dispatch);
    }
  }, [isElasticSearch]);

  const handleInputChange = (e, input) => {
    setInputValue(input);
  };

  // console.log("value =====", value);

  const handleChangeWorkType = useCallback(
    (res, option) => {
      let copy = { ...option };

      if (copy.workType.includes(res)) {
        console.log("work type ====", copy.workType);

        copy.workType = copy?.workType?.filter((data) => data != res);
        console.log("work type ====", copy.workType);
      } else {
        copy.workType.push(res);
      }

      const result = value?.map((data) => {
        if (data.value === option.value) {
          return copy;
        } else {
          return data;
        }
      });

      updateValue(result, name);

      //  console.log("wtf button value==",copy)
      //  console.log("wtf button option ==",option)
    },
    [value, name]
  );

  const handleOpenDropDown = useCallback(() => {
    getMoreList(apiPath, false);
  }, [apiPath]);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">{label}</Typography>

        {switchLabel && switchName && (
          <Box>
            <SwitchInput
              label={switchLabel}
              name={switchName}
              update={updateValue}
              value={switchValue}
              control={control}
            />
          </Box>
        )}

        {!switchValue && (
          <Controller
            name={name}
            rules={makeProperValidation(validation)}
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple={multiple}
                disabled={switchValue}
                limitTags={2}
                options={globalState?.[ListType]?.list || []}
                getOptionLabel={(option) => option?.name || ""}
                value={value}
                onChange={(e, value) => {
                  field.onChange(value);
                  updateValue(value, name);
                }}
                onOpen={handleOpenDropDown}
                ListboxProps={{
                  onScroll: handleScroll,
                }}
                onInputChange={handleInputChange}
                isOptionEqualToValue={(option, value) =>
                  option?.value === value?.value
                } // Customize equality test
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={field.value}
                    // inputRef={field.ref}
                    error={Boolean(error)}
                    helperText={
                      Boolean(error) && (
                        <span style={{ color: "red" }}>{error}</span>
                      )
                    }
                    size="small"
                    variant="standard"
                    sx={{ width: "95%", maxWidth: "600px" }}
                  />
                )}
              />
            )}
          />
        )}

        {name === "location_work_type" && (
          <Box
            sx={{
              width: "95%",
              maxWidth: "600px",
              maxHeight: "180px",
              overflow: "auto",
            }}
          >
            <Stack
              direction="column"
              //  justifyContent="space-between"
              //  alignItems="center"
              spacing={1}
            >
              {value?.map((data, idx) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    key={idx}
                  >
                    <Box>
                      <Typography variant="h6">{data?.name}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant={
                          data?.workType?.includes("office")
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => {
                          handleChangeWorkType("office", data);
                        }}
                      >
                        Office
                      </Button>
                      <Button
                        variant={
                          data?.workType?.includes("hybrid")
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => {
                          handleChangeWorkType("hybrid", data);
                        }}
                      >
                        Hybrid
                      </Button>
                      <Button
                        variant={
                          data?.workType?.includes("remote")
                            ? "contained"
                            : "outlined"
                        }
                        onClick={() => {
                          handleChangeWorkType("remote", data);
                        }}
                      >
                        Remote
                      </Button>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        )}
      </Stack>
    </>
  );
}

export default AutoCompleteInput;
