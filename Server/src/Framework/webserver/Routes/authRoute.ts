import express from 'express'
import authController from '../../../Adapters/AuthController/authContoller'
import { userRepositoryImpl } from '../../Database/MongoDB/repositories/userRepositoryImpl'
import { userRepositoryInter } from '../../../Application/repostories/userRepositoryInter'
import { authServiceImpl } from '../../Services/authServiceImpl'
import { authServiceInter } from '../../../Application/Services/authServiceInter'
import { recruiterRepositoryInter } from '../../../Application/repostories/recruiterRepositoryInter'
import { recruiterRepositoryImpl } from '../../Database/MongoDB/repositories/recruiterRepositoryImpl'


const authRoute = () => {
    const router=express.Router()
    const controller=authController(
        authServiceImpl,
        authServiceInter,
        userRepositoryImpl,
        userRepositoryInter,
        recruiterRepositoryImpl,
        recruiterRepositoryInter
    )
    
    router.post('/signup',controller.registerUser)

    router.post('/login',controller.loginUser)

    router.post('/google-login',controller.googleLoginUser)

    router.post('/recruiter/signup',controller.registerRecruiter)

    router.post('/recruiter/login',controller.loginRecruiter)

    return router;
}

export default authRoute