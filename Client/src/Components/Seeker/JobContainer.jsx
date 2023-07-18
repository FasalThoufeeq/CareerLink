import { useState } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import JobDetailsModal from "../../Modal/JobDetailsModal";
import VerifiedIcon from "@mui/icons-material/Verified";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start", // Align items to flex-start
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: theme.spacing(3),
    width: "40rem",
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
    color: theme.palette.success.main,
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

const JobContainer = ({
  companyLogo,
  requiredSkills,
  jobTitle,
  salaryPackage,
  jobLocation,
  createdAt,
  jobId,
  appliedJobsCheck,
  ApplicantId,
  onApplicantsClick,
  jobType,
  jobVacancies,
  jobTiming,
  about,
  essentialKnowledge,
  qualification,
  experience,
}) => {
  const [viewModal, setViewModal] = useState(false);
  const isApplied = appliedJobsCheck?.appliedUsers?.some(
    (_id) => _id == ApplicantId
  );
  const postedDays = () => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = currentDate - createdDate;
    const daysSinceCreation = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    if (daysSinceCreation >= 30 && daysSinceCreation < 365) {
      const value = Math.floor(daysSinceCreation / 30);
      if (value == 1) {
        return `${value} month ago`;
      }
      return `${value} months ago`;
    } else if (daysSinceCreation >= 365) {
      const value = Math.floor(daysSinceCreation / 365);
      if (value == 1) {
        return `${value} year ago`;
      }
      return `${value} years ago`;
    } else {
      if (daysSinceCreation == 1) {
        return `${daysSinceCreation} day ago`;
      }
      return `${daysSinceCreation} days ago`;
    }
  };

  const handleApplyClick = () => {
    onApplicantsClick(jobId); // Invoke the function with the jobId
  };
  const handleViewModalOpen = () => {
    setViewModal(true);
  };

  const handleViewModalClose = () => {
    setViewModal(false);
  };

  const classes = useStyles();
  return (
    <>
      <Container
        style={{ display: "flex", justifyContent: "space-between" }}
        maxWidth="md"
        className={classes.container}
      >
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <Avatar
                alt="Company Logo"
                src={companyLogo}
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
                    {jobTitle}
                  </Typography>
                  <Typography variant="body2" className={classes.location}>
                    <span className={classes.LocationOnIcon}>
                      <LocationOnIcon />
                    </span>
                    {jobLocation}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{ marginTop: "8px" }}
                    variant="body2"
                    className={classes.salary}
                  >
                    <span className={classes.rupeeIcon}>
                      <PaidIcon style={{ marginRight: "6px" }} />{" "}
                    </span>{" "}
                    ₹{salaryPackage}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  className={classes.skills}
                >
                  {requiredSkills.length > 0
                    ? requiredSkills.map((skill, index) => (
                        <Chip
                          style={{
                            color: "white",
                            backgroundColor: "#4287f5",
                            borderColor: "#4287f5",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          }}
                          key={index}
                          label={skill}
                          variant="outlined"
                          className={classes.chip}
                          clickable={false}
                        />
                      ))
                    : null}
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    <span>
                      <AccessTimeIcon />
                    </span>
                    {postedDays()}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.buttons}>
            {isApplied ? (
              <Button
                variant="outlined"
                style={{
                  color: "black",
                  borderRadius: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginBottom: "5px",
                  marginRight: "5px",
                }}
                startIcon={<VerifiedIcon className={classes.personIcon} />}
                className={classes.applicationButton}
              >
                Applied
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{
                  color: "black",
                  borderRadius: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  marginBottom: "5px",
                  marginRight: "5px",
                }}
                startIcon={<SendIcon className={classes.personIcon} />}
                className={classes.applicationButton}
                onClick={handleApplyClick}
              >
                Apply
              </Button>
            )}
          </div>
        </div>
        <div
          onClick={() => {
            handleViewModalOpen();
          }}
        >
          <VisibilityIcon />
        </div>
      </Container>
      {/* view  modal */}
      <JobDetailsModal
        handleClose={handleViewModalClose}
        open={viewModal}
        companyLogo={companyLogo}
        requiredSkills={requiredSkills}
        jobTitle={jobTitle}
        salaryPackage={salaryPackage}
        jobLocation={jobLocation}
        jobId={jobId}
        jobType={jobType}
        jobVacancies={jobVacancies}
        jobTiming={jobTiming}
        about={about}
        essentialKnowledge={essentialKnowledge}
        qualification={qualification}
        experience={experience}
      />
    </>
  );
};
JobContainer.propTypes = {
  companyLogo: PropTypes.string.isRequired,
  requiredSkills: PropTypes.array.isRequired,
  jobTitle: PropTypes.string.isRequired,
  salaryPackage: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onApplicantsClick: PropTypes.func.isRequired,
  appliedJobsCheck: PropTypes.array.isRequired,
  ApplicantId: PropTypes.string.isRequired,
  jobId: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  jobVacancies: PropTypes.string.isRequired,
  jobTiming: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  essentialKnowledge: PropTypes.string.isRequired,
  qualification: PropTypes.string.isRequired,
  experience: PropTypes.string.isRequired,
};

export default JobContainer;
