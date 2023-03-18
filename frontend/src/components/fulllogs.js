import { Grid, Box, Typography } from '@mui/material'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { logsData } from '../services.js/data'

// const Logs = () => {

//   return (
//     // <Grid sx={{ bgcolor: 'white', m: 'auto', borderRadius: 1 }} >
//     //   <Box sx={{
//     //     display: 'flex',
//     //     flexDirection: 'column',
//     //     p: 1,
//     //     m: 1,
//     //     alignItems: 'center',
//     //   }}>
//     //     {logsData.map(data=> (
//     //       <Typography key={data.id}><BadgeOutlinedIcon />{data.name} <MailOutlinedIcon />{data.username}</Typography>
//     //     ))}
//     //   </Box>
//     // </Grid>

//   )
// }
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'Date',
    headerName: 'Date',
    type: 'string',
    width: 110,
    editable: true,
  },
  {
    field: 'Time',
    headerName: 'Time',
    type: 'string',
    width: 160,
    editable: true,
  },
  {
    field: 'Type',
    headerName: 'Type',
    type: 'string',
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, Name: 'Jon Snow', Date: '2023-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 2, Name: 'Jaime Stark', Date: '2023-05-01', Time: '13:00:00', Type: 'Vendor' },
  { id: 3, Name: 'Suman More', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 4, Name: 'Rituraj Gupta', Date: '2021-05-01', Time: '12:00:00', Type: 'Customer' },
  { id: 5, Name: 'Sahil Agarwal', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 6, Name: 'Rohan Verma', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 7, Name: 'Ritu gupta', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 8, Name: 'Sumo More', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 9, Name: 'Sahl agar', Date: '2021-05-01', Time: '12:00:00', Type: 'Customer' },
  { id: 10, Name: 'Rohu Verma', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 11, Name: 'Aman Agarwal', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },
  { id: 12, Name: 'Shruti Agarwal', Date: '2021-05-01', Time: '12:00:00', Type: 'Vendor' },


  
];

export default function Logs() {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

// export default Logs;