import { Label } from "@mui/icons-material"
import { Box, Button, Container, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
// import DatePicker from '@mui/lab/DatePicker';


const NewEmployee = () => {
  return (
   <Container>
    <Box>
      <Stack spacing={2}>
        <Box>
          <h3>Add New Employee Detail</h3>
        </Box>
        <InputLabel>
          FirstName
        </InputLabel>
        <TextField />
        <InputLabel>
          LastName
        </InputLabel>
        <TextField />
   
        <InputLabel>
          EmployeeId
        </InputLabel>
        <TextField />

        <InputLabel>
          DateOfBirth
        </InputLabel>
        <TextField
         />
          <InputLabel>
          Age
        </InputLabel>
        <TextField disabled={true} value="25"
         />
          <InputLabel>
          Gender
        </InputLabel>
        <TextField 
         />
           <InputLabel>
          Code
        </InputLabel>
        <TextField
         />
            <InputLabel>
          PhoneNumber
        </InputLabel>
        <TextField 
         />
           <InputLabel>
          Email
        </InputLabel>
        <TextField 
         />
           <InputLabel>
          UserStatus
        </InputLabel>
        <TextField 
         />
           <InputLabel>
          AccountType
        </InputLabel>
        <Select
                style={{
                  width: "100%",
                  borderBottom:"1px ",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px ",
                  borderTopColor:"#d6d3ce",
                  textAlign: "left",
                }}
                // sx={{
                //   "& .MuiOutlinedInput-notchedOutline": {
                //     border: "transparent"
                //   },
        
                //   "& .MuiOutlinedInput-root": {
                //     "&.Mui-focused fieldset": {
                //       border: "2px solid black"
                //     }
                //   }
                // }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="attendentSeat"
                // onChange={(e) =>
                //   handleEditPlanner(
                //     "attendantSheet",
                //     e.target.value,
                //     plannerItem.tempId
                //   )
                // }
              >
                
                  <MenuItem  value={10}>
                    Shared
                  </MenuItem>
                  <MenuItem  value={20}>
                    Personal
                  </MenuItem>
                
              </Select>
                <InputLabel>
          Status
        </InputLabel>
        <TextField 
         />
         <Box>
         <InputLabel>
          Password
        </InputLabel>
        <TextField 
         />
           <InputLabel>
          ConfirmPassword
        </InputLabel>
        <TextField 
         />
         </Box>
         <Box>
         <Button variant="contained"> Save</Button>
         <Button variant="contained"> Cancel</Button>
         </Box>
        
      </Stack>
    </Box>
    </Container>
  )
}

export default NewEmployee
