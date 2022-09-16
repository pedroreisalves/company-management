import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { updateEmployeeSchema } from "../schemas/employee.schema";

const authUpdateEmployee = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = updateEmployeeSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authUpdateEmployee;