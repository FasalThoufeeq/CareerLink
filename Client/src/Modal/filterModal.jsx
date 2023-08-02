import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 400,
    borderRadius:25
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const FilterModal = ({ onFilter }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [salaryFilter, setSalaryFilter] = useState("");
  const [jobLocationFilter, setJobLocationFilter] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState("");

  const jobs = useSelector((state) =>
    state?.seekerJobs?.jobs?.data?.jobs
      ? state?.seekerJobs?.jobs?.data?.jobs
      : []
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = () => {
    const filters = {
      salary: salaryFilter,
      jobTitle: jobTitleFilter,
      location: jobLocationFilter,
    };
    onFilter(filters);
    handleClose();
  };

  // Extract unique values from the jobs array for location, job title, and salary
  const uniqueLocations = [
    ...new Set(jobs?.length > 0 ? jobs?.map((job) => job?.jobLocation) : ""),
  ];
  const uniqueJobTitles = [
    ...new Set(jobs?.length > 0 ? jobs?.map((job) => job?.jobTitle) : ""),
  ];
  const uniqueSalaries = [
    ...new Set(jobs?.length > 0 ? jobs?.map((job) => job?.salary) : ""),
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <FilterAltIcon />
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="filter-modal"
        aria-describedby="filter-modal-description"
      >
        <div className={classes.modalContent}>
          <h2 id="filter-modal">Filter Jobs</h2>
          <FormControl className={classes.formControl} style={{marginBottom:'10px'}}>
            <InputLabel id="salary-filter-label">Salary</InputLabel>
            <Select
              labelId="salary-filter-label"
              id="salary-filter"
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {uniqueSalaries.map((salary) => (
                <MenuItem key={salary} value={salary}>
                  {salary}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} style={{marginBottom:'10px'}}>
            <InputLabel id="location-filter-label">Location</InputLabel>
            <Select
              labelId="location-filter-label"
              id="location-filter"
              value={jobLocationFilter}
              onChange={(e) => setJobLocationFilter(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {uniqueLocations.map((jobLocation) => (
                <MenuItem key={jobLocation} value={jobLocation}>
                  {jobLocation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="job-title-filter-label">Job Title</InputLabel>
            <Select
              labelId="job-title-filter-label"
              id="job-title-filter"
              value={jobTitleFilter}
              onChange={(e) => setJobTitleFilter(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {uniqueJobTitles.map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            className={classes.buttonContainer}
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Refine Jobs
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

FilterModal.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
export default FilterModal;
