import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CallIcon from "@mui/icons-material/Call";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import VideocamIcon from "@mui/icons-material/Videocam";
import SchoolIcon from "@mui/icons-material/School";
import ForumIcon from "@mui/icons-material/Forum";
import EmailIcon from "@mui/icons-material/Email";
import { useDispatch } from "react-redux";
import {
  ChangeStatus,
  GetJobDetails,
  InviteEmail,
  PushNotification,
} from "../../Redux/recuiterSlice/recruiterjobSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start", // Align items to flex-start
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: theme.spacing(3),
    width: "45rem",
    position: "relative",
  },
  logo: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  jobTitleContainer: {
    display: "block",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  jobTitle: {
    fontWeight: "bold",
    color: "black",
    marginRight: theme.spacing(1),
  },
  location: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  skills: {
    display: "flex",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    backgroundColor: theme.palette.primary.main, // Set primary blue color
    color: theme.palette.primary.contrastText,
  },
  salary: {
    marginLeft: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    color: "#4287f5",
  },
  LocationOnIcon: {
    color: "gray",
    fontSize: "5px",
    marginRight: theme.spacing(1),
  },
  buttons: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  editButton: {
    color: "black",
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  applicationButton: {
    color: "black",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  personIcon: {
    marginRight: theme.spacing(1),
  },
}));

