import { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";


const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState(" ");
 
  return (
    <Paper
      style={{
        backgroundColor: "#D5D5D5",
        borderRadius: "10px",
        width: "40%",
        margin: "0 auto",
        marginTop: "1rem",

        padding: "8px",

        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
      elevation={0}
    >
      <IconButton style={{ color: "#757575" }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        style={{ marginLeft: "8px", flex: 1, width: "500px" }}
        placeholder="Serach Jobs..."
        value={searchTerm}
        onChange={(e) => { 
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
    </Paper>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
