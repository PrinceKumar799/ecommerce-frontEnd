import { Search as SearchIcon } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { edit } from "../features/search/searchSlice";
// interface SearchFilterProps {
//   handleNameFilter: (data: string) => void;
// }
const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    dispatch(edit(searchValue));
  };
  return (
    <Box className="search-bar">
      <IconButton style={{ padding: "8px", pointerEvents: "none" }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search…"
        value={searchValue}
        onChange={handleChange}
        style={{ width: "90%" }}
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
};

export default SearchBar;
