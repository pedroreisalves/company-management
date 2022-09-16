import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { createEmployeeSchema } from "../schemas/employee.schema";

const authCreateEmployee = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = createEmployeeSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authCreateEmployee;