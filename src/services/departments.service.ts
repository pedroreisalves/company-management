import {
  CreateDepartment,
  Department,
  UpdateDepartment,
} from "./../types/department.type";
import Prisma from "../database/prisma";
import CustomError from "../errors/CustomError";

class DepartmentsService {
  constructor(private readonly prisma = Prisma) {}

  getAll() {
    return this.prisma.department.findMany({
      include: { employees: { select: { id: true, name: true } } },
    });
  }

  async getById(id: number) {
    const department = await this.verifyDepartmentId(id);
    return department;
  }

  async create(departmentData: CreateDepartment) {
    await this.verifyDepartmentName(departmentData.name);
    const newDepartment = await this.prisma.department.create({
      data: departmentData,
    });
    return newDepartment;
  }

  async update(departmentData: UpdateDepartment) {
    await this.verifyDepartmentId(departmentData.id);
    await this.verifyDepartmentName(departmentData.name);
    const updatedDepartment = await this.prisma.department.update({
      where: { id: departmentData.id },
      data: departmentData,
    });
    return updatedDepartment;
  }

  async delete(id: number) {
    await this.verifyDepartmentId(id);
    const deletedDepartment = await this.prisma.department.delete({
      where: { id },
    });
    return deletedDepartment;
  }

  private async verifyDepartmentId(id: number) {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: { employees: { select: { id: true, name: true } } },
    });
    if (!department) {
      throw new CustomError(404, "NOT_FOUND", "Department not found");
    }
    return department;
  }

  private async verifyDepartmentName(name: string) {
    const department = await this.prisma.department.findUnique({
      where: { name },
    });
    if (department) {
      throw new CustomError(
        401,
        "UNAUTHORIZED",
        "A department with that name already exists"
      );
    }
    return department;
  }
}

export default DepartmentsService;
