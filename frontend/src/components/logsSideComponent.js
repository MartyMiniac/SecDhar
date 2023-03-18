import { Grid, Box, Typography } from '@mui/material';
import { logsData } from '../services.js/data';

const SideComponent = () => {

  return ( 
    <Grid sx={{ bgcolor: 'white', m: 'auto',borderRadius: 1, width: 0.4, "@media (max-width: 768px)": { width: 'auto' }}} >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        m: 1,
        alignItems: 'center',
      }}>
        {logsData.slice(0, 6).map(data => (
          <Typography key={data.id}>{data.name} {data.username}</Typography>
        ))}
      </Box>
    </Grid>
  )
}

export default SideComponent;