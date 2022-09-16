import { CreateManager, UpdateManager } from './../types/manager.type';
import { Request, Response } from "express";
import ManagersService from "../services/managers.service";

class ManagersController {
  constructor(private readonly managerService = new ManagersService()) {}

  getAll = async (req: Request, res: Response): Promise<Response> => {
    const managers = await this.managerService.getAll();
    return res.status(200).json(managers);
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const manager = await this.managerService.getById(+id);
    return res.status(200).json(manager);
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const newManager = await this.managerService.create(req.body as CreateManager);
    return res.status(201).json(newManager);
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const payload: UpdateManager = {
      id: +id,
      ...req.body
    }
    const updatedManager = await this.managerService.update(payload);
    return res.status(200).json(updatedManager);
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedManager = await this.managerService.delete(+id);
    return res.status(200).json(deletedManager);
  }
}

export default ManagersController;