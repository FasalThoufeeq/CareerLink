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
        companyName: jobDetails?.recruiterId?.companyName,
      })
    );
  };
  const handleSaveClick = async () => {
    const response = await dispatch(
      ChangeStatus({ jobId, applicantId, changedStatus })
    );
    const socket = io("https://careerlink.cloud:3000");
    socket.emit("sendNotification", {
      receiverId: applicantId,
      notification: `Your Application status has been ${changedStatus} for ${jobDetails?.jobTitle} in ${jobDetails?.recruiterId?.companyName} at ${jobDetails?.jobLocation}`,
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

  return (
    <>
      <Container
        style={{
          display: "flex",
          backgroundColor: "#fff",
          padding: "16px",
          marginBottom: "16px",
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "24px",
          width: "45rem",
          position: "relative",
        }}
        maxWidth="md"
      >
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <Avatar
                alt="Profile"
                src={profile ? profile : "profile"}
                style={{ marginRight: "16px", width: "48px", height: "48px" }}
              />
            </div>
            <div>
              <Grid Container direction="column" spacing={2}>
                <Grid
                  item
                  style={{
                    display: "block",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "bolder",
                      color: "gray",
                      marginRight: "8px",
                    }}
                    variant="h6"
                  >
                    {firstName} {lastName}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      marginLeft: "8px",
                      display: "flex",
                      alignItems: "center",
                      color: "gray",
                      marginRight: "8px",
                    }}
                  >
                    <span>
                      <EmailIcon />
                    </span>
                    {email}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      marginTop: "8px",
                      marginLeft: "16px",
                      display: "flex",
                      alignItems: "center",
                      color: "#4287f5",
                    }}
                    variant="body2"
                  >
                    <span>
                      <CallIcon style={{ marginRight: "6px" }} />{" "}
                    </span>
                    {phoneNumber}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      marginTop: "8px",
                      marginLeft: "16px",
                      display: "flex",
                      alignItems: "center",
                      color: "#4287f5",
                    }}
                    variant="body2"
                  >
                    <span>
                      <SchoolIcon style={{ marginRight: "6px" }} />{" "}
                    </span>
                    {education ? education : "Not Provided"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    marginLeft: "8px", // Use your desired value here
                    display: "flex",
                    alignItems: "center",
                    color: "#4287f5",
                  }}
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
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    marginLeft: "8px", // Use your desired value here
                    display: "flex",
                    alignItems: "center",
                  }}
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
                <div>
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

            <div
              style={{
                position: "absolute",
                bottom: "8px", // Use your desired value here
                right: "8px",
              }}
            >
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
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
            startIcon={<VideocamIcon style={{ marginRight: "8px" }} />}
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
  _id: PropTypes.string.isRequired,
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
