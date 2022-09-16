import { Router } from 'express';
import EmployeesController from '../controllers/employees.controller';
import authCreateEmployee from '../middlewares/auth-create-employee.middleware';
import authUpdateEmployee from '../middlewares/auth-update-employee.middleware';

const employeesRoute = Router();

const employeesController = new EmployeesController();

employeesRoute.get('/:id', employeesController.getById);

employeesRoute.patch('/:id', authUpdateEmployee, employeesController.update);

employeesRoute.delete('/:id', employeesController.delete);

employeesRoute.get('/', employeesController.getAll);

employeesRoute.post('/', authCreateEmployee, employeesController.create);

export default employeesRoute;