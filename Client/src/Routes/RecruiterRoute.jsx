import {} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RecruiterHomePage from "../Pages/Recruiter/recuiterHome";
import Recruiterlogin from "../Components/Recruiter/recruiterLogin";
import RecruiterRegister from "../Components/Recruiter/recruiterRegister";
import { useSelector } from "react-redux";
import PostJobs from '../Pages/Recruiter/postJobs'


const RecruiterRoute = () => {
  const token = useSelector((state) => state?.recruiters?.recruiters?.token);
  return (
    <>
      <Routes>
        <Route path="/" element={token?<RecruiterHomePage />:<Navigate to='/recruiter/login'/>} />
        <Route path="/login" element={token?<Navigate to='/recruiter'/>:<Recruiterlogin />} />
        <Route path="/register" element={<RecruiterRegister />} />
        <Route path="/post_jobs" element={token?<PostJobs />:<Navigate to='/recruiter/login'/>} />
      </Routes>
    </>
  );
};

export default RecruiterRoute;
