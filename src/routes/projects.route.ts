import { Router } from "express";
import ProjectsController from "../controllers/projects.controller";
import authCreateProject from "../middlewares/auth-create-project.middleware";
import authUpdateProject from "../middlewares/auth-update-project.middleware";

const projectsRoute = Router();

const projectsController = new ProjectsController();

projectsRoute.get('/', projectsController.getAll);

projectsRoute.get('/:id', projectsController.getById);

projectsRoute.post('/', authCreateProject, projectsController.create);

projectsRoute.patch('/:id', authUpdateProject, projectsController.update);

projectsRoute.delete('/:id', projectsController.delete);

export default projectsRoute;