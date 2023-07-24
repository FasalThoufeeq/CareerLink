import {} from "react";
import RecruiterHeader from "../../Components/Recruiter/recruiterHeader";
import Footer from "../../Components/Seeker/footer";
import UpdateProfile from "../../Components/Recruiter/UpdateProfile";

const RecruiterProfile = () => {
  return (
    <>
      <RecruiterHeader />
      <UpdateProfile />
      <Footer />
    </>
  );
};

export default RecruiterProfile;
