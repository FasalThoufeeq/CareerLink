import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ChatIcon from "@mui/icons-material/Chat";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import SeekerLoginModal from "../../Modal/SeekerLoginModal";
import SeekerRegisterModal from "../../Modal/SeekerRegisterModal";
import { useSelector, useDispatch } from "react-redux";
import { logoutSeeker } from "../../Redux/seekerSlice/seekerSlice";
import {toast} from 'react-toastify'
import {Button} from "@mui/material"

const settings = ["Profile", "Logout", "Login", "Register"];

const UserHeader = () => {
  const token = useSelector((state) => state?.seekers?.seekers?.token);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleOpen = (modalType) => {
    if (modalType === "Login") {
      setLoginModalOpen(true);
    } else if (modalType === "Register") {
      setRegisterModalOpen(true);
    }
  };
  const handleOpenSignUpModal = () => {
    setRegisterModalOpen(true);
  };
  const handleClose = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#fff",
        color: "#19376D",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CareerLink
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/chat"
                  sx={{
                    my: 2,
                    color: "#19376D",
                    display: "block",
                    md: "flex",
                  }}
                >
                  <ChatIcon sx={{ mr: 1, mt: 1 }} />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <SchoolIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CareerLink
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              marginLeft: 5,
            }}
          >
            <Typography
              onClick={handleCloseNavMenu}
              component={Link}
              to="/chat"
              sx={{
                my: 2,
                color: "#19376D",
                display: "block",
                md: "flex",
              }}
            >
              <ChatIcon sx={{ mr: 1, mt: 1 }} />
            </Typography>
          </Box>

          {/* Login and Register Modals */}
          <SeekerLoginModal
            handleClose={handleClose}
            open={loginModalOpen}
            handleSignUp={handleOpenSignUpModal}
          />
          <SeekerRegisterModal
            handleClose={handleClose}
            open={registerModalOpen}
            handleLogin={handleOpen}
          />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp">P</Avatar>
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
              {settings.map((setting) => {
                if (setting == "Profile" && token) {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
                if (setting == "Logout" && token) {
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        toast.warning(
                          <div>
                            <p>Are you sure you want to logout?</p>
                            <div>
                              <Button
                              color="success"
                              variant="contained"
                              size="small"
                                onClick={() => {
                                  dispatch(logoutSeeker())
                                  toast.success('Logout succefully')
                                }}
                                style={{ marginRight: "1rem" }}
                              >
                                Yes
                              </Button>
                              <Button color="error" variant="contained" size="small" onClick={toast.dismiss()}>No</Button>
                            </div>
                          </div>,
                          {
                            autoClose: false,
                          }
                        );
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
                if (setting == "Login" && !token) {
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        handleOpen("Login");
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
                if (setting == "Register" && !token) {
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        handleOpen("Register");
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default UserHeader;
