import { Box, Button, ButtonGroup, Grid, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import TaskCard from './TaskCard';
import Autocomplete from '@mui/material/Autocomplete';
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
    if(searchValue === '') {
      setDisableButton(true)
    } else { setDisableButton(false) }
  }

  const startSearch = () => {
    const newItemsToShow = tasks.filter(item => item.status === searchValue)
    setItemsToShow(newItemsToShow)
  }

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value !== searchValue) {
      setSearchValue(e.target.value)
    }
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
    <Box id="containerTaskListHeader">
      <Typography variant="h4" id="title">Lista de tarefas:</Typography>
      <Box sx={{ m: 1 }} />
      <Box display="flex" justifyContent="space-between" id="searchStatus">
          <Autocomplete
            id="searchStatus"
            options={statusOptions}
            getOptionLabel={(option) => option}
            filterOptions={filterOptions}
            onSelect={handleChangeSearchValue}
            clearIcon={null}
            value={searchValue}
            sx={{ width: 150 }}
            renderInput={
              (params) => 
              <TextField
                {...params}
                label="Status"
                value={searchValue}
                onChange={handleChangeSearchValue}
              />}
          />
          <Box sx={{ m: 1 }} />

          <ButtonGroup >
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
              Limpar
            </Button>
          </ButtonGroup >

      </Box>
    </Box>
    <Box sx={{ m: 2 }} />
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
