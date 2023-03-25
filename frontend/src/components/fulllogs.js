import { useState } from "react";
import {List,Grid, ListItem, ListItemText, Divider,ListItemAvatar,Avatar,Pagination} from '@mui/material';
import { logsData } from '../services.js/data'
import UsePagination from '../services.js/pagination';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';

import * as React from 'react';

const Logs = () => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(logsData.users.length / PER_PAGE);
  const _DATA = UsePagination(logsData.users, PER_PAGE);
  const handleChange = (e, p) => { setPage(p); _DATA.jump(p); };
 
  return (
    <Grid sx={{ bgcolor: 'white', width:'330px', mx: 'auto', my: 2, borderRadius: 2, "@media (max-width: 768px)": { width: '100%' } }}>
      <List sx={{}}>
        {_DATA.currentData().map((data, index) => (
          <React.Fragment key={data.id}>
            <ListItem key={data.id} alignItems="center">
              <ListItemAvatar>
                <Avatar>
                  {data.gender === 'male' ? <SendIcon /> : <ReplyIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={data.firstName}
                secondary={
                  <>
                    <span>{data.birthDate}</span>
                    <br />
                    <span>{data.height}</span>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          sx={{float: 'right'}}
        />
    </Grid>
  );
}

export default Logs;
