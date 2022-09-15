import { CreateProject, Project, UpdateProject } from './../types/project.type';
import CustomError from '../errors/CustomError';
import Prisma from '../database/prisma';

class ProjectsService {
  constructor(private readonly prisma = Prisma) {}

  getAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async getById(id: number): Promise<Project> {
    const project = await this.verifyProjectId(id);
    return project;
  }

  async create(projectData: CreateProject): Promise<Project> {
    await this.verifyManagerId(projectData.idManager);
    await this.verifyProjectTitle(projectData.title);
    projectData.deadline = new Date(projectData.deadline);
    const newProject = await this.prisma
      .project.create({ data: { ...projectData } });
    return newProject; 
  }

  async update(projectData: UpdateProject): Promise<Project> {
    await this.verifyProjectId(projectData.id);
    const newProjectData = await this.validateUpdateProject(projectData);
    const updatedProject = await this.prisma.project
      .update({ where: { id: projectData.id }, data: newProjectData });
    return updatedProject;
  }

  async delete(id: number): Promise<Project> {
    await this.verifyProjectId(id);
    const deletedProject = await this.prisma.project.delete({ where: { id } });
    return deletedProject;
  }

  private async validateUpdateProject(projectData: UpdateProject) {
    if (projectData.idManager) {
      await this.verifyManagerId(projectData.idManager);
    }
    if (projectData.title) {
      await this.verifyProjectTitle(projectData.title);
    }
    if (projectData.deadline) {
      projectData.deadline = new Date(projectData.deadline);
    }
    return projectData;
  }

  private async verifyManagerId(id: number) {
    const manager = await this.prisma.manager.findUnique({ where: { id } });
    if (!manager) {
      throw new CustomError(404, 'NOT_FOUND', 'Manager not found');
    }
    return manager;
  }

  private async verifyProjectId(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new CustomError(404, 'NOT_FOUND', 'Project not found');
    }
    return project;
  }

  private async verifyProjectTitle(title: string) {
    const project = await this.prisma.project.findUnique({ where: { title } });
    if (project) {
      throw new CustomError(401, 'UNAUTHORIZED', 'A project with that title already exists');
    }
    return project;
  }
}

export default ProjectsService;