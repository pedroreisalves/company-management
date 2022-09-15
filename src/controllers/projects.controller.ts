import { UpdateProject, CreateProject } from './../types/project.type';
import { Request, Response } from "express";
import ProjectsService from "../services/projects.service";

class ProjectsController {
  constructor(private readonly projectsService = new ProjectsService()) {}

  getAll = async (_req: Request, res: Response): Promise<Response> => {
    const projects = await this.projectsService.getAll();
    return res.status(200).json(projects);
  }

  getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const project = await this.projectsService.getById(+id);
    return res.status(200).json(project);
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const newProject = await this.projectsService.create(req.body as CreateProject)
    return res.status(201).json(newProject);
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const payload: UpdateProject = {
      id: +id,
      ...req.body 
    }
    const updatedProject = await this.projectsService.update(payload);
    return res.status(200).json(updatedProject);
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedProject = await this.projectsService.delete(+id);
    return res.status(200).json(deletedProject);
  }
}

export default ProjectsController;