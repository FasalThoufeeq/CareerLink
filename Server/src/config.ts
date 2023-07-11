import dotenv from 'dotenv'
dotenv.config()


const configKeys={
    PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY
}

export default configKeys;