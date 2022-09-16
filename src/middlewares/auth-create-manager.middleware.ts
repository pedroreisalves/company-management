import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { managerCreateSchema } from "../schemas/managers.schema";

const authCreateManager = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = managerCreateSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authCreateManager;