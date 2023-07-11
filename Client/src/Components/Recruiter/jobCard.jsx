import {} from "react";
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
import Groups2Icon from "@mui/icons-material/Groups2";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#EBEBEB",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "flex-start", // Align items to flex-start
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: theme.spacing(1),
    width: "40rem",
    position: "relative",
  },
  logo: {
    marginRight: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  jobTitleContainer: {
    display: "flex",
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
    color: theme.palette.success.main,
  },
  LocationOnIcon: {
    color: "gray",
  },
  buttons: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  editButton: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  applicationButton: {
    color: theme.palette.primary.main,
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  personIcon: {
    marginRight: theme.spacing(1),
  },
}));
const JobCard = ({
  companyLogo,
  requiredSkills,
  jobTitle,
  salaryPackage,
  jobLocation,
  createdAt,
}) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const timeDifference = currentDate - createdDate;
  const daysSinceCreation = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="md" className={classes.container}>
        <Avatar alt="Company Logo" src={companyLogo} className={classes.logo} />
        <Grid Container direction="column" spacing={2}>
          <Grid item className={classes.jobTitleContainer}>
            <Typography variant="h6" className={classes.jobTitle}>
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
            <Typography variant="body2" className={classes.salary}>
              <span className={classes.rupeeIcon}>₹</span>
              {salaryPackage}
            </Typography>
          </Grid>
          <Grid item className={classes.skills}>
            {requiredSkills.length > 0
              ? requiredSkills.map((skill, index) => (
                  <Chip
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
            <Typography variant="body2" className={classes.salary}>
              <span className={classes.rupeeIcon}>
                <AccessTimeIcon />
              </span>
              {daysSinceCreation} days ago
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            className={classes.editButton}
            //   onClick={onEditClick}
          >
            Edit
          </Button>
        </div>
        <Button
          variant="outlined"
          startIcon={<Groups2Icon className={classes.personIcon} />}
          className={classes.applicationButton}
          // onClick={onApplicantsClick}
        >
          Applications
        </Button>
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
};

export default JobCard;
