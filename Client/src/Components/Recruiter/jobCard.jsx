import {} from "react";
import PropTypes from "prop-types";
import { format } from "timeago.js";

import {
  Avatar,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Groups2Icon from "@mui/icons-material/Groups2";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";

const JobCard = ({
  companyLogo,
  requiredSkills,
  jobTitle,
  salaryPackage,
  jobLocation,
  createdAt,
  onApplicantsClick,
  onEditClick,
}) => {
  return (
    <>
      <Container
        style={{
          display: "flex",
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
                style={{ fontWeight: "bolder", color: "gray" }}
                variant="h6"
              >
                {jobTitle}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  marginLeft: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ color: "gray", fontSize: "5px", marginRight: "8px" }}
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
                  marginLeft: "9px",
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
        <div style={{ position: "absolute", bottom: "8px", right: "8px" }}>
          <Button
            style={{
              color: "black",
              borderRadius: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: "5px",
              marginRight: "8px",
              position: "absolute",
              bottom: "9.3rem",
              right: "8px",
            }}
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={onEditClick}
          >
            Edit
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
            startIcon={<Groups2Icon style={{ marginRight: "8px" }} />}
            onClick={onApplicantsClick}
          >
            Applications
          </Button>
        </div>
      </Container>
    </>
  );
};
JobCard.propTypes = {
  companyLogo: PropTypes.string.isRequired,
  requiredSkills: PropTypes.array.isRequired,
  jobTitle: PropTypes.string.isRequired,
  salaryPackage: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onApplicantsClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default JobCard;
