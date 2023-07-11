import { NextFunction, Request, Response } from 'express';
import AppError from '../../../Utils/AppError'

const errorHandlingMidlleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err.statusCode === 404) {
    res
      .json({ errors: err.status, errorMessage: err.message });
  } else {
    res.json({
      status: err.status,
      message: err.message,
    });
  }
};

export default errorHandlingMidlleware;
