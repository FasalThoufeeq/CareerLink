import {} from 'react'
import Home from '../Pages/Seeker/Home'
import {Routes,Route, Navigate}from 'react-router-dom'
import UserHeader from '../Components/Seeker/SeekerHeader'
import Footer from '../Components/Seeker/footer'
import { useSelector } from 'react-redux'
import AppliedJobs from '../Pages/Seeker/AppliedJobs'

const SeekerRoute = () => {
  const token = useSelector((state) => state?.seekers?.seekers?.token);
  return (
    <>
    <UserHeader/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/applied_jobs" element={token?<AppliedJobs />:<Navigate to='/'/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default SeekerRoute