import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { projectCreateSchema } from "../schemas/projects.schema";

const authCreateProject = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = projectCreateSchema.validate(req.body);
  if (error) {
    throw new CustomError(403, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authCreateProject;