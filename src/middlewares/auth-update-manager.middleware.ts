import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { managerUpdateSchema } from "../schemas/managers.schema";

const authUpdateManager = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = managerUpdateSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authUpdateManager;