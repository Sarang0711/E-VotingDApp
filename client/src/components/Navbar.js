import * as React from "react";
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useNavigate } from "react-router-dom";

const settings = ["Logout"];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSetting = (event) => {
    switch (event.currentTarget.innerText) {
      case "Profile":
        console.log("Profile");
        break;
      case "Logout":
        navigate("/");
        console.log("Logout");
        break;
      default:
        console.log("Default");
        handleCloseUserMenu();
    }
  };

  return (
    <AppBar position="static" sx={{background:'#000110'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AcUnitIcon sx={{mr:1}}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BlockVote
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonOutlineIcon alt="Remy Sharp" src="url" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleSetting}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
