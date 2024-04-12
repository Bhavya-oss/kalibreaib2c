"use client";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";

const CustomSearchField = styled(TextField)(({ theme }) => ({
  border: "2px solid rgba(47, 43, 67, 0.10)",
  borderRadius: "20px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  marginTop: { xs: "45px", sm: "0px" },
}));

function ModelSearchInput(props) {
  const { searchQuery, setSearchQuery } = props;

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      handleClearSearch();
    }
  }, [search]);

  const handleSearchChange = (event) => {

    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearch("");
    setSearchQuery("");
  };

  return (
    <>
      <CustomSearchField
        size="small"
        placeholder="Search here..."

        onChange={handleSearchChange}
        value={searchQuery}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
                {searchQuery != "" && <IconButton onClick={handleClearSearch}>
                  <CloseIcon />
                </IconButton>}
            </InputAdornment>
          ),
        }}

        
      />
    </>
  );
}

export default ModelSearchInput;
