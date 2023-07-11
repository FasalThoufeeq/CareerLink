import {} from 'react'
import Home from '../Pages/Seeker/Home'
import {Routes,Route}from 'react-router-dom'
import UserHeader from '../Components/Seeker/SeekerHeader'
import Footer from '../Components/Seeker/footer'

const SeekerRoute = () => {
  return (
    <>
    <UserHeader/>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default SeekerRoute