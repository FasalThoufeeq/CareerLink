import {
  Button,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { logoutSeeker } from "../../Redux/seekerSlice/seekerSlice";
import { useDispatch, useSelector } from "react-redux";
import { GettingSeekerProfile } from "../../Redux/seekerSlice/seekerJobSlice";
import ClipLoader from "react-spinners/ClipLoader";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const profileId = useSelector(
    (state) => state?.seekers?.seekers?.profile?._id
  );
  const [UserProfile, setUserProfile] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const GetProfile = async () => {
      setloading(true);
      const response = await dispatch(GettingSeekerProfile(profileId));
      if (response?.payload?.data?.status === "success") {
        setUserProfile(response?.payload?.data?.profile);
        setloading(false);
      }
    };
    GetProfile();
  }, []);
  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          <ClipLoader
            color="#4287f5"
            loading={loading}
            // cssOverride={override}
            size={50}
            align="center"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {!loading && (
        <Container
          maxWidth="md"
          style={{ display: "flex", marginBottom: "5rem" }}
        >
          <Grid container spacing={3}>
            {/* Sidebar */}
            <Grid item xs={12} md={3} sx={{ marginTop: "12rem" }}>
              <Paper elevation={3} sx={{ padding: "20px" }}>
                <List
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <ListItem sx={{ justifyContent: "center" }}>
                    <Button
                      component={Link}
                      to="/profile"
                      startIcon={
                        <AccountCircleIcon style={{ color: "gray" }} />
                      }
                    >
                      <ListItemText
                        primary="My Profile"
                        style={{ color: "gray" }}
                      />
                    </Button>
                  </ListItem>
                  <ListItem sx={{ justifyContent: "center" }}>
                    <Button
                      component={Link}
                      to="/applied_jobs"
                      startIcon={<FactCheckIcon style={{ color: "gray" }} />}
                    >
                      <ListItemText
                        primary="Applied Jobs"
                        style={{ color: "gray" }}
                      />
                    </Button>
                  </ListItem>
                  <ListItem sx={{ justifyContent: "center" }}>
                    <Button
                      component={Link}
                      to="/profile"
                      startIcon={<LockResetIcon style={{ color: "gray" }} />}
                    >
                      <ListItemText
                        primary="Reset password"
                        style={{ color: "gray" }}
                      />
                    </Button>
                  </ListItem>
                  <ListItem sx={{ justifyContent: "center" }}>
                    <Button
                      onClick={() => {
                        toast.warning(
                          <div>
                            <p>Are you sure you want to logout?</p>
                            <div>
                              <Button
                                color="success"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                  dispatch(logoutSeeker());
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
                      component={Link}
                      startIcon={<LogoutIcon style={{ color: "gray" }} />}
                    >
                      <ListItemText
                        primary="Logout"
                        style={{ color: "gray" }}
                      />
                    </Button>
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* "Paper" section */}
            <Grid item xs={12} md={9} sx={{ marginTop: "5rem" }}>
              <Typography variant="h4">My Profile</Typography>
              <Paper elevation={3} sx={{ padding: "20px", marginTop: "15px" }}>
                <Grid style={{marginBottom:'2rem'}}>
                  {UserProfile?.profilePicture && (
                    <img
                      src={UserProfile?.profilePicture}
                      alt="Profile Pic"
                      style={{
                        width: "130px",
                        height: "130px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  {!UserProfile?.profilePicture && (
                    <AccountCircleIcon
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">First Name:</Typography>
                    <Typography>{UserProfile?.firstName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Last Name:</Typography>
                    <Typography>{UserProfile?.lastName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Email:</Typography>
                    <Typography>{UserProfile?.email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Contact Number:</Typography>
                    <Typography>{UserProfile?.phoneNumber}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Education:</Typography>
                    {UserProfile?.education ? (
                      <Typography>{UserProfile?.education}</Typography>
                    ) : (
                      <Typography style={{ color: "red" }}>
                        Not Provided
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Languages:</Typography>
                    {UserProfile?.languages?.length > 0 ? (
                      <Grid container spacing={1}>
                        {UserProfile?.languages.map((language, index) => (
                          <Grid item key={index}>
                            <Chip label={language} />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography style={{ color: "red" }}>
                        Not Provided
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                  <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
                    <Button
                      variant="contained"
                      startIcon={<DocumentScannerIcon />}
                      style={{ backgroundColor: "#333" }}
                      onClick={() => {
                        UserProfile?.resume
                          ? window.open(UserProfile?.resume, "_blank")
                          : toast.warning("Please Upload a Resume");
                      }}
                    >
                      Preview Resume
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      component={Link}
                      to="/update_profile"
                      style={{ backgroundColor: "#333" }}
                    >
                      Edit Profile
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProfileContainer;
