import { useEffect, useState } from "react";
import UserImage from "./userImage";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import "./chats.css";
import { useDispatch } from "react-redux";
import { getRecruiter, getSeeker } from "../../Redux/chatSlice/chatSlice";
const Chats = ({ data, currentUserId, online }) => {
  const dispatch = useDispatch();
  const [recruiterData, setRecruiterData] = useState(null);
  const [seekerData, setSeekerData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    console.log(userId,"userId");
    const userIdIndex = data?.members.indexOf(userId);
    const getUserData = async () => {
      try {
        if (userIdIndex == 0) {
          const response = await dispatch(getRecruiter(userId));
          if (response?.payload?.data?.status == "success") {
            setRecruiterData(response?.payload?.data?.profile);
          }
        } else {
          const response = await dispatch(getSeeker(userId));
          if (response?.payload?.data?.status == "success") {
            setSeekerData(response?.payload?.data?.profile);
          }
          console.log(response,'res');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  console.log(seekerData,recruiterData);
  return (
    <>
      <div className="conversation">
        <div>
          {online && <div className="online-dot"></div>}

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <UserImage
              image={
                seekerData
                  ? seekerData?.profilePicture
                  : recruiterData?.companylogo
              }
              size="55px"
            />
            <Box>
              <Typography
                variant="h5"
                fontWeight="500"
                style={{ marginLeft: "10px" }}
              >
                {seekerData
                  ? seekerData?.firstName
                  : recruiterData?.companyName}
              </Typography>
              <Typography fontSize="0.75rem" style={{ marginLeft: "10px" }}>
                {online ? "Online" : "Offline"}
              </Typography>
            </Box>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};
Chats.propTypes = {
  data: PropTypes.object.isRequired,
  currentUserId: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};
export default Chats;
