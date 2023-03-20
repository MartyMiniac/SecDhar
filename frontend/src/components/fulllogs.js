import { DataGrid } from '@mui/x-data-grid';
import { logsData } from '../services.js/data'


const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'firstName', headerName: 'Name' },
  { field: 'birthDate', headerName: 'Date' },
  { field: 'height', headerName: 'Time' },
  { field: 'eyeColor', headerName: 'Type' },

]

const Logs = () => {
  return (
    <div className='logsDiv'>
      <DataGrid
      autoHeight
        rows={logsData.users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5,8,10]}
        disableRowSelectionOnClick
        sx={{border: 0, }}
      />
    </div>
  )
}

export default Logs