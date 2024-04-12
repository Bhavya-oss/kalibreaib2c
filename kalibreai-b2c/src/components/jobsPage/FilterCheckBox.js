"use client";

import {
  SHOW_LESS_BUTTON_STRING,
  SHOW_MORE_BUTTON_STRING,
} from "@/constants/TextConstants";
import { MyContext } from "@/context/ContextProvider";
import { isArrayIterable, moveToFirstIndex } from "@/utils/CustomFunctions";
import api from "@/utils/HttpCommons";
import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import FiltersModel from "./FiltersModel";
import CheckBoxInput from "../inputs/CheckBoxInput";

function FilterCheckBox(props) {
  const { name, count, datalist, value, multiselect, show_more, endpoint } =
    props;

  const [filterList, setFilterList] = useState(datalist);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { globalState, dispatch } = useContext(MyContext);

  const isTabView = useMediaQuery("(max-width:900px)")

  //   console.log("ddd list ===", globalState.selectedFilters);

  const getAllFilterList = async (url) => {
    try {
      const response = await api.get(url);

      // console.log("all filters ===", response.data);
      setFilterList(response.data.results);
    } catch (error) {
      console.log("error from getAllFilterList : ", error);
    }
  };

  useEffect(() => {
    if (endpoint && isModelOpen) {
      getAllFilterList(endpoint);
    }
  }, [isModelOpen]);

  const selectedFilterList = [...(globalState?.selectedFilters[value] || [])];

  const handleChangeCheckBox = useCallback(
    (e) => {
      //copying the globalselected filters
      let tempFilters = { ...globalState?.selectedFilters };
      //assinging the selected value to variables
      let selectedValue = e.target.value;

      if (isModelOpen && e.target.checked) {
        //move to first index selected element
        let tempArray = moveToFirstIndex(filterList, selectedValue);
        setFilterList(tempArray);
      }

      //checking is it multiple select
      if (multiselect) {
        //cheking selected value is presented in global selected array
        if (tempFilters[value]?.includes(selectedValue)) {
          tempFilters[value] = tempFilters[value]?.filter(
            (list) => list != selectedValue
          );
        } else {
          tempFilters[value] = [selectedValue, ...tempFilters[value]];
        }
      } else {
        if (tempFilters[value]?.includes(selectedValue)) {
          tempFilters[value] = tempFilters[value]?.filter(
            (list) => list != selectedValue
          );
        } else {
          tempFilters[value] = [selectedValue];
        }
      }

      //dispatching the global state
      dispatch({ type: "selected_filter", payload: tempFilters });

      //   console.log("selected =====", e.target.value);
      //   console.log("selected all filters =====", tempFilters);
    },
    [globalState?.selectedFilters, value, multiselect, isModelOpen, filterList]
  );

  //visible filters list
  const visibleList = isModelOpen
    ? [...(filterList || [])]
    : [...(filterList?.slice(0, count) || [])];

  const searchFilterList =
    Array?.isArray(filterList) &&
    filterList?.filter((data) => {
      return (
        data?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        data?.description
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase()) ||
        data?.value?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    });

  return (
    <>
      <Box>
        <Typography variant="h6">{name}</Typography>
        {isArrayIterable(visibleList) &&
          visibleList?.map((data, idx) => (
            <Box key={idx}>
              <CheckBoxInput
                label={data?.name}
                value={data?.value}
                checked={selectedFilterList?.includes(data?.value)}
                handleChange={handleChangeCheckBox}
                size="small"
              />
            </Box>
          ))}

        {show_more && (
          <Button
            onClick={() => {
              setSearchQuery("");
              setIsModelOpen(!isModelOpen);
            }}
            variant="outlined"
            size="small"
          >
            {isModelOpen ? SHOW_LESS_BUTTON_STRING : SHOW_MORE_BUTTON_STRING}
          </Button>
        )}
      </Box>

     {!isTabView && <FiltersModel
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        filterList={searchFilterList}
        selectedFilterList={selectedFilterList}
        handleChangeCheckBox={handleChangeCheckBox}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />}
      <Divider sx={{ marginTop: "8px", marginBottom: "16px" }} />
    </>
  );
}

export default FilterCheckBox;
