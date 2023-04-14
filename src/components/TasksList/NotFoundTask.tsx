import { Box, Typography } from '@mui/material'
import './taskList.scss'

function NotFoundTask() {

  return (
    <Box id="Box">
      <Typography variant="h6" gutterBottom>
        Nenhuma tarefa encontrada
      </Typography>
    </Box>
  )
}

export default NotFoundTask
