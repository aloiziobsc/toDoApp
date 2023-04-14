import { Box, Button, Card, Modal, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import './taskList.scss'
import { Task } from '../../context/ContextTypes';
import { AppContext } from '../../context/AppContext';

const ModalChangeTask = ({ open, onClose, modifyTask }:any) => {
  const { tasks, changeTasks} = useContext(AppContext)
  const [title, setTitle] = useState(modifyTask.title)
  const [description, setDescription] = useState(modifyTask.description)

  const handleEditTask = () => {
    const removePreviousItem = tasks.filter(item => item.id !== modifyTask.id)
    const newItem = {
      id: modifyTask.id,
      title,
      description,
      date: modifyTask.date,
      status: modifyTask.status
    }
    const newTasks = [...removePreviousItem, newItem]
    changeTasks(newTasks)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} id="Modal">
      <Card style={{padding:'10px'}}>
      <div>
        <h2>Editar Tarefa</h2>
        <form>
          <TextField
            label="Título"
            value={title}
            onChange={(e:any) => setTitle(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={(e:any) => setDescription(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Box display="flex" justifyContent="space-evenly">
            <Button variant="outlined" color="primary" onClick={() => onClose()}>
              Fechar
            </Button>
            <Button variant="contained" color="primary" onClick={handleEditTask}>
              Alterar
            </Button>
          </Box>
        </form>
      </div>
      </Card>
    </Modal>
  );
};

export default ModalChangeTask;
