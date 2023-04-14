import { createFilterOptions } from "@mui/material";
import { StatusOptions } from "../../context/ContextTypes";

export const statusOptions = ['Pendente', 'Em andamento', 'Concluída']

export const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: string) => option,
});

export function correspondingValueInStatusOption (name:string,
  currentStatus:StatusOptions):StatusOptions {
  if(name === 'Pendente') return StatusOptions.Pending
  if(name === 'Em andamento') return StatusOptions.Doing
  if(name === 'Concluída') return StatusOptions.Finish
  else return currentStatus
}