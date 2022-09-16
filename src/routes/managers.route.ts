import { Router } from 'express';
import ManagersController from '../controllers/managers.controller';
import authCreateManager from '../middlewares/auth-create-manager.middleware';
import authUpdateManager from '../middlewares/auth-update-manager.middleware';

const managersRoute = Router();

const managersController = new ManagersController();

managersRoute.get('/:id', managersController.getById);

managersRoute.patch('/:id', authUpdateManager, managersController.update);

managersRoute.delete('/:id', managersController.delete);

managersRoute.get('/', managersController.getAll);

managersRoute.post('/', authCreateManager, managersController.create);

export default managersRoute;