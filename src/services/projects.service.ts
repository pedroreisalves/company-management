import { CreateProject, Project, UpdateProject } from './../types/project.type';
import { PrismaClient } from '@prisma/client';
import CustomError from '../errors/CustomError';

class ProjectsService {
  constructor(private readonly prisma = new PrismaClient()) {}

  getAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async getById(id: number): Promise<Project> {
    const project = await this.verifyProjectId(id);
    return project;
  }

  async create(projectData: CreateProject): Promise<Project> {
    await this.verifyManagerId(projectData.idManager);
    const newProject = await this.prisma
      .project.create({ data: { ...projectData } });
    return newProject; 
  }

  async update({ id, ...projectData }: UpdateProject): Promise<Project> {
    const searchProject = await this.verifyProjectId(id);
    if (projectData.idManager) {
      await this.verifyManagerId(projectData.idManager);
    }
    const updatedProject = await this.prisma.project
      .update({ where: { id }, data: { ...searchProject, ...projectData } })
    return updatedProject;
  }

  async delete(id: number): Promise<Project> {
    const searchProject = await this.prisma.project.findUnique({ where: { id } });
    if (!searchProject) {
      throw new CustomError(404, 'NOT_FOUND', 'Project not found');
    }
    const deletedProject = await this.prisma.project.delete({ where: { id } });
    return deletedProject;
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
}

export default ProjectsService;