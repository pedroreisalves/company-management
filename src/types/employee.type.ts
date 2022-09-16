export type Employee = {
  id: number
  name: string
  idDepartment: number | null
}

export type CreateEmployee = {
  name: string
  idDepartment: number | null
}

export type UpdateEmployee = {
  id: number
  name?: string
  idDepartment?: number | null
}

export type ProjectEmployee = {
  idProject: number
  idEmployee: number
  hourlyRate: number
}

export type CreateProjectEmployee = {
  idProject: number
  idEmployee: number
  hourlyRate: number
}

export type UpdateProjectEmployee = {
  idProject: number
  idEmployee: number
  hourlyRate: number
}