import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import configKeys from '../../config'

export const authServiceImpl=()=>{
    const encryptPassword=async(password:string)=>{
        const salt=await bcrypt.genSalt(10)
        password=await bcrypt.hash(password,salt)
        return password
    }

    const comparePassword=(password:string,hashedPassword:string)=>{
        return bcrypt.compare(password,hashedPassword)
    }

    const generateToken=(payload:string)=>{
        const token = jwt.sign({payload},configKeys.JWT_SECRET_KEY as string,{expiresIn:"5d"})
        return token
    }
    const verifyToken=(token:string)=>{
        return jwt.verify(token, configKeys.JWT_SECRET_KEY as string)
    }
    return{
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    }
}

export type AuthServiceImpl = typeof authServiceImpl
export type AuthServiceImplReturn=ReturnType<AuthServiceImpl>