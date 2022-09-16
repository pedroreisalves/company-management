import { NextFunction, Request, Response } from "express";
import { verify } from "../helpers/jwt";

const authToken = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  verify(token as string);
  next();
}

export default authToken;