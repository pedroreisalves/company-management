import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { departmentCreateSchema } from "../schemas/departments.schema";

const authCreateDepartment = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = departmentCreateSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authCreateDepartment;