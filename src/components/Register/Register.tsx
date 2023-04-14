import { AppContext } from '../../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Button, Box, Typography } from '@mui/material';
import { StatusOptions, Task } from '../../context/ContextTypes';
import './register.scss'
import { v4 as uuidv4 } from 'uuid';

function Register() {
  const { tasks, changeTasks} = useContext(AppContext)
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const [newTaskDescription, setNewTaskDescription] = useState<string>('')
  const [disableButton, setDisableButton] = useState<boolean>(true)

  const verifyDisableButton = () => {
    if(newTaskTitle === '' || newTaskDescription === '') {
      setDisableButton(true)
    } else { setDisableButton(false) }
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value)
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDescription(e.target.value)
  }

  const createNewTask = () => {
    const newTask:Task = {
      id: uuidv4(),
      title: newTaskTitle,
      description: newTaskDescription,
      date: new Date().toString(),
      status: StatusOptions.Pending
    }
    changeTasks([...tasks, newTask])
  }

  useEffect(() => {
    setNewTaskTitle('')
    setNewTaskDescription('')
    verifyDisableButton()
  }, [tasks]);

  useEffect(() => {
    verifyDisableButton()
  }, [newTaskTitle, newTaskDescription]);

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h4" id="title">Cadastrar:</Typography>
      <Box sx={{ m: 1 }} />
      <Box>
        <TextField
          id="textfieldSearch"
          label="Tarefa"
          variant="outlined"
          value={newTaskTitle}
          onChange={handleChangeTitle}
          required={true}
          type='text'
        />
      </Box>
      <Box sx={{ m: 1 }} />
      <Box>
        <TextField
          id="textfieldSearch"
          label="Descrição"
          multiline
          rows={4}
          value={newTaskDescription}
          onChange={handleChangeDescription}
          required={true}
          type='text'
        />
      </Box>
      <Box sx={{ m: 1 }} />
      <Box>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={createNewTask}
          disabled={disableButton}
        >
          Adicionar tarefa
        </Button>
      </Box>
      <Box sx={{ m: 5 }} />
    </>
  )
}

export default Register
