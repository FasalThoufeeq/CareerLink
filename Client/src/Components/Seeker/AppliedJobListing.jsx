import { Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppliedJobs, CancelJob } from "../../Redux/seekerSlice/seekerJobSlice";
import AppliedJobCard from "./AppliedJobCard";

const AppliedJobListing = () => {
  const dispatch = useDispatch();
  const [isCancelled, setIsCancelled] = useState(false);
  const profileId = useSelector(
    (state) => state?.seekers?.seekers?.profile?._id
  );
  const profile = useSelector(
    (state) => state?.seekers?.seekers?.profile
  );
  const [appliedJobs, setAppliedJobs] = useState([]);
  console.log(appliedJobs, "lll");
  useEffect(() => {
    const gettingProfile = async () => {
      const response = await dispatch(AppliedJobs(profileId));
      console.log(response?.payload?.data?.profile?.appliedJobs, "úseffect");
      setAppliedJobs(response?.payload?.data?.profile?.appliedJobs);
    };
    gettingProfile();
  }, [isCancelled]);
  const handleCancel = async (jobId) => {
    const response = await dispatch(CancelJob({ jobId, profileId }));
    if (response?.payload?.data?.status == "success") {
      setIsCancelled(!isCancelled)
    }
  };
  const [page, setpage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const rowsPerPage = 3;
  const displayJobs = appliedJobs
    ? appliedJobs?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
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
        APPLIED JOBS
      </Typography>
      {displayJobs && displayJobs.length > 0
        ? displayJobs.map((job) => {
            return (
              <AppliedJobCard
                key={job}
                companyLogo="companyLogo"
                requiredSkills={job?._id?.skills}
                jobTitle={job?._id?.jobTitle}
                jobType={job?._id?.jobType}
                jobVacancies={job?._id?.jobVacancies}
                jobTiming={job?._id?.jobTiming}
                about={job?._id?.about}
                essentialKnowledge={job?._id?.essentialKnowledge}
                qualification={job?._id?.qualification}
                experience={job?._id?.experience}
                salaryPackage={job?._id?.salary}
                jobLocation={job?._id?.jobLocation}
                createdAt={job?._id?.createdAt}
                jobId={job?._id?._id}
                appliedStatus={job?.status}
                onCancelClick={handleCancel}
              />
            );
          })
        : null}
        <Pagination
        count={Math.ceil(appliedJobs?.length / rowsPerPage)}
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

export default AppliedJobListing;
