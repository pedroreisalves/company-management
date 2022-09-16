import Prisma from "../database/prisma";
import CustomError from "../errors/CustomError";
import {
  CreateEmployee,
  UpdateEmployee,
  CreateProjectEmployee,
  UpdateProjectEmployee,
} from "./../types/employee.type";

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

  async createProjectEmployee(data: CreateProjectEmployee) {
    await this.verifyEmployeeId(data.idEmployee);
    await this.verifyProjectId(data.idProject);
    const isAssociated = await this.verifyRelationEmployeeProject(
      data.idEmployee,
      data.idProject
    );
    if (isAssociated) {
      throw new CustomError(
        401,
        "UNAUTHORIZED",
        "These ids are already associated"
      );
    }
    await this.prisma.projectEmployee.create({ data });
    return data;
  }

  async updateProjectEmployee(data: UpdateProjectEmployee) {
    await this.verifyEmployeeId(data.idEmployee);
    await this.verifyProjectId(data.idProject);
    const isAssociated = await this.verifyRelationEmployeeProject(
      data.idEmployee,
      data.idProject
    );
    if (!isAssociated) {
      throw new CustomError(
        401,
        "UNAUTHORIZED",
        "These ids are not associated"
      );
    }
    await this.prisma.projectEmployee.update({
      where: {
        idProject_idEmployee: {
          idEmployee: data.idEmployee,
          idProject: data.idProject,
        },
      },
      data,
    });
    return data;
  }

  async deleteProjectEmployee(idEmployee: number, idProject: number) {
    await this.verifyEmployeeId(idEmployee);
    await this.verifyProjectId(idProject);
    const isAssociated = await this.verifyRelationEmployeeProject(
      idEmployee,
      idProject
    );
    if (!isAssociated) {
      throw new CustomError(
        401,
        "UNAUTHORIZED",
        "These ids are not associated"
      );
    }
    const deletedProjectEmployee = await this.prisma.projectEmployee.delete({
      where: {
        idProject_idEmployee: {
          idEmployee: idEmployee,
          idProject: idProject,
        },
      },
    });
    return deletedProjectEmployee;
  }

  private async verifyRelationEmployeeProject(
    idEmployee: number,
    idProject: number
  ) {
    const projectEmployee = await this.prisma.projectEmployee.findUnique({
      where: {
        idProject_idEmployee: {
          idEmployee: idEmployee,
          idProject: idProject,
        },
      },
    });
    return projectEmployee;
  }

  private async verifyEmployeeId(id: number) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new CustomError(404, "NOT_FOUND", "Employee not found");
    }
    return employee;
  }

  private async verifyProjectId(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new CustomError(404, "NOT_FOUND", "Project not found");
    }
    return project;
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
