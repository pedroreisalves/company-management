import { Router } from 'express';
import EmployeesController from '../controllers/employees.controller';
import authCreateEmployee from '../middlewares/auth-create-employee.middleware';
import authCreateProjectEmployee from '../middlewares/auth-create-project-employee.middleware';
import authUpdateEmployee from '../middlewares/auth-update-employee.middleware';
import authUpdateProjectEmployee from '../middlewares/auth-update-project-employee.middleware';

const employeesRoute = Router();

const employeesController = new EmployeesController();

employeesRoute.patch('/:id/projects/:idProject', authUpdateProjectEmployee, employeesController.updateProjectEmployee);

employeesRoute.delete('/:id/projects/:idProject', employeesController.deleteProjectEmployee);

employeesRoute.post('/:id/projects/:idProject', authCreateProjectEmployee, employeesController.createProjectEmployee);

employeesRoute.get('/:id', employeesController.getById);

employeesRoute.patch('/:id', authUpdateEmployee, employeesController.update);

employeesRoute.delete('/:id', employeesController.delete);

employeesRoute.get('/', employeesController.getAll);

employeesRoute.post('/', authCreateEmployee, employeesController.create);

export default employeesRoute;