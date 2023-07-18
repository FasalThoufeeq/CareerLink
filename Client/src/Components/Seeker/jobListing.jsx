import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import JobContainer from "./JobContainer";
import { useDispatch, useSelector } from "react-redux";
import { ApplyJobs, GetAllJobs } from "../../Redux/seekerSlice/seekerJobSlice";
import { Pagination } from "@mui/material";

const JobListing = () => {
  const [liveApply, setLiveAplly] = useState(false);
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
  console.log(applicantId);
  const handleApply = async (jobId) => {
    const response = await dispatch(ApplyJobs({ jobId, applicantId }));
    if (response?.payload?.data?.status == "success") {
      setLiveAplly(!liveApply);
    }
  };
  const [page, setpage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const rowsPerPage = 3;
  const displayJobs = jobs
    ? jobs?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <SearchBar />
      </div>
      {displayJobs && displayJobs.length > 0
        ? displayJobs.map((job) => {
            return (
              <JobContainer
                key={job._id}
                companyLogo="company Logo"
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
        count={Math.ceil(jobs?.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        color="primary"
        shape="rounded"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          // marginRight: '35rem',
          marginBottom: '5rem',
          marginTop:'5rem'
        }}
      />
    </>
  );
};

export default JobListing;
