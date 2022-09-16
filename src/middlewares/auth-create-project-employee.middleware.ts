import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/CustomError";
import { createProjectEmployeeSchema } from "../schemas/employee.schema";

const authCreateProjectEmployee = (req: Request, _res: Response, next: NextFunction) => {
  const { error } = createProjectEmployeeSchema.validate(req.body);
  if (error) {
    throw new CustomError(401, 'UNAUTHORIZED', error.message);
  }
  next();
}

export default authCreateProjectEmployee;