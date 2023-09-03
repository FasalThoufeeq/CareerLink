import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../Types/httpStatus";
import AppError from "../../../Utils/AppError";
import { authServiceInter } from "../../../Application/Services/authServiceInter";
import { authServiceImpl } from "../../Services/authServiceImpl";

const service = authServiceInter(authServiceImpl());
const seekerAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    
  }
  if (!token) {
    throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
  }
  
  try {
    console.log('dhskjf');
    
    const payload: any = service.verifyToken(token);
    
    next();
  } catch (err) {
    throw new AppError("UnAuthorized User", HttpStatus.UNAUTHORIZED);
  }
};

export default seekerAuthMiddleware;
