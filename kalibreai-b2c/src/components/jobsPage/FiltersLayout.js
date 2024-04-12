"use client";

import { CLEAR_BUTTON_STRING } from "@/constants/TextConstants";
import { MyContext } from "@/context/ContextProvider";
import {
  INTIAL_SELECTED_FILTERS,
  countNonEmptyArray,
  isArrayIterable,
  isFilterApplied,
} from "@/utils/CustomFunctions";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import FilterCheckBox from "./FilterCheckBox";
import TuneIcon from "@mui/icons-material/Tune";
import AllFiltersModel from "./AllFiltersModel";

const LargeScreenFilterCardStyle = {
  display: {
    xs: "none",
    sm: "none",
    md: "block",
    lg: "block",
    xl: "block",
  },
};

const SmallScreenFilterCardStyle = {
  display: {
    xs: "block",
    sm: "block",
    md: "none",
    lg: "none",
    xl: "none",
  },
};

function FiltersLayout() {
  const { globalState, dispatch } = useContext(MyContext);

  const [showClearBtn, setShowClearBtn] = useState(false);
  const [isAllFilterModelOpen, setIsAllFilterModelOpen] = useState(false);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const isChanged =
      JSON.stringify(globalState.selectedFilters) !=
      JSON.stringify(INTIAL_SELECTED_FILTERS);

    const appliedCount = countNonEmptyArray(globalState.selectedFilters);

    setAppliedFiltersCount(appliedCount);

    setShowClearBtn(isChanged);
  }, [globalState.selectedFilters]);

  const resetSelectedFilters = () => {
    dispatch({ type: "selected_filter", payload: INTIAL_SELECTED_FILTERS });
  };

  // console.log("filters ======", globalState);

  return (
    <>
      <Card sx={LargeScreenFilterCardStyle}>
        <CardHeader
          title="Filters"
          action={
            <>
              {showClearBtn && (
                <Button onClick={resetSelectedFilters}>
                  {CLEAR_BUTTON_STRING}
                </Button>
              )}
            </>
          }
        />

        <Divider />

        <CardContent>
          {isArrayIterable(globalState?.filters?.list) &&
            globalState?.filters?.list?.map((data) => {
              if (data?.type === "checkbox") {
                return (
                  <Box sx={{ marginTop: "5px" }} key={data.id}>
                    <FilterCheckBox {...data} />
                  </Box>
                );
              } else {
              }
            })}
        </CardContent>
      </Card>

      <Card sx={SmallScreenFilterCardStyle}>
        <CardContent>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setIsAllFilterModelOpen(true);
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                justifyContent="center"
                alignItems="center"
              >
                <TuneIcon />
                {appliedFiltersCount != 0 && (
                  <Badge badgeContent={appliedFiltersCount} color="primary" />
                )}
              </Stack>
            </Button>
            <Box
              sx={{
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                  position: "relative",
                },
              }}
            >
              <Stack direction="row" spacing={1.5}>
                {isArrayIterable(globalState?.filters?.list) &&
                  globalState?.filters?.list?.map((data) => {
                    return (
                      <Button
                        variant={
                          isFilterApplied(globalState, data.value)
                            ? "contained"
                            : "outlined"
                        }
                        key={data.id}
                        sx={{ whiteSpace: "nowrap", minWidth: "100px" }}
                        size="small"
                        onClick={() => {
                          setIsAllFilterModelOpen(true);
                          setSelectedId(data.id);
                        }}
                      >
                        {data?.name}
                      </Button>
                    );
                  })}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <AllFiltersModel
        isModelOpen={isAllFilterModelOpen}
        setIsModelOpen={setIsAllFilterModelOpen}
        showClearBtn={showClearBtn}
        resetSelectedFilters={resetSelectedFilters}
        selectedId={selectedId}
      />
    </>
  );
}

export default FiltersLayout;
