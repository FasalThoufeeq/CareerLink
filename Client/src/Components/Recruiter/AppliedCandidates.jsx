import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import CandidateCard from "./CandidatesCard";
import { AppliedCandidates } from "../../Redux/recuiterSlice/recruiterjobSlice";

const AppliedCandidate = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobId = params.get("jobId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [saveClicked, setSaveClicked] = useState([]);
  const handleSaveClick = () => {
    setSaveClicked(!saveClicked);
  };
  useEffect(() => {
    const ViewCandidates = () => {
      dispatch(AppliedCandidates(jobId))
        .then((response) => {
          setCandidates(response?.payload?.data?.Candidates?.appliedUsers);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    ViewCandidates();
  }, [saveClicked]);
  const [page, setpage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };
  const rowsPerPage = 3;
  const displayJobs = candidates
    ? candidates?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
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
        APPLIED CANDIDATES
      </Typography>
      {displayJobs && displayJobs.length > 0
        ? displayJobs.map((candidate) => {
            return (
              <CandidateCard
                firstName={candidate?.firstName}
                lastName={candidate?.lastName}
                email={candidate?.email}
                phoneNumber={candidate?.phoneNumber}
                languages={candidate?.languages}
                jobId={jobId}
                applicantId={candidate?._id}
                appliedJobs={candidate?.appliedJobs}
                key={candidate?._id}
                handleStatusChange={handleSaveClick}
              />
            );
          })
        : null}

      <Pagination
        count={Math.ceil(candidates?.length / rowsPerPage)}
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

export default AppliedCandidate;
