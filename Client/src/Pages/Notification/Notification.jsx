import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch, useSelector } from "react-redux";
import { GettingSeekerProfile } from "../../Redux/seekerSlice/seekerJobSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { notificationCountReset } from "../../Redux/seekerSlice/seekerSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const [UserProfile, setUserProfile] = useState();
  const [loading, setloading] = useState(false);
  const profileId = useSelector(
    (state) => state?.seekers?.seekers?.profile?._id
  );
  useEffect(() => {
    dispatch(notificationCountReset())
    const GetProfile = async () => {
      setloading(true);
      const response = await dispatch(GettingSeekerProfile(profileId));
      if (response?.payload?.data?.status === "success") {
        setUserProfile(response?.payload?.data?.profile);
        setloading(false);
      }
    };
    GetProfile();
  }, []);
  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            marginBottom: "30px",
            marginTop: "30px",
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

      {!loading && (
        <Container
          maxWidth="md"
          style={{ textAlign: "center", marginTop: "40px", height: "97vh" }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            NOTIFICATIONS
          </Typography>
          {UserProfile?.notifications?.length > 0 &&
            UserProfile?.notifications
              .slice(-10)
              .reverse()
              .map((notification) => {
                return (
                  <Accordion key={UserProfile._id}>
                    <AccordionSummary
                      id="panel-header"
                      aria-controls="panel-content"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>
                        <NotificationsActiveIcon
                          style={{ marginRight: "15px", color: "#19376D" }}
                        />
                        {notification?.notificationSummary}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{notification?.notification}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
        </Container>
      )}
    </>
  );
};

export default Notification;
