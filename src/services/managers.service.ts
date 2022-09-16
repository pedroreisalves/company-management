import { CreateManager, UpdateManager } from "./../types/manager.type";
import Prisma from "../database/prisma";
import CustomError from "../errors/CustomError";

class ManagersService {
  constructor(private readonly prisma = Prisma) {}

  getAll() {
    return this.prisma.manager.findMany({
      include: { projects: { select: { id: true, title: true } } },
    });
  }

  async getById(id: number) {
    const manager = await this.verifyManagerId(id);
    return manager;
  }

  async create(managerData: CreateManager) {
    await this.verifyManagerName(managerData.name);
    const newManager = await this.prisma.manager.create({ data: managerData });
    return newManager;
  }

  async update(managerData: UpdateManager) {
    await this.verifyManagerName(managerData.name);
    await this.verifyManagerId(managerData.id);
    const updatedManager = await this.prisma.manager.update({
      where: { id: managerData.id },
      data: managerData,
    });
    return updatedManager;
  }

  async delete(id: number) {
    await this.verifyManagerId(id);
    const deletedManager = await this.prisma.manager.delete({ where: { id } });
    return deletedManager;
  }

  private async verifyManagerId(id: number) {
    const manager = await this.prisma.manager.findUnique({ where: { id } });
    if (!manager) {
      throw new CustomError(404, "NOT_FOUND", "Manager not found");
    }
    return manager;
  }

  private async verifyManagerName(name: string) {
    const manager = await this.prisma.manager.findUnique({ where: { name } });
    if (manager) {
      throw new CustomError(
        401,
        "UNAUTHORIZED",
        "A manager with that name already exists"
      );
    }
    return manager;
  }
}

export default ManagersService;
