import { Grid } from '@mui/material'
const SideComponent = () => {

  return (
    <Grid sx={{ bgcolor: 'white', width: 0.30, height: 0.4, borderRadius: 1,float: 'right',"@media (max-width: 768px)": { width: 1, mx:'auto', mt: 2 } }} >
    </Grid>
  )
}

export default SideComponent;