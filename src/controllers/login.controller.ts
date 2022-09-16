import { Request, Response } from "express";
import LoginService from "../services/login.service";
import { Login } from "../types/login.type";

class LoginController {
  constructor(private readonly loginService = new LoginService()) {}

  login = (req: Request, res: Response) => {
    const token = this.loginService.login(req.body as Login);
    return res.status(200).json({ token });
  }
}

export default LoginController;