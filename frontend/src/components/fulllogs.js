import { Grid, Box, Typography } from '@mui/material'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'

import { logsData } from '../services.js/data'


const columns = [
  { field: 'id', headerName: 'ID' ,width:110},//width-90
  { field: 'name', headerName: 'Name',width:150 },//width-150
  { field: 'email', headerName: 'Date', width: 180 },//width-110
  { field: 'username', headerName: 'Time', width: 160 },//width-160
  { field: 'website', headerName: 'Type', width: 150 },//width-150
  
]

const Logs = () => {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setTableData(data))
    }, [])

    console.log(tableData)
  
    return (
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 8,
                        },
                      },
                    }}
                    pageSizeOptions={[8]}
                    disableRowSelectionOnClick
        />
      </div>
     )
  }
  
  export default Logs