import {} from "react";
import RecruiterHeader from "../../Components/Recruiter/recruiterHeader";
import PostJobs from "../../Components/Recruiter/postjobs";
import Footer from "../../Components/Seeker/footer";

const postJobs = () => {
  return (
    <div>
        <RecruiterHeader/>
        <PostJobs/>
        <Footer/>
    </div>
  );
};

export default postJobs;
