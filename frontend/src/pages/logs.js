import React, { useState, useEffect } from 'react'
// import { DataGrid } from '@mui/x-data-grid'
// import { List, ListItem, ListItemText } from '@mui/material'
// const columns = [
//   { field: 'id', headerName: 'ID' },
//   { field: 'name', headerName: 'Name' },
// ]

const Logs = () => {

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])

  // console.log(tableData.slice(0, 5))

  return (
    <>
      {tableData.map(data => (
        <p key={data.id}>{data.name}</p> 
        // (data.id < 6) ? <p key={data.id}>{data.name}</p> : null
      ))}

    </>
    // <DataGrid
    //   rows={tableData.slice(0,5)}
    //   columns={columns}
    // />
  )
}

export default Logs