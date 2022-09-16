import Prisma from "../database/prisma";
import CustomError from "../errors/CustomError";
import { CreateEmployee, UpdateEmployee } from "./../types/employee.type";

class EmployeesService {
  constructor(private readonly prisma = Prisma) {}

  getAll() {
    return this.prisma.employee.findMany();
  }

  async getById(id: number) {
    const employee = await this.verifyEmployeeId(id);
    return employee;
  }

  async create(employeeData: CreateEmployee) {
    await this.verifyEmployeeName(employeeData.name);
    if (employeeData.idDepartment) {
      await this.verifyDepartmentId(employeeData.idDepartment);
    }
    const newEmployee = await this.prisma.employee.create({
      data: employeeData,
    });
    return newEmployee;
  }

  async update(employeeData: UpdateEmployee) {
    await this.verifyEmployeeId(employeeData.id);
    if (employeeData.name) {
      await this.verifyEmployeeName(employeeData.name);
    }
    if (employeeData.idDepartment) {
      await this.verifyDepartmentId(employeeData.idDepartment);
    }
    const updatedEmployee = await this.prisma.employee.update({
      where: { id: employeeData.id },
      data: employeeData,
    });
    return updatedEmployee;
  }

  async delete(id: number) {
    await this.verifyEmployeeId(id);
    const deletedUser = await this.prisma.employee.delete({ where: { id } });
    return deletedUser;
  }

  private async verifyEmployeeId(id: number) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new CustomError(404, "NOT_FOUND", "Employee not found");
    }
    return employee;
  }

  private async verifyDepartmentId(id: number) {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) {
      throw new CustomError(404, "NOT_FOUND", "Department not found");
    }
    return department;
  }

  private async verifyEmployeeName(name: string) {
    const employee = await this.prisma.employee.findUnique({ where: { name } });
    if (employee) {
      throw new CustomError(
        401,
        "UNAUTHORIZED",
        "A employee with that name already exists"
      );
    }
    return employee;
  }
}

export default EmployeesService;
