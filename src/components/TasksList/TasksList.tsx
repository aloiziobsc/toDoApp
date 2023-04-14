import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import TaskCard from './TaskCard';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Task } from '../../context/ContextTypes';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import './taskList.scss'
import NotFoundTask from './NotFoundTask';
import { filterOptions, statusOptions } from './utils';

function TaskList() {
  const { tasks } = useContext(AppContext)
  const [searchValue, setSearchValue] = useState<string>('')
  const [itemsToShow, setItemsToShow] = useState<Array<Task>>(tasks)
  const [disableButton, setDisableButton] = useState<boolean>(true)

  const verifyDisableButton = () => {
    if(searchValue === '' || itemsToShow.length === 0) {
      setDisableButton(true)
    } else { setDisableButton(false) }
  }

  const startSearch = () => {
    const newItemsToShow = tasks.filter(item => item.status === searchValue)
    setItemsToShow(newItemsToShow)
  }

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    if(e.target.value) setItemsToShow(tasks)
  }

  const handleClearSearch = () => {
    setItemsToShow(tasks)
    setSearchValue('')
  }

  useEffect(() => {
    verifyDisableButton()
    setItemsToShow(tasks)
  }, [tasks]);

  useEffect(() => {
    verifyDisableButton()
  }, [searchValue]);

  return (
    <>
    <Box display="flex" justifyContent="space-around" id="Box">
      <Typography variant="h3">Listagem de tarefas:</Typography>
      
      <Box display="block">
          <Autocomplete
            options={statusOptions}
            getOptionLabel={(option) => option}
            filterOptions={filterOptions}
            onSelect={handleChangeSearchValue}
            clearIcon={null}
            value={searchValue}
            renderInput={
              (params) => 
              <TextField
                {...params}
                label="Filtro Status"
                value={searchValue}
                onChange={handleChangeSearchValue}
              />}
          />
        <Box display="flex" justifyContent="space-between" id="Box">
          <Button
            startIcon={<FilterAltIcon />}
            variant="contained"
            disabled={disableButton}
            onClick={startSearch}
          >
            Filtrar
          </Button>
          <Button
            startIcon={<ClearIcon />}
            variant="contained"
            onClick={handleClearSearch}
            disabled={disableButton}
          >
            Limpar filtro
          </Button>
        </Box>
      </Box>
    </Box>
      <Grid container spacing={2}>
        {itemsToShow.map((item, index) => 
          <TaskCard
            key={index}
            {...item}
          />)
        }
      </Grid>
      { 
        itemsToShow.length === 0
        &&
        <NotFoundTask />
      }
    </>
  )
}

export default TaskList
