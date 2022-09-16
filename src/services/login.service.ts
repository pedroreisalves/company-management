import Prisma from "../database/prisma";
import { sign } from "../helpers/jwt";
import { Login } from "../types/login.type";

class LoginService {
  constructor(private readonly prisma = Prisma) {}

  login(loginData: Login) {
    const token = sign(loginData);
    return token;
  }
}

export default LoginService;