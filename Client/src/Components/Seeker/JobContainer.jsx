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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import JobDetailsModal from "../../Modal/JobDetailsModal";
import VerifiedIcon from "@mui/icons-material/Verified";
import { toast } from "react-toastify";
import { format } from "timeago.js";

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

  const handleApplyClick = () => {
    onApplicantsClick(jobId); // Invoke the function with the jobId
  };
  const handleViewModalOpen = () => {
    setViewModal(true);
  };

  const handleViewModalClose = () => {
    setViewModal(false);
  };

  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: "16px",
          marginBottom: "16px",

          alignItems: "flex-start",
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "24px",
          width: "40rem",
          position: "relative",
        }}
        maxWidth="md"
      >
        <div>
          <div style={{ display: "flex" }}>
            <div>
              <Avatar
                alt="Company Logo"
                src={companyLogo}
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
                    {jobTitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      display: "block",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        color: "gray",
                        fontSize: "5px",
                        marginRight: "8px",
                      }}
                    >
                      <LocationOnIcon />
                    </span>
                    {jobLocation}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      marginTop: "8px",
                      marginLeft: "16px",
                      display: "flex",
                      alignItems: "center",
                      color: "#4caf50",
                    }}
                    variant="body2"
                  >
                    <span>
                      <PaidIcon style={{ marginRight: "6px" }} />{" "}
                    </span>{" "}
                    ₹{salaryPackage}
                  </Typography>
                </Grid>
                <Grid
                  item
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    display: "flex",
                    gap: "8px",
                  }}
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
                    {format(createdAt)}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
            
            {isApplied ? (
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
                startIcon={<VerifiedIcon style={{ marginRight: "8px" }} />}
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

                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
                startIcon={<SendIcon style={{ marginRight: "8px" }} />}
                onClick={() => {
                  ApplicantId
                    ? handleApplyClick()
                    : toast.error("Please Login to Aplly");
                }}
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
