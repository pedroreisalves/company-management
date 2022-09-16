import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import authLogin from '../middlewares/auth-login.middleware';

const loginRoute = Router();

const loginController = new LoginController();

loginRoute.post('/', authLogin, loginController.login);

export default loginRoute;