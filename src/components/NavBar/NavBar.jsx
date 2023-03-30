import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as userService from "../../utilities/users-service";
import Hidden from "@mui/material/Hidden";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar({user, setUser}) {
  const welcomeMessage = user === null ? "" : `Hi, ${user.name}!`;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [loginMenuAnchorEl, setLoginMenuAnchorEl] = React.useState(null);
  const isLoginMenuOpen = Boolean(loginMenuAnchorEl);

  const handleLoginMenuOpen = (event) => {
    setLoginMenuAnchorEl(event.currentTarget);
  };

  const handleLoginMenuClose = (callback) => {
    setLoginMenuAnchorEl(null);
    if (callback) {
      callback();
    }
  };
  

  const handleLogOut = async () => {
    handleMenuClose();
    userService.logOut();
    setUser(null);
    navigate("/");
  };
  

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
  );

  const loginMenuId = "login-menu";
  const renderLoginMenu = (
    <Menu
      anchorEl={loginMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={loginMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isLoginMenuOpen}
      onClose={() => handleLoginMenuClose()}
    >
      <MenuItem
        onClick={() => handleLoginMenuClose(() => navigate("/users/login"))}
      >
        Login
      </MenuItem>
      <MenuItem
        onClick={() => handleLoginMenuClose(() => navigate("/users/register"))}
      >
        Register
      </MenuItem>
    </Menu>
  );
  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { user ? ([
      <MenuItem>
        <IconButton
          size="large"
          aria-label="your favourites"
          color="inherit"
        >
          <Badge color="error">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
        <p>Your Favourites</p>
      </MenuItem>,
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>


      ]) : ([
      <MenuItem
        onClick={() => handleLoginMenuClose(() => navigate("/users/login"))}
      >
        Login
      </MenuItem>,
      <MenuItem
        onClick={() => handleLoginMenuClose(() => navigate("/users/register"))}
      >
        Register
      </MenuItem>

      ])}
        </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src="/favicon.png" alt="NLB Logo" height="40" style={{backgroundColor: "#fff", borderRadius: "50%", padding: "1px"}} />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Hidden smDown>
            {welcomeMessage}
          </Hidden>  
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ? (
            <>
              <IconButton size="large" color="inherit">
                <Badge color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
            ) : (
              <>
              <IconButton
                size="large"
                edge="end"
                aria-controls={loginMenuId}
                aria-haspopup="true"
                onClick={handleLoginMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {renderLoginMenu}
            </>
          )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}