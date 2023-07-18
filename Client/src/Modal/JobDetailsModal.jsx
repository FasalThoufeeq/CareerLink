import {} from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  Avatar,

  Chip,
  Grid,
  Paper,
 
  Typography,
} from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    maxWidth: "90vw", // Set maximum width to avoid horizontal overflow
    maxHeight: "80vh", // Set maximum height to limit the modal height
    overflowY: "scroll", // Enable vertical scrolling
    scrollbarWidth: "none", // Hide the scrollbar for Firefox (for other browsers, see the CSS below)
    "&::-webkit-scrollbar": {
      // Hide the scrollbar for Chrome, Safari, and Edge
      display: "none",
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 10,
    p: 3,
  };
const paperStyle = { padding: "30px 20px", width: 600, margin: "20px auto" };
const headerStyle = { margin: 0 };
const avatarStyle = {
  backgroundColor: "#437cb5",
  marginBottom: "10px",
  width: "60px",
  height: "60px",
};
// const roleStyle=

const JobDetailsModal = ({
  handleClose,
  open,
  companyLogo,
  requiredSkills,
  jobTitle,
  salaryPackage,
  jobLocation,
  jobId,
  jobType,
  jobVacancies,
  jobTiming,
  about,
  essentialKnowledge,
  qualification,
  experience,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style}>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center" style={{ marginBottom: "50px" }}>
              <Avatar style={avatarStyle}>
                <AccountCircleIcon />
              </Avatar>
              <h2 style={headerStyle}>Brototype</h2>
              <h5 style={headerStyle}>{jobLocation}</h5>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Role :
                </span>{" "}
              </Typography>

              <Typography >
                <span
                  style={{ color: "grey", fontWeight: "bold", gridColumn: "2" }}
                >
                  {jobTitle}
                </span>{" "}
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Qualification :
                </span>{" "}
              </Typography>
              <Typography>
                <span
                  style={{ color: "grey", fontWeight: "bold", gridColumn: "2" }}
                >
                  {qualification}
                </span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Salary :
                </span>{" "}
              </Typography>
              <Typography>
                <span
                  style={{ color: "grey", fontWeight: "bold", gridColumn: "2" }}
                >
                  {salaryPackage}
                </span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Experience:
                </span>{" "}
              </Typography>
              <Typography>
                <span
                  style={{ color: "grey", fontWeight: "bold", gridColumn: "2" }}
                >
                  {experience}
                </span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Vacancies:
                </span>{" "}
              </Typography>
              <Typography>
                <span
                  style={{ color: "grey", fontWeight: "bold", gridColumn: "2" }}
                >
                  {jobVacancies}
                </span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Type :
                </span>{" "}
              </Typography>
              <Typography>
                <span
                  style={{ color: "grey", fontWeight: "bold", gridColumn: "2" }}
                >
                  {jobType}
                </span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Timing :
                </span>{" "}
              </Typography>
              <Typography>
                <span
                  style={{ color: "grey", fontWeight: "bold", gridColumn: "2" }}
                >
                  {jobTiming}
                </span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Skills :
                </span>{" "}
              </Typography>
              <Typography>
                <span style={{ color: "grey", gridColumn: "2" }}>
                  {requiredSkills && requiredSkills.length > 0
                    ? requiredSkills.map((skill, index) => {
                        return (
                          <Chip
                            style={{
                              color: "white",
                              backgroundColor: "#437cb5",
                              borderColor: "#437cb5",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                              marginRight:'5px',
                              marginTop:'8px'
                            }}
                            key={index}
                            label={skill}
                            variant="outlined"
                            //   className={classes.chip}
                            clickable={false}
                          />
                        );
                      })
                    : null}
                </span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  About :
                </span>{" "}
              </Typography>
              <Typography>
                <span style={{ color: "grey", gridColumn: "2" }}>{about}</span>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "grid",
                gridTemplateColumns: "150px auto", // Adjust the width as needed
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "500",
                    gridColumn: "1",
                  }}
                >
                  Essential Knowledge :
                </span>{" "}
              </Typography>
              <Typography>
                <span style={{ color: "grey", gridColumn: "2" }}>
                  {essentialKnowledge}
                </span>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Modal>
    </>
  );
};
JobDetailsModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  companyLogo: PropTypes.string.isRequired,
  requiredSkills: PropTypes.array.isRequired,
  jobTitle: PropTypes.string.isRequired,
  salaryPackage: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  jobVacancies: PropTypes.string.isRequired,
  jobTiming: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  essentialKnowledge: PropTypes.string.isRequired,
  qualification: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
};

export default JobDetailsModal;
