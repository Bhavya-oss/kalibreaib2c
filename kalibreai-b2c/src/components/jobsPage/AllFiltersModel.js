import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useRef } from "react";
import { isArrayIterable } from "@/utils/CustomFunctions";
import { MyContext } from "@/context/ContextProvider";
import FilterCheckBox from "./FilterCheckBox";
import { CLEAR_BUTTON_STRING } from "@/constants/TextConstants";

function AllFiltersModel(props) {
  const {
    isModelOpen,
    setIsModelOpen,
    showClearBtn,
    resetSelectedFilters,
    selectedId,
  } = props;

  const { globalState } = useContext(MyContext);

  const handleCloseModal = () => {
    setIsModelOpen(false);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedId) {
      // Delay scrolling until the component has rendered
      setTimeout(() => {
        const element = document.getElementById(`filter-${selectedId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Adjust the delay as needed
    }
  }, [selectedId]);

  return (
    <Box>
      <Dialog
        open={isModelOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "20px",
          },
        }}
        onEnter={() => {
          const element = document.getElementById("rrr");
          console.log("getting data ===", element);
        }}
      >
        <DialogTitle>
          {showClearBtn && (
            <Button onClick={resetSelectedFilters}>
              {CLEAR_BUTTON_STRING}
            </Button>
          )}

          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "gray",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent ref={containerRef}>
          {isArrayIterable(globalState?.filters?.list) &&
            globalState?.filters?.list?.map((data) => {
              if (data?.type === "checkbox") {
                return (
                  <Box
                    sx={{ marginTop: "5px" }}
                    key={data.id}
                    id={`filter-${data.id}`}
                  >
                    <FilterCheckBox {...data} />
                  </Box>
                );
              } else {
              }
            })}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AllFiltersModel;
