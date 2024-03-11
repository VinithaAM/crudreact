import React, { startTransition, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// GridToolbar, GridValueGetterParams, InputAdornment, InputLabel,
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
// import { DataGridPro } from '@mui/x-data-grid-pro';
import { Search } from "@mui/icons-material";
import { IEmployeeDetails } from "../../Types.ts/Employee";
import {
  deleteEmployeeDetails,
  getUserDetails,
} from "../../Services/EmployeeService";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavigateOptions, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const EmployeeDetails = () => {
  const navigation = useNavigate();
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    // {
    //   field: "firstName",
    //   headerName: "Name",
    //   width: 180,
    //   editable: false,
    // },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return `${params.row.firstName || ''} ${params.row.lastName || ''}`.trim();
      },},
    {
      field: "employeeId",
      headerName: "Employee Id",
      width: 120,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "E-Mail",
      width: 150,
      editable: false,
    },
    {
      field: "accountType",
      headerName: "Account Type",
      width: 150,
      editable: false,
    },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      width: 150,
      editable: false,
      valueFormatter:(params) => format(params.value,"dd/MM/yyyy"),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 250,
      editable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size="large"
              style={{ color: "gray" }}
              sx={{ mr: 1 }}
              onClick={() => handleButtonClick(params.row, "View")}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              size="large"
              style={{ color: "green" }}
              sx={{ mr: 1 }}
              onClick={() => handleButtonClick(params.row, "Edit")}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              size="large"
              style={{ color: "red" }}
              sx={{ mr: 1 }}
              onClick={() => handleClickOpen(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
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
  const handleButtonClick = (param: IEmployeeDetails, action: string) => {
    startTransition(() => {
      const options = { param: param, action: action } as NavigateOptions & {
        param: IEmployeeDetails;
      };
      console.log("bu", param);
      navigation("/employeedetail/new", { state: { options } });
    });
  };
  const [employeeDetails, setEmployeeDetails] = useState<IEmployeeDetails[]>(
    []
  );
  const [deleteItem, setDeleteItem] = useState<IEmployeeDetails>();
  useEffect(() => {
    getEmployeeDetails();
  }, []);
  const getEmployeeDetails = () => {
    try {
      getUserDetails()
        .then((result) => {
          if (result.data.status === "Success") {
            setEmployeeDetails(result.data.data);
          } else {
            alert(result.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error occured", error);
      navigation("/");
    }
  };
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 14,phonenumber:'123',email:'sample@123',accounttype:'personal',DOB:'20-11-2022' },
  // ];
  const CustomToolbar = () => (
    // <GridToolbar>
    <TextField
      value={searchText}
      onChange={(event) => requestSearch(event.target.value)}
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <button onClick={clearSearch}>Clear</button>
          </InputAdornment>
        ),
      }}
    />
    // </GridToolbar>
  );
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const requestSearch = (searchValue: any) => {
    console.log("filter", searchValue);
    setSearchText(searchValue);
    // Perform search logic here
  };

  const clearSearch = () => {
    setSearchText("");
  };
  const handleClickOpen = (param: IEmployeeDetails) => {
    setOpen(true);
    setDeleteItem(param);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (param: any) => {
    console.log("param", deleteItem);
    try {
        deleteEmployeeDetails(deleteItem?.id ? deleteItem.id : 0)
        .then((result) => {
          if (result.data.status === "Success") {
            getEmployeeDetails();
            setOpen(false);
          } else {
            alert(result.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error occured", error);
      navigation("/");
    }
  };
  const handleAddNewUser=()=>{
    startTransition(() => {
    navigation("/employeedetail/new");
    })
  }
  return (
    <Box>
      <Box>
        <Typography display={"flex"} justifyContent={"center"}>
          Employee Details
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography display={"flex"} justifyContent={"flex-start"}>
            TotalCount:{employeeDetails.length}
          </Typography>
          
          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            style={{
              margin: 15,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              textTransform:"capitalize",
              color:"primary", 
              
              padding:5
            }}
            onClick={handleAddNewUser}
          >
            Add New
          </Button>
        </Box>
      </Box>

      <DataGrid
        sx={{ margin: 1, maxWidth: "100%", maxHeight: "10%" }}
        rows={employeeDetails}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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
      <Dialog
        sx={{ boxSizing: "80%" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this detail?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => handleDelete(event)}>Ok</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeDetails;
