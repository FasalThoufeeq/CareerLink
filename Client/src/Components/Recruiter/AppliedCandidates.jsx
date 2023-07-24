import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import CandidateCard from "./CandidatesCard";
import { AppliedCandidates } from "../../Redux/recuiterSlice/recruiterjobSlice";
import ClipLoader from "react-spinners/ClipLoader";
import CandidateSkeleton from "../candidateSkeleton";

const AppliedCandidate = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobId = params.get("jobId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [saveClicked, setSaveClicked] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSaveClick = () => {
    setSaveClicked(!saveClicked);
  };
  useEffect(() => {
    const ViewCandidates = () => {
      setLoading(true);
      dispatch(AppliedCandidates(jobId))
        .then((response) => {
          setCandidates(response?.payload?.data?.Candidates?.appliedUsers);
          setLoading(false);
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
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            marginBottom:'30px'
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
      {loading && <CandidateSkeleton cards={3}/>}
      {!loading && displayJobs && displayJobs.length > 0
        ? displayJobs.map((candidate) => {
            return (
              <CandidateCard
                firstName={candidate?.firstName}
                lastName={candidate?.lastName}
                email={candidate?.email}
                phoneNumber={candidate?.phoneNumber}
                languages={candidate?.languages}
                jobId={jobId}
                profile={candidate?.profilePicture}
                education={candidate?.education}
                applicantId={candidate?._id}
                resume={candidate?.resume}
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
