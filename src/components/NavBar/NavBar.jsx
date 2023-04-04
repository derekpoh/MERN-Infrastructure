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
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography, Divider, ListItemText, ListItemIcon, Paper } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Favorite from "@mui/icons-material/Favorite";
import OutletIcon from '@mui/icons-material/Outlet';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import OutdoorGrill from "@mui/icons-material/OutdoorGrill";
import GroupsIcon from '@mui/icons-material/Groups';
import HelpIcon from '@mui/icons-material/Help';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(2),
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

const WelcomeText = styled(Typography)(({ theme}) => ({
  color: "inherit",
  marginLeft: theme.spacing(5),
  margingRight: theme.spacing(5)
}));

export default function NavBar({user, setUser}) {
  const welcomeMessage = user === null ? "" : `Hello, ${user.name.toUpperCase()}!`;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState("");
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const [leftMenuAnchorEl, setLeftMenuAnchorEl] = React.useState(null);
  const [mobileLeftMenuAnchorEl, setMobileLeftMenuAnchorEl] = React.useState(null);
  const isLeftMenuOpen = Boolean(leftMenuAnchorEl);
  const isMobileLeftMenuOpen = Boolean(mobileLeftMenuAnchorEl);

  const [leftLoginMenuAnchorEl, setLeftLoginMenuAnchorEl] = React.useState(null);
  const isLeftLoginMenuOpen = Boolean(setLeftLoginMenuAnchorEl); 

  const handleLeftMenuOpen = (event) => {
    setLeftMenuAnchorEl(event.currentTarget);
  }

  const handleLeftMenuClose = () => {
    setLeftMenuAnchorEl(null);
    handleLeftMobileMenuClose();
  }
  
  const handleLeftMobileMenuOpen = (event) => {
    setMobileLeftMenuAnchorEl(event.currentTarget);
  };
  
  const handleLeftMobileMenuClose = () => {
    setMobileLeftMenuAnchorEl(null);
  };

  const handleLeftLoginMenuOpen = (event) => {
    setLeftLoginMenuAnchorEl(event.currentTarget);
  };
  
  const handleLeftLoginMenuClose = (callback) => {
    setLeftLoginMenuAnchorEl(null);
    if (callback) {
      callback();
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
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

  const handleSearchInput = async (event) => {
    setSearchInput(event.target.value);
  };
  
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return
    }
    navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    setSearchInput("");
  }
  const leftMenuId = 'left-menu';
  const renderLeftMenu = (
    <Menu
      anchorEl={leftMenuAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id={leftMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isLeftMenuOpen}
      onClose={handleLeftMenuClose}
      PaperProps={{elevation:0}}
    >
       <Paper sx={{ width: 240, maxWidth: '100%' }}>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/books/featured"));}}>
          <ListItemIcon>
            <StarIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>Featured</ListItemText>
      </MenuItem>
      <Divider/>
      <MenuItem>
        <ListItemText>Genres:</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/books/genres/Romance"));}}>
          <ListItemIcon>
            <Favorite fontSize="small" />
          </ListItemIcon>
        <ListItemText>Romance</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/books/genres/Thriller"));}}>
          <ListItemIcon>
            <OutletIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>Thriller</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/books/genres/Children"));}}>
          <ListItemIcon>
            <ChildCareIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>Children</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/books/genres/Cooking"));}}>
          <ListItemIcon>
            <OutdoorGrill fontSize="small" />
          </ListItemIcon>
        <ListItemText>Cooking</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/books/genres/Multi-Cultural"));}}>
          <ListItemIcon>
            <GroupsIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>Multi-Cultural</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => {handleLeftMenuClose(); handleLeftLoginMenuClose(() => navigate("/books/genres/Mystery"));}}>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText>Mystery</ListItemText>
      </MenuItem>
      </Paper>
    </Menu>
  );


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
      <MenuItem onClick={() => handleLoginMenuClose(() => navigate("/users/account"))}>
        My Account
      </MenuItem>
      <Divider/>
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
        key="login"
        onClick={() => handleLoginMenuClose(() => navigate("/users/login"))}
      >
        Login
      </MenuItem>
      <MenuItem
        key="register"
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
      <MenuItem key="your favourites">
        <Link to="/users/account/favourites">
          <IconButton
            size="large"
            aria-label="your favourites"
            color="inherit"
          >
            <Badge color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
        Favourites
        </Link>
      </MenuItem>,
      <MenuItem key="my-account" onClick={() => handleLoginMenuClose(() => navigate("/users/account"))}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>My Account</p>
      </MenuItem>,
      <MenuItem key="logout" onClick={handleLogOut}>
        <IconButton
          size="large"
          aria-label="logout"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>

      ]) : ([
      <MenuItem 
        key="login"
        onClick={() => handleLoginMenuClose(() => navigate("/users/login"))}
      >
        Login
      </MenuItem>,
      <MenuItem
        key="register"
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
            sx={{ mr: 1 }}
            onClick={handleLeftMenuOpen}
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
            <form onSubmit={handleSearchSubmit}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInput}
              value={searchInput}
            />
            </form>
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Hidden smDown>
            <WelcomeText>{welcomeMessage}</WelcomeText>
          </Hidden>  
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ? (
            <>
            <Link to="/users/account/favourites">
              <IconButton size="large" color="inherit" style={{ color: "white" }}>
                  <FavoriteBorderIcon />
              </IconButton>
               </Link>
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
      {renderLeftMenu}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}