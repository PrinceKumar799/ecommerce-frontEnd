import { AppBar, Toolbar, useMediaQuery, useTheme, Box } from "@mui/material";

import DrawerNav from "./DrawerNav";
import SearchBar from "./SearchBar";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import HeaderTabs from "./HeaderTabs";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar position="sticky" color="inherit" className="header">
      <Toolbar className="toolbar">
        <Box onClick={() => navigate("/")}>
          <CatchingPokemonIcon color="info" />
        </Box>
        <Box className="search-bar-box">
          <SearchBar />
        </Box>
        {isMediumScreen ? <DrawerNav /> : <HeaderTabs />}

        {/* {isLoggedIn ? (
          <Box>
            <IconButton color="inherit" onClick={() => navigate("/carts")}>
              <Badge badgeContent={0} color="error">
                Cart {isLoggedIn}
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => navigate(`/users/userDetails`)}
            >
              Profile <AccountCircleIcon />
            </IconButton>
          </Box>
        ) : (
          <Button onClick={() => navigate("/login")}>Login {isLoggedIn}</Button>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
