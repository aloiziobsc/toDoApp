import { Box, Typography } from '@mui/material'
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import './taskList.scss'

function NotFoundTask() {

  return (
    <Box id="notFound">
      <Box sx={{ m: 10 }} />
      <NotInterestedIcon/>
      <Typography variant="h6">
        Nenhuma tarefa encontrada
      </Typography>
    </Box>
  )
}

export default NotFoundTask
