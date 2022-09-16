import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { departmentUpdateSchema } from "../schemas/departments.schema";

const authUpdateDepartment = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = departmentUpdateSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authUpdateDepartment;