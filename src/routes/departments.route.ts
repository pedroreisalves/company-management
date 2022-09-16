import { Router } from 'express';
import DepartmentController from '../controllers/deparments.controller';
import authCreateDepartment from '../middlewares/auth-create-department.middleware';
import authUpdateDepartment from '../middlewares/auth-update-department.middleware';

const departmentsRoute = Router();

const departmentsController = new DepartmentController()

departmentsRoute.get('/:id', departmentsController.getById);

departmentsRoute.patch('/:id', authUpdateDepartment, departmentsController.update);

departmentsRoute.delete('/:id', authCreateDepartment, departmentsController.delete);

departmentsRoute.get('/', departmentsController.getAll);

departmentsRoute.post('/', departmentsController.create);

export default departmentsRoute;