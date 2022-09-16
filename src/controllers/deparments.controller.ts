import { UpdateDepartment, CreateDepartment } from './../types/department.type';
import { Request, Response } from "express";
import DepartmentsService from "../services/departments.service";

class DepartmentController {
  constructor(private readonly departmentsService = new DepartmentsService()) {}

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const departments = await this.departmentsService.getAll();
    return res.status(200).json(departments);
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const department = await this.departmentsService.getById(+id);
    return res.status(200).json(department);
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const newDepartment = await this.departmentsService.create(req.body as CreateDepartment);
    return res.status(201).json(newDepartment);
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const payload: UpdateDepartment = {
      id: +id,
      ...req.body
    };
    const updatedDepartment = await this.departmentsService.update(payload);
    return res.status(200).json(updatedDepartment);
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedDepartment = await this.departmentsService.delete(+id);
    return res.status(200).json(deletedDepartment);
  }
}

export default DepartmentController;