type IProject = {
  title: string
  budget: number
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  deadline: Date
}

export type Project = {
  id: number
  idManager: number | null
} & IProject;

export type CreateProject = {
  idManager: number
} & IProject;

export type UpdateProject = {
  id: number
  title?: string
  budget?: number
  priority?: 'HIGH' | 'MEDIUM' | 'LOW'
  deadline?: Date
  idManager?: number | null
};