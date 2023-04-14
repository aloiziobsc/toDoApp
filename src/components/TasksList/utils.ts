import { createFilterOptions } from "@mui/material";

export const statusOptions = ['Pendente', 'Em andamento', 'Concluída']

export const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: string) => option,
});

export function returnStatusColor (currentStatus:string):string {
  if(currentStatus === 'Pendente') return '#FFB347'
  if(currentStatus === 'Em andamento') return '#00acee'
  if(currentStatus === 'Concluída') return '#029944'
  else return '#D3D3D3'
}