import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { loginSchema } from "../schemas/login.schema";

const authLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authLogin;