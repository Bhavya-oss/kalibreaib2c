"use Client";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ModelSearchInput from "./ModelSearchInput";
import { isArrayIterable } from "@/utils/CustomFunctions";
import CheckBoxInput from "../inputs/CheckBoxInput";

function FiltersModel(props) {
  const {
    isModelOpen,
    setIsModelOpen,
    filterList,
    selectedFilterList,
    handleChangeCheckBox,
    searchQuery,
    setSearchQuery
  } = props;

  const handleCloseModal = () => {
    setIsModelOpen(false);
  };

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
      >
        <DialogTitle>
          <ModelSearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          />
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
        <DialogContent
          sx={{ height: "30rem", columnCount: 4, columnGap: "16px" }}
        >
          {isArrayIterable(filterList) &&
            filterList?.map((data, idx) => (
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
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default FiltersModel;
