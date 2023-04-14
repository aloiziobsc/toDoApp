import { Box, Card, CardContent, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { StatusOptions, Task } from '../../context/ContextTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs'
import ModalChangeTask from './ModalChangeTask';
import StatusColor from './StatusColor';

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
    <Box sx={{ s: 1 }} />
      <Grid item  direction="column" container>
        <Card id='card'>
          <CardContent>
            <Typography variant="h6">
              {propsTask.title}
            </Typography>
            <Box sx={{ m: 1 }} />

            <Box display="block">
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" >
                  {propsTask.description}
                </Typography>
                <Box id="statusContainer">
                  <Box display="flex" justifyContent="center">
                    <Typography variant="caption">
                    {propsTask.status.toString()}
                    </Typography>
                    <StatusColor status={propsTask.status}/>
                  </Box>
                  <Box sx={{ m: 2 }} />
                  <FormControl>
                    <InputLabel>Alterar</InputLabel>
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
              </Box>
            </Box>
          </CardContent>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant="caption" id="date">
              {dayjs(propsTask.date).format('DD/MM/YYYY (HH:mm:ss)')}
            </Typography>
            <Box display={'flex'} justifyContent={'space-around'}>
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
            </Box>

            <ModalChangeTask
              open={openModal}
              onClose={handleClose}
              modifyTask={propsTask}
            />
          </Box>
        </Card>
      </Grid>
    </>
  )
}

export default TaskCard