const CandidateCard = ({
  _id,
  firstName,
  lastName,
  email,
  phoneNumber,
  languages,
  skills,
  education,
  profile,
  jobId,
  applicantId,
  appliedJobs,
  resume,
  handleStatusChange,
  onChatButtonClick,
  handleVideoCall,
}) => {
  const dispatch = useDispatch();
  const [changedStatus, setChangedStatus] = useState();
  const [jobDetails, setJobDetails] = useState();

  const handleChatButtonClick = () => {
    if (onChatButtonClick) {
      onChatButtonClick();
    }
  };
  useEffect(() => {
    const GetJob = async () => {
      const response = await dispatch(GetJobDetails(jobId));
      if (response?.payload?.data?.status == "success") {
        setJobDetails(response?.payload?.data?.jobDetails);
      }
    };
    GetJob();
  }, []);
  const appliedJob = appliedJobs.find((job) => job._id === jobId);
  let statusColor = "black";
  if (appliedJob?.status === "pending") {
    statusColor = "#4287f5";
  } else if (appliedJob?.status === "Selected") {
    statusColor = "green";
  } else if (appliedJob?.status === "Rejected") {
    statusColor = "red";
  } else if (appliedJob?.status === "Shortlisted") {
    statusColor = "#4287f5";
  }
  const handleInvite = async () => {
    await dispatch(
      InviteEmail({
        name: firstName,
        email,
        roomId: _id,
        jobTitle: jobDetails?.jobTitle,
        companyName:jobDetails?.recruiterId?.companyName
      })
    );
  };
  const handleSaveClick = async () => {
    const response = await dispatch(
      ChangeStatus({ jobId, applicantId, changedStatus })
    );
    const socket = io("http://localhost:3000");
    socket.emit("sendNotification", {
      receiverId: applicantId,
      notification:`Your Application status has been ${changedStatus} for ${jobDetails?.jobTitle} in ${jobDetails?.recruiterId?.companyName} at ${jobDetails?.jobLocation}`
    });

    if (response?.payload?.data?.status == "success") {
      const notification = `Hi${firstName}, Your Application status has been ${changedStatus} for ${jobDetails?.jobTitle} in ${jobDetails?.recruiterId?.companyName} at ${jobDetails?.jobLocation} `;
      await dispatch(
        PushNotification({
          applicantId,
          notification,
          notificationSummary: "Job Application Status Changed",
        })
      );
    }
    handleStatusChange();
  };
  const classes = useStyles();
  return (
    <>
      <Container
        style={{ display: "flex" }}
        maxWidth="md"
        className={classes.container}
      >
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <Avatar
                alt="Profile"
                src={profile ? profile : "profile"}
                className={classes.logo}
              />
            </div>
            <div>
              <Grid Container direction="column" spacing={2}>
                <Grid item className={classes.jobTitleContainer}>
                  <Typography
                    style={{ fontWeight: "bolder", color: "gray" }}
                    variant="h6"
                    className={classes.jobTitle}
                  >
                    {firstName} {lastName}
                  </Typography>
                  <Typography variant="body2" className={classes.location}>
                    <span className={classes.LocationOnIcon}>
                      <EmailIcon />
                    </span>
                    {email}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ marginTop: "8px" }}
                    variant="body2"
                    className={classes.salary}
                  >
                    <span className={classes.rupeeIcon}>
                      <CallIcon style={{ marginRight: "6px" }} />{" "}
                    </span>
                    {phoneNumber}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ marginTop: "8px" }}
                    variant="body2"
                    className={classes.salary}
                  >
                    <span>
                      <SchoolIcon style={{ marginRight: "6px" }} />{" "}
                    </span>
                    {education ? education : "Not Provided"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  className={classes.skills}
                >
                  <Typography style={{ color: "#4287f5", marginLeft: "15px" }}>
                    Skills :
                  </Typography>
                  {skills.length > 0 ? (
                    skills.map((skill, index) => {
                      return (
                        <Chip
                          key={index}
                          style={{
                            color: "white",
                            backgroundColor: "#4287f5",
                            borderColor: "#4287f5",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                          label={skill}
                          variant="outlined"
                          className={classes.chip}
                          clickable={false}
                        />
                      );
                    })
                  ) : (
                    <Typography style={{ color: "red", marginLeft: "5px" }}>
                      Not added yet
                    </Typography>
                  )}
                </Grid>
                <Grid
                  item
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  className={classes.skills}
                >
                  <Typography style={{ color: "#4287f5", marginLeft: "15px" }}>
                    Languages :
                  </Typography>
                  {languages.length > 0 ? (
                    languages.map((language, index) => {
                      return (
                        <Chip
                          key={index}
                          style={{
                            color: "white",
                            backgroundColor: "#4287f5",
                            borderColor: "#4287f5",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                          label={language}
                          variant="outlined"
                          className={classes.chip}
                          clickable={false}
                        />
                      );
                    })
                  ) : (
                    <Typography style={{ color: "red", marginLeft: "5px" }}>
                      Not Provided
                    </Typography>
                  )}
                </Grid>
                <div className={classes.status}>
                  <InputLabel
                    id="application-status-label"
                    style={{ marginLeft: "10px" }}
                  >
                    Application Status:{" "}
                    <span style={{ color: statusColor }}>
                      {appliedJob?.status}
                    </span>
                  </InputLabel>
                  <Select
                    style={{
                      width: "150px",
                      height: "40px",
                      color: "black",
                      borderRadius: "20px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    labelId="application-status-label"
                    value={changedStatus}
                    onChange={(event) => setChangedStatus(event.target.value)}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                    <MenuItem value="Selected">Selected</MenuItem>
                  </Select>
                  <Button
                    style={{
                      marginLeft: "10px",
                      marginBottom: "4px",
                      color: "black",
                      borderRadius: "20px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    variant="outlined"
                    onClick={() => handleSaveClick()}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </div>

            <div className={classes.buttons}>
              <Button
                style={{
                  color: "black",
                  borderRadius: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginBottom: "5px",
                  marginRight: "8px",
                }}
                variant="outlined"
                startIcon={<InsertInvitationIcon />}
                className={classes.editButton}
                onClick={() => {
                  handleInvite();
                }}
              >
                INVITE
              </Button>
              <Button
                style={{
                  color: "black",
                  borderRadius: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginBottom: "5px",
                  marginRight: "8px",
                }}
                variant="outlined"
                startIcon={<PlagiarismIcon />}
                className={classes.editButton}
                onClick={() => {
                  resume
                    ? window.open(resume, "_blank")
                    : toast.warning("Resume Not Provided yet");
                }}
              >
                VIEW RESUME
              </Button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", top: "8px", right: "8px" }}>
          <Button
            style={{
              color: "black",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: "5px",
              marginRight: "8px",
            }}
            variant="outlined"
            startIcon={<ForumIcon />}
            className={classes.editButton}
            onClick={handleChatButtonClick}
          >
            CHAT
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "black",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: "5px",
              marginRight: "5px",
            }}
            startIcon={<VideocamIcon className={classes.personIcon} />}
            className={classes.applicationButton}
            onClick={handleVideoCall}
          >
            SCHEDULE
          </Button>
        </div>
      </Container>
    </>
  );
};
CandidateCard.propTypes = {
  _id:PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  jobId: PropTypes.string.isRequired,
  applicantId: PropTypes.string.isRequired,
  appliedJobs: PropTypes.array.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  education: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  resume: PropTypes.string.isRequired,
  onChatButtonClick: PropTypes.func.isRequired,
  handleVideoCall: PropTypes.func.isRequired,
  skills: PropTypes.array.isRequired,
};
export default CandidateCard;
