import { Box, Card, CardActions, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { StatusOptions, Task } from '../../context/ContextTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs'
import ModalChangeTask from './ModalChangeTask';

function TaskCard(props:Task) {
  const { tasks, changeTasks} = useContext(AppContext)
  const [openModal, setOpenModal] = useState(false)
  const [propsTask, setPropsTask] = useState<Task>({
    id: props.id,
    title: props.title,
    description: props.description,
    date: props.date,
    status: props.status
  })

  const deleteTask = () => {
    const newTasks = tasks.filter(item => item.title !== props.title)
    changeTasks(newTasks)
  }

  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)
  
  const handleEditStatus = (newStatusValue:StatusOptions) => {
    const removePreviousItem:Array<Task> = tasks.filter(item => item.id !== propsTask.id)
    console.log(removePreviousItem)
    const newItem:Task = {
      id: propsTask.id,
      title: propsTask.title,
      description: propsTask.description,
      date: propsTask.date,
      status: newStatusValue
    }
    const newTasks:Array<Task> = [...removePreviousItem, newItem]
    changeTasks(newTasks)
  }

  useEffect(() => {
    setPropsTask({
      id: props.id,
      title: props.title,
      description: props.description,
      date: props.date,
      status: props.status
    })
  }, [props]);

  return (
    <>
      <Grid item  direction="column" container id={propsTask.id}>
        <Card id='Card'>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {propsTask.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {propsTask.description}
            </Typography>

            <Box display="block" justifyContent="space-evenly">
              <Box display="flex" justifyContent="space-around">
                <Typography variant="caption">
                  cadastro: {dayjs(propsTask.date).format('DD/MM/YYYY HH:mm:ss')}
                </Typography>
                <Typography variant="caption">
                  status: {propsTask.status}
                </Typography>
              </Box>
              <FormControl>
                <InputLabel>Selecionar Status</InputLabel>
                <Select
                  value={propsTask.status}
                  label="Status"
                  onChange={(e)=> handleEditStatus(e.target.value as StatusOptions)}
                >
                  <MenuItem value={StatusOptions.Pending}>Pendente</MenuItem>
                  <MenuItem value={StatusOptions.Doing}>Em andamento</MenuItem>
                  <MenuItem value={StatusOptions.Finish}>Concluída</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </CardContent>
          <CardActions>
            <IconButton
              onClick={deleteTask}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
            onClick={handleOpen}
            >
              <EditIcon />
            </IconButton>
            <ModalChangeTask
              open={openModal}
              onClose={handleClose}
              modifyTask={propsTask}
            />
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default TaskCard
