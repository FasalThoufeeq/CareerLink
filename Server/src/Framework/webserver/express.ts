import express,{Application} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'





const expressConfig=(app:Application)=>{

    const corsOptions = {
        origin:['https://careerlink.cloud', 'https://careerlink.cloud'],
        exposedHeaders: [
          'Cross-Origin-Opener-Policy',
          'Cross-Origin-Resource-Policy',
        ],
      };

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.urlencoded({ extended: true}))
    app.use(morgan('dev'))
    app.use(cors(corsOptions))
    

}
export default expressConfig;