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
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
// import { DataGridPro } from '@mui/x-data-grid-pro';
import { Clear, Search } from "@mui/icons-material";
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
import "./Employee.style.css";
import { ToastContainer, toast } from "react-toastify";

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
      headerClassName: "customHeader",
      flex: 1,
      valueGetter: (params) => {
        return `${params.row.firstName || ""} ${
          params.row.lastName || ""
        }`.trim();
      },
    },
    {
      field: "employeeId",
      headerName: "Employee Id",
      width: 120,
      editable: false,
      headerClassName: "customHeader",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      editable: false,
      headerClassName: "customHeader",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: false,
      headerClassName: "customHeader",
      flex: 1,
    },
    {
      field: "email",
      headerName: "E-Mail",
      width: 150,
      editable: false,
      headerClassName: "customHeader",
      flex: 1,
    },
    {
      field: "accountType",
      headerName: "Account Type",
      width: 150,
      editable: false,
      headerClassName: "customHeader",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      width: 150,
      editable: false,
      // cellClassName: (params) => (params.value===true ? 'activeCell' : 'inactiveCell'),
      // valueFormatter:(param)=>param.value===true?"Active":"In Active",
      renderCell: (param) => format(param.value, "dd-MM-yyyy"),
      //valueFormatter:(params) => format(params.value,"dd-MM-yyyy"),
      headerClassName: "customHeader",
      flex: 1,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 200,
      editable: false,
      flex: 1,
      sortable: false,
      headerAlign: "center",
      headerClassName: "customHeader",
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
  const [searchEmployeeDetails, setSearchEmployeeDetails] = useState<
    IEmployeeDetails[]
  >([]);
  const [deleteItem, setDeleteItem] = useState<IEmployeeDetails>();
  useEffect(() => {
    getEmployeeDetails();
  }, [employeeDetails]);
  const getEmployeeDetails = () => {
    try {
      getUserDetails()
        .then((result) => {
          if (result.data.status === "Success") {
            setEmployeeDetails(result.data.data);
          } else {
            toast(result.data.message);
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
  // const CustomToolbar = () => (
  //   <GridToolbar>
  //     <TextField
  //       value={searchText}
  //       onChange={(event) => requestSearch(event.target.value)}
  //       placeholder="Search..."
  //       InputProps={{
  //         startAdornment: (
  //           <InputAdornment position="start">
  //             <Search />
  //           </InputAdornment>
  //         ),
  //         endAdornment: (
  //           <InputAdornment position="end">
  //             <IconButton onClick={clearSearch}>
  //               <Clear />
  //             </IconButton>
  //           </InputAdornment>
  //         ),
  //       }}
  //     />
  //   </GridToolbar>
  // );
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const requestSearch = (searchValue: any) => {
    console.log("filter", searchValue);
    if (searchValue !== "") {
      setSearchText(searchValue);
      const filteredRows = employeeDetails.filter(
        (row) =>
          row.gender?.toLowerCase().includes(searchValue.toLowerCase()) ||
          (row.firstName + " " + row.lastName).toLowerCase().includes(searchValue.toLowerCase()) ||
          format(row.dateOfBirth?row.dateOfBirth?.toString().split("T")[0]:'', "dd-MM-yyyy")
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          row.lastName
            ?.toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          row.employeeId?.toLowerCase().includes(searchValue.toLowerCase()) ||
          row.phoneNumber?.toLowerCase().includes(searchValue.toLowerCase()) ||
          row.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
          row.accountType?.toLowerCase().includes(searchValue.toLowerCase())
      );
      // const filteredRows = employeeDetails.filter(row =>
      //   Object.values(row).some(value =>
      //     String(value).toLowerCase().includes(searchValue.toLowerCase())
      //   )
      // );
      setSearchEmployeeDetails(filteredRows);
    } else {
      setSearchText("");
      setSearchEmployeeDetails([]);
    }
    // Perform search logic here
  };

  const clearSearch = () => {
    setSearchText("");
    setSearchEmployeeDetails([]);
  };
  const handleClickOpen = (param: IEmployeeDetails) => {
    setOpen(true);
    setDeleteItem(param);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    try {
      deleteEmployeeDetails(deleteItem?.id ? deleteItem.id : 0)
        .then((result) => {
          if (result.data.status === "Success") {
            getEmployeeDetails();
            setOpen(false);
          } else {
            toast(result.data.message);
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
  const handleAddNewUser = () => {
     startTransition(() => {
      navigation("/employeedetail/new");
     });
  };
  function CustomToolbar() {
    return (
   
        <Typography variant="body2" color="textSecondary">
          Total rows: {employeeDetails.length}
        </Typography>
    );
  }
  return (
    <Box>
      <Box>
        <Typography
          sx={{ fontWeight: "900" }}
          display={"flex"}
          justifyContent={"center"}
        >
          Employee Details
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField 
          size="small"
            value={searchText}
            onChange={(event) => requestSearch(event.target.value)}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" >
                  <Search  sx={{margin:0,padding:0}}/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} sx={{margin:0,padding:0}}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography display={"flex"} justifyContent={"center"} sx={{fontWeight:"700"}}>
            Total Count: 
            <span style={{fontWeight:100}}>
            {searchEmployeeDetails.length > 0
              ? searchEmployeeDetails.length
              : employeeDetails.length}
              </span>
          </Typography>

          <Button
            variant="contained"
            // startIcon={<AddCircleOutlineIcon />}
            style={{
              margin: 15,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              textTransform: "capitalize",
              color: "primary",
              padding: 5,
            }}
            onClick={handleAddNewUser}
          >
            Add New
          </Button>
        </Box>
      </Box>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
        
        rows={searchText !== "" ? searchEmployeeDetails : employeeDetails}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableColumnMenu
        disableColumnSelector={false}
        disableDensitySelector={false}
        disableVirtualization={false}
        disableRowSelectionOnClick={true}
      />
      </div>
     

      <Dialog
        sx={{ boxSizing: "100%" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" fontWeight={"500"} color={"#000000"}>
            Are you sure you want to delete this detail?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Ok</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        className="toast-container"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        progressClassName="custom-toast-progress"
      />

    </Box>
  );
};

export default EmployeeDetails;
