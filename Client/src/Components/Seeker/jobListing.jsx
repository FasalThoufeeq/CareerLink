import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import JobContainer from "./JobContainer";
import { useDispatch, useSelector } from "react-redux";
import { ApplyJobs, GetAllJobs } from "../../Redux/seekerSlice/seekerJobSlice";
import { Pagination } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import FilterModal from "../../Modal/filterModal";

const JobListing = () => {
  const [liveApply, setLiveAplly] = useState(false);
  const [loading, setLoading] = useState(false);
  const jobs = useSelector((state) => state?.seekerJobs?.jobs?.data?.jobs);
  const applicantId = useSelector(
    (state) => state?.seekers?.seekers?.user?.profileId
  );
  console.log(applicantId);
  const dispatch = useDispatch();
  useEffect(() => {
    const getjobs = async () => {
      try {
        await dispatch(GetAllJobs());
      } catch (error) {
        console.log(error);
      }
    };
    getjobs();
  }, [liveApply]);
  const handleApply = async (jobId) => {
    setLoading(true);
    const response = await dispatch(ApplyJobs({ jobId, applicantId }));
    if (response?.payload?.data?.status == "success") {
      setLiveAplly(!liveApply);
      setLoading(false);
    }
  };
  const [searchValue, setSearchValue] = useState('');
  const [searchedJob, setSearchedJob] = useState("");
  const handleSearch = (searchValue) => {
    setSearchValue(searchValue.toLowerCase().trim());
  };
  useEffect(() => {
    const searched =
      jobs.length > 0
        ? jobs?.filter((job) => {
            const { jobTitle, jobLocation, skills } = job;
            const skill = skills.join("");
            return (
              jobLocation.toLowerCase().includes(searchValue.toLowerCase()) ||
              jobTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
              skill.toLowerCase().includes(searchValue.toLowerCase())
            );
          })
        : [];
    setSearchedJob(searched);
    setpage(1)
  }, [jobs, searchValue]);
  const handleFilter = (filters) => {
    const { salary, jobTitle, location } = filters;

    const filtered = jobs?.filter((job) => {
      const jobSalary = job?.salary.toLowerCase();
      const jobLocation = job?.jobLocation.toLowerCase();
      const jobTitleLowerCase = job?.jobTitle.toLowerCase();

      return (
        (salary === '' || jobSalary === salary) &&
        (jobLocation === '' || jobLocation.includes(location.toLowerCase())) &&
        (jobTitle === '' || jobTitleLowerCase.includes(jobTitle.toLowerCase()))
      );
    });

    setSearchedJob(filtered);
    setpage(1);
  };
  const [page, setpage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const rowsPerPage = 3;
  const displayJobs = searchedJob
    ? searchedJob?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];

    console.log(searchValue,"searchValue");
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <FilterModal onFilter={handleFilter} />
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            marginBottom: "30px",
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
      {displayJobs && displayJobs.length > 0
        ? displayJobs.map((job) => {
            return (
              <JobContainer
                key={job._id}
                companyLogo={job.recruiterId.companylogo}
                requiredSkills={job.skills}
                jobTitle={job.jobTitle}
                jobType={job.jobType}
                jobVacancies={job.jobVacancies}
                jobTiming={job.jobTiming}
                about={job.about}
                essentialKnowledge={job.essentialKnowledge}
                qualification={job.qualification}
                experience={job.experience}
                salaryPackage={job.salary}
                jobLocation={job.jobLocation}
                createdAt={job.createdAt}
                jobId={job._id}
                appliedJobsCheck={job}
                ApplicantId={applicantId}
                onApplicantsClick={handleApply}
              />
            );
          })
        : null}
      <Pagination
        count={Math.ceil(searchedJob?.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        color="primary"
        shape="rounded"
        sx={{
          display: "flex",
          justifyContent: "center",
          // marginRight: '35rem',
          marginBottom: "5rem",
          marginTop: "5rem",
        }}
      />
    </>
  );
};

export default JobListing;
