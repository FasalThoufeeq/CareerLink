import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SchoolIcon from "@mui/icons-material/School";
import { LogoutRecruiter } from "../../Redux/recuiterSlice/recruiterSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const pages = ["YOUR JOBS", "POST JOB"];
const settings = ["Profile", "Logout"];

function RecruiterHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
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
              marginLeft: "auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pages.map((page) => {
              if (page == "YOUR JOBS") {
                return (
                  <Button
                    variant="text"
                    key={page}
                    onClick={() => {
                      navigate("/recruiter");
                      handleCloseNavMenu();
                    }}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontFamily: "monospace",
                      fontWeight: 800,
                      letterSpacing: ".3rem",
                      textDecoration: "none",
                      marginLeft: "50px",
                      marginRight: "50px",
                    }}
                  >
                    {page}
                  </Button>
                );
              }
              if (page == "POST JOB") {
                return (
                  <Button
                    variant="text"
                    key={page}
                    onClick={() => {
                      navigate("/recruiter/post_jobs");
                      handleCloseNavMenu();
                    }}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontFamily: "monospace",
                      fontWeight: 800,
                      letterSpacing: ".3rem",
                      textDecoration: "none",
                      marginLeft: "50px",
                      marginRight: "50px",
                    }}
                  >
                    {page}
                  </Button>
                );
              }
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                if (setting == "Profile") {
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/recruiter/update_profile");

                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  );
                }
                if (setting == "Logout") {
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
                                  dispatch(LogoutRecruiter());
                                  toast.success("Logout succefully");
                                }}
                                style={{ marginRight: "1rem" }}
                              >
                                Yes
                              </Button>
                              <Button
                                color="error"
                                variant="contained"
                                size="small"
                                onClick={toast.dismiss()}
                              >
                                No
                              </Button>
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
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default RecruiterHeader;
