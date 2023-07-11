import express,{NextFunction} from 'express'
import http from 'http'
import serverConfig from './Framework/webserver/server'
import expressConfig from './Framework/webserver/express'
import connectDB from './Framework/Database/MongoDB/Connection'
import routes from './Framework/webserver/Routes/routes'
import errorHandlingMidlleware from './Framework/webserver/Middlewares/ErrorHandlingMiddleware'
import AppError from './Utils/AppError'


const app= express()
const server=http.createServer(app)

expressConfig(app)
routes(app)
connectDB()
app.use(errorHandlingMidlleware)

app.all('*', (req, res, next: NextFunction) => {
    next(new AppError('Not found', 404));
  });

serverConfig(server).startServer()