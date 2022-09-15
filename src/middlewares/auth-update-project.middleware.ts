import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { projectUpdateSchema } from "../schemas/projects.schema";

const authUpdateProject = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = projectUpdateSchema.validate(req.body);
  if (error) {
    throw new CustomError(403, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authUpdateProject;