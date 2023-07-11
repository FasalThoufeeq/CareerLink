
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAlltJobs } from "../../Redux/recuiterSlice/recruiterjobSlice";
import JobCard from "./jobCard";
import { Typography } from "@mui/material";

const RecruiterHome = () => {
  const recruiterId = useSelector(
    (state) => state?.recruiters?.recruiters?.recruiter?._id
  );
  const jobsById = useSelector(
    (state) => state?.jobs?.jobsById?.data?.RecruiterJobs
  );
  const isArray = Array.isArray(jobsById);
  console.log(isArray, "????????????????");
  console.log(jobsById);
  const dispatch = useDispatch();
  useEffect(() => {
    const getJobs = () => {
      dispatch(GetAlltJobs(recruiterId))
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getJobs();
  }, []);
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
      {jobsById?.length > 0
        ? jobsById.map((job) => {
            return (
              <JobCard 
              companyLogo="logo"
              key={job?._id}
              jobLocation={job?.jobLocation}
              requiredSkills={job?.skills}
              jobTitle={job?.jobTitle}
              salaryPackage={job?.salary}
              createdAt={job?.createdAt}
              />
            );
          })
        : null}
    </>
  );
};

export default RecruiterHome;
