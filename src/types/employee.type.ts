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