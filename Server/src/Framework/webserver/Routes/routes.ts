import {Application} from 'express'
import authRoute from './authRoute'
import seekerRoute from './seekerRouter'
import recruiterRoute from './recuiterRoute'
import chatRoute from './chatRoute'
import messageRoute from './messageRoute'


const routes=(app:Application)=>{
    app.use('/api/auth',authRoute())
    app.use('/api/recruiter',recruiterRoute())
    app.use('/api/',seekerRoute())
    app.use('/api/chat',chatRoute())
    app.use('/api/message',messageRoute())
}

export default routes