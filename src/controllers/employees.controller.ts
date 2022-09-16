import {
  CreateEmployee,
  UpdateEmployee,
  UpdateProjectEmployee,
  CreateProjectEmployee,
} from "./../types/employee.type";
import { Request, Response } from "express";
import EmployeesService from "../services/employees.service";

class EmployeesController {
  constructor(private readonly employeesService = new EmployeesService()) {}

  getAll = async (_req: Request, res: Response) => {
    const employees = await this.employeesService.getAll();
    return res.status(200).json(employees);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const employee = await this.employeesService.getById(+id);
    return res.status(200).json(employee);
  };

  create = async (req: Request, res: Response) => {
    const newEmployee = await this.employeesService.create(
      req.body as CreateEmployee
    );
    return res.status(201).json(newEmployee);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload: UpdateEmployee = {
      id: +id,
      ...req.body,
    };
    const updatedEmployee = await this.employeesService.update(payload);
    return res.status(200).json(updatedEmployee);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedEmployee = await this.employeesService.delete(+id);
    return res.status(200).json(deletedEmployee);
  };

  createProjectEmployee = async (req: Request, res: Response) => {
    const { hourlyRate } = req.body;
    const { id, idProject } = req.params;
    const payload: CreateProjectEmployee = {
      hourlyRate,
      idProject: +idProject,
      idEmployee: +id,
    };
    const newProjectEmployee =
      await this.employeesService.createProjectEmployee(payload);
    return res.status(200).json(newProjectEmployee);
  };

  updateProjectEmployee = async (req: Request, res: Response) => {
    const { hourlyRate } = req.body;
    const { id, idProject } = req.params;
    const payload: UpdateProjectEmployee = {
      hourlyRate,
      idProject: +idProject,
      idEmployee: +id,
    };
    const updatedProjectEmployee =
      await this.employeesService.updateProjectEmployee(payload);
    return res.status(200).json(updatedProjectEmployee);
  };

  deleteProjectEmployee = async (req: Request, res: Response) => {
    const { id, idProject } = req.params;
    const deletedProjectEmployee =
      await this.employeesService.deleteProjectEmployee(+id, +idProject);
    return res.status(200).json(deletedProjectEmployee);
  };
}

export default EmployeesController;
