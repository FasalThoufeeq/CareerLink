import Home from "../Pages/Seeker/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import UserHeader from "../Components/Seeker/SeekerHeader";
import Footer from "../Components/Seeker/footer";
import { useSelector } from "react-redux";
import AppliedJobs from "../Pages/Seeker/AppliedJobs";
import Profile from "../Pages/Seeker/Profile";
import UpdateProfile from "../Components/Seeker/UpdateProfile";
import Chat from "../Pages/Chat/chat";
import ResetPassword from "../Components/Seeker/resetPassword";
import PageNotFound from "../Components/pageNotFound";
import Room from "../Pages/VideoCall/room";
import Notification from "../Pages/Notification/Notification";
import { Toaster } from "react-hot-toast";


const SeekerRoute = () => {
  const token = useSelector((state) => state?.seekers?.seekers?.token);
  return (
    <>
      <UserHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/applied_jobs"
          element={token ? <AppliedJobs /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/update_profile"
          element={token ? <UpdateProfile /> : <Navigate to="/" />}
        />
        <Route path="/chat" element={token ? <Chat /> : <Navigate to="/" />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route
          path="/room/:roomID"
          element={token ? <Room /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={token ? <Notification /> : <Navigate to="/" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster/>
      <Footer />
    </>
  );
};

export default SeekerRoute;
