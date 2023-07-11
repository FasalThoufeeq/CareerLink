import express,{Application} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'





const expressConfig=(app:Application)=>{
    app.use(express.json())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.urlencoded({ extended: true}))
    app.use(morgan('dev'))
    app.use(cors())
    

}
export default expressConfig;