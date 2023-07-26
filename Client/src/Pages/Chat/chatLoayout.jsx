import {} from "react";
import { useSelector } from "react-redux";
import RecruiterHeader from "../../Components/Recruiter/recruiterHeader";
import Footer from "../../Components/Seeker/footer";

const ChatLayout = ({ children }) => {
  const user = useSelector((state) => state?.seekers?.seekers?.profile);
  return (
    <>
      {user ? null : <RecruiterHeader />}
      {children}
      {user ? null : <Footer />}
    </>
  );
};

export default ChatLayout;
