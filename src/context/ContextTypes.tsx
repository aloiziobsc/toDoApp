import { ReactNode } from "react"

export enum StatusOptions {
  Pending = 'Pendente',
  Doing = 'Em andamento',
  Finish = 'Concluída'
}

export type Task = {
  id: string,
  title: string,
  description: string,
  date: string,
  status: StatusOptions
}

export type AppContextType = {
  tasks: Array<Task>,
  changeTasks: (value: Array<Task>) => void,
}

export type AppContextProps = {
  children: ReactNode
}