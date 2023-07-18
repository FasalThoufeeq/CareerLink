import {Application} from 'express'
import authRoute from './authRoute'
import seekerRoute from './seekerRouter'
import recruiterRoute from './recuiterRoute'
import AuthMiddleware from '../Middlewares/authMiddleware'


const routes=(app:Application)=>{
    app.use('/api/auth',authRoute())
    app.use('/api/recruiter',AuthMiddleware,recruiterRoute())
    app.use('/api/',seekerRoute())
}

export default routes