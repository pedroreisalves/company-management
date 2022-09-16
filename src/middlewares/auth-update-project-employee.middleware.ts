import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { updateProjectEmployeeSchema } from "../schemas/employee.schema";

const authUpdateProjectEmployee = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = updateProjectEmployeeSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authUpdateProjectEmployee;