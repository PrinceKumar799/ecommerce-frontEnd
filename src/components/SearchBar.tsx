import { Search as SearchIcon } from "@mui/icons-material";
import { IconButton, InputBase } from "@mui/material";
import { useState } from "react";

interface SearchFilterProps {
  handleNameFilter: (data: string) => void;
}
const SearchBar: React.FC<SearchFilterProps> = ({ handleNameFilter }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleNameFilter(e.target.value);
  };
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "4px",
        backgroundColor: "#f1f1f1",
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        marginBottom: "1.5rem",
      }}
    >
      <IconButton style={{ padding: "8px", pointerEvents: "none" }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search…"
        value={searchValue}
        onChange={handleChange}
        style={{ marginLeft: "8px", width: "100%" }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
};

export default SearchBar;
