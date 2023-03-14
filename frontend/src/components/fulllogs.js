import { Grid, Box, Typography } from '@mui/material'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

import { logsData } from '../services.js/data'

const Logs = () => {

  return (
    <Grid sx={{ bgcolor: 'white', m: 'auto', borderRadius: 1 }} >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        m: 1,
        alignItems: 'center',
      }}>
        {logsData.map(data=> (
          <Typography key={data.id}><BadgeOutlinedIcon />{data.name} <MailOutlinedIcon />{data.username}</Typography>
        ))}
      </Box>
    </Grid>
  )
}

export default Logs;