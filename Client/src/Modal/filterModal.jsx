import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


const FilterModal = ({ onFilter }) => {
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
       style={{display: 'flex',
       alignItems: 'center',
       justifyContent: 'center',}}
        open={open}
        onClose={handleClose}
        aria-labelledby="filter-modal"
        aria-describedby="filter-modal-description"
      >
        <div style={{backgroundColor: '#ffffff', 
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
    padding: '16px 32px 24px',
    width: '400px',
    borderRadius: '25px',}}>
          <h2 id="filter-modal">Filter Jobs</h2>
          <FormControl  style={{marginBottom:'10px',
    minWidth: '120px',
    width: '100%',}}>
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
          <FormControl style={{marginBottom:'10px',
    minWidth: '120px',
    width: '100%',}}>
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
          <FormControl style={{
    minWidth: '120px',
    width: '100%',}}>
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
