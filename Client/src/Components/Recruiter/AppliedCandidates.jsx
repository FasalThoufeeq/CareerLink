import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import CandidateCard from "./CandidatesCard";
import {
  AppliedCandidates,
  PushNotification,
} from "../../Redux/recuiterSlice/recruiterjobSlice";
import ClipLoader from "react-spinners/ClipLoader";
import CandidateSkeleton from "../candidateSkeleton";
import { createChat } from "../../Redux/chatSlice/chatSlice";
import { io } from "socket.io-client";

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
  const senderId = useSelector(
    (state) => state?.recruiters?.recruiters?.profile?._id
  );
  const recruiterProfile = useSelector(
    (state) => state?.recruiters?.recruiters?.profile
  );
  const handleChatButtonClick = async (receiverId) => {
    const formData = {
      senderId: senderId,
      recieverId: receiverId,
    };

    const response = await dispatch(createChat(formData));
    if (response?.payload?.data?.status == "success") {
      navigate("/recruiter/chat");
    }
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

  const handleVideoCall = async (roomID) => {
    const socket = io("http://localhost:3000");
    socket.emit("sendNotification", {
      receiverId: roomID,
      notification:`Video Call Scheduled Pls check your Notification`
    });
    const roomUrl = `http://localhost:5173/room/${roomID}`;
    // await handleSend(event);
    navigate(`/recruiter/room/${roomID}`);
    const notification = `According to your job application, the ${recruiterProfile?.companyName} company has scheduled an interview for you. You can join through this link: ${roomUrl}`;
    await dispatch(
      PushNotification({
        applicantId: roomID,
        notification,
        notificationSummary: "Interview Scheduled",
      })
    );
  };
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
      {loading && <CandidateSkeleton cards={3} />}
      {!loading && displayJobs && displayJobs.length > 0
        ? displayJobs.map((candidate) => {
            return (
              <CandidateCard
                _id={candidate._id}
                firstName={candidate?.firstName}
                lastName={candidate?.lastName}
                email={candidate?.email}
                phoneNumber={candidate?.phoneNumber}
                skills={candidate?.skills}
                languages={candidate?.languages}
                jobId={jobId}
                profile={candidate?.profilePicture}
                education={candidate?.education}
                applicantId={candidate?._id}
                resume={candidate?.resume}
                appliedJobs={candidate?.appliedJobs}
                key={candidate?._id}
                handleStatusChange={handleSaveClick}
                onChatButtonClick={() => handleChatButtonClick(candidate?._id)}
                handleVideoCall={() => handleVideoCall(candidate?._id)}
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
