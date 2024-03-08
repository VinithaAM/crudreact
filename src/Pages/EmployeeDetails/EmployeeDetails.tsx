import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button, InputAdornment, InputLabel, TextField } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Search } from '@mui/icons-material';
import { IEmployeeDetails } from '../../Types.ts/Employee';
import { getUserDetails } from '../../Services/EmployeeService';

const EmployeeDetails = () => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'Name',
       width: 180,
      editable: false,
    },
    {
      field: 'employeeId',
      headerName: 'Employee Id',
       width: 120,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
       width: 150,
      editable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
      editable: false,
    },
    {
       field: 'email',
      headerName: 'E-Mail',
       width: 150,
      editable: false,
    },
    {
      field: 'accountType',
     headerName: 'Account Type',
      width: 150,
     editable: false,
   },
   {
    field: 'dateOfBirth',
   headerName: 'DOB',
    width: 150,
   editable: false,
 },
 {
  field: 'Action',
 headerName: 'Action',
 width: 250,
 editable: false,
 sortable: false,
 renderCell:(params) => {
  return (
    <>
    <Button variant="contained" style={{margin:5,backgroundColor:"green"}} onClick={() => handleButtonClick(params.row)}>View</Button>
    <Button variant="contained" style={{margin:5}}onClick={() => handleButtonClick(params.row)}>Edit</Button>
    <Button variant="contained" style={{margin:5,backgroundColor:"red"}}onClick={() => handleButtonClick(params.row)}>Delete</Button>
    </>
  );
}
},
    // {
    //   field: 'fullName',
    //   headerName: 'Phone Number',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  const handleButtonClick =(param:any)=>{
      console.log("bu",param)
  }
  const [employeeDetails,setEmployeeDetails]=useState<IEmployeeDetails[]>([])
  useEffect(()=>{
    getEmployeeDetails();
  },[])
  const getEmployeeDetails =()=>{
      try{
        getUserDetails().then(result=>{
          if(result.data.status==="Success"){
            setEmployeeDetails(result.data.data)
          }
          else{
            alert(result.data.message)
          }
        }).catch(error=>{
          console.log(error)
        })
      }
      catch{

      }
  }
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  ];
  const CustomToolbar = () => (
    // <GridToolbar>
      <TextField
        value={searchText}
        onChange={(event) => requestSearch(event.target.value)}
        placeholder="Search..."
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">
        //       <Search />
        //     </InputAdornment>
        //   ),
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <button onClick={clearSearch}>Clear</button>
        //     </InputAdornment>
        //   ),
        // }}
      />
    // </GridToolbar>
  );
  const [searchText, setSearchText] = React.useState('');

  const requestSearch = (searchValue:any) => {
    console.log("filter",searchValue)
    setSearchText(searchValue);
    // Perform search logic here
  };

  const clearSearch = () => {
    setSearchText('');
    // Clear search logic here
  };
  return (
    <Box sx={{ width: '100%',margin:5,marginRight:5 }}>
      <Box>
        <h3>Employee Details</h3>
      <InputLabel style={{ alignSelf: "flex-end"}}>TotalCount:20</InputLabel>
      <Button variant="contained" style={{margin:5,backgroundColor:"blue"}}>Add</Button>
      </Box>
   
      <DataGrid 
        sx={{margin:1 ,maxWidth:"100%",maxHeight:"10%"}}
        rows={employeeDetails}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        components={{
          Toolbar: CustomToolbar,
        }}
    
        // pageSizeOptions={[10]}
        // checkboxSelection
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableVirtualization
        //disableRowSelectionOnClick={false}
      />
    </Box>
  )
}

export default EmployeeDetails
