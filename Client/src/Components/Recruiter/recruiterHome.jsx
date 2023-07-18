
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllJobs } from "../../Redux/recuiterSlice/recruiterjobSlice";
import JobCard from "./jobCard";
import { Pagination, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const RecruiterHome = () => {
  const recruiterId = useSelector(
    (state) => state?.recruiters?.recruiters?.recruiter?._id
  );
  const jobsById = useSelector(
    (state) => state?.jobs?.jobsById?.data?.RecruiterJobs
  );
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleApplicantsClick = (jobId) => {
    navigate(`/recruiter/applied_candidates?jobId=${jobId}`);
  };
  useEffect(() => {
    const getJobs = () => {
      dispatch(GetAllJobs(recruiterId))
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getJobs();
  }, []);
  const [page, setpage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const rowsPerPage = 3;
  const displayJobs = jobsById
    ? jobsById?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];
  return (
    <>
      <Typography
        style={{ marginTop: "40px" }}
        variant="h5"
        component="h1"
        align="center"
        gutterBottom
      >
        YOUR JOBS
      </Typography>
      {displayJobs?.length > 0
        ? displayJobs.map((job) => {
            return (
              <JobCard 
              companyLogo="logo"
              key={job?._id}
              jobLocation={job?.jobLocation}
              requiredSkills={job?.skills}
              jobTitle={job?.jobTitle}
              salaryPackage={job?.salary}
              createdAt={job?.createdAt}
              onApplicantsClick={()=>handleApplicantsClick(job?._id)}
              />
            );
          })
        : null}
        <Pagination
        count={Math.ceil(jobsById?.length / rowsPerPage)}
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

export default RecruiterHome;
