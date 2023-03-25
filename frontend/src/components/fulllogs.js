import { useState } from "react";
import { Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Pagination } from "@mui/lab";
import { logsData } from '../services.js/data'
import UsePagination from '../services.js/pagination'

const Logs = () => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const count = Math.ceil(logsData.users.length / PER_PAGE);
  const _DATA = UsePagination(logsData.users, PER_PAGE);
  const handleChange = (e, p) => { setPage(p); _DATA.jump(p); };

  return (
    <Grid sx={{ bgcolor: 'white', width: 1 / 2, mx: 'auto', my: 2, borderRadius: 2, "@media (max-width: 768px)": { width: '100%' } }}>
      <List sx={{}}>
        {_DATA.currentData().map(data => (
          <>
            <ListItem key={data.id}>
              <ListItemText primary={data.address.city} secondary={data.birthDate} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>

        ))}
      </List>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        sx={{ float: 'right' }}
      />
    </Grid>
  )
}
export default Logs