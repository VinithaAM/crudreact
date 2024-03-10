import {
  Box,
  Button,
  Container,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { forwardRef, useState } from "react";
import { IMaskInput } from "react-imask";
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import './styles.css';
import { IEmployeeDetails, emptyObject } from "../../Types.ts/Employee";

const NewEmployee = () => {
  const [employeeDetail,setEmplyeeDetails]=useState<IEmployeeDetails>(emptyObject)
  const [value, setValue] = useState<Dayjs | null>(null);
  const [genderValue, setGenderValue] = useState("");
  const [userStatus, setUserStatus] = useState(true)
  const [accountType, setAccountType] = useState('')
  const [isSharedAccount, setIsSharedAccount] = useState(false)
  const [firstName,setFirstName]=useState('')
  const [lastname,setLastName]=useState('')

  const handleEditEmployee = (field: string, value: any, id: number) => {
    console.log( value, id);
    setEmplyeeDetails((p) => {
      if (p.id === id) {
        if(field==='dateOfBirth'){
          setValue(value)
        }
        if(field==='userStatus'){
          setUserStatus(!userStatus)
        }
        return { ...p, [field]: value };
       
      }
      return p;
    });
    console.log("empl+++",employeeDetail)
  };
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue(event.target.value);
    handleEditEmployee('gender',event.target.value,employeeDetail.id)
  };
  const handleChangeAccountType = (event: any) => {
    setAccountType(event.target.value);
    if (event.target.value === "Shared") {
      setIsSharedAccount(true)
    }
    else {
      setIsSharedAccount(false)
    }
    handleEditEmployee("accountType",(event.target.value),employeeDetail.id)
  };
  function generateAlphaNumeric(length: number): string {
    const alphanumeric =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += alphanumeric.charAt(
        Math.floor(Math.random() * alphanumeric.length)
      );
    }
    return result;
  }
  const alphaNumericValue = generateAlphaNumeric(8); // Generates an 8-character alphanumeric string
  console.log(alphaNumericValue);
  interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
  const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
      {...other}
      mask="(#00) 0000-0000"
      definitions={{ '#': /[1-9]/ }}
      onAccept={(value) => handleEditEmployee("phoneNumber",value,employeeDetail.id)}
      overwrite
    />
      );
    }
  );
  return (
    <Container>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Box>
          <h3>Add New Employee Detail</h3>
        </Box>
        <Box style={{ display: "flex", justifyContent:"space-between",alignItems:"center"}}>
          <Box sx={{display:"flex",flexDirection:"column" ,justifyContent:"center"}}>
            <div className="styles.classNameFromCSS">
            <InputLabel >FirstName</InputLabel>
            </div>
           
            <TextField type="text" onChange={(e)=>handleEditEmployee("firstName",e?.target?.value,employeeDetail.id)} />
          </Box>
          <Box  sx={{display:"flex",flexDirection:"column" ,justifyContent:"center"}}>
            <InputLabel>Last Name</InputLabel>
            <TextField type="text" 
           onChange={(e)=>handleEditEmployee("lastName",e?.target?.value,employeeDetail.id)}
          
  />
          </Box>
        </Box>
        <div style={{ display: "flex" }}>
          <Box>
            <InputLabel>EmployeeId</InputLabel>
            <TextField type="text" />
          </Box>
          <Box>
            <InputLabel>Gender</InputLabel>
            <Radio
              checked={genderValue === "Male"}
              onChange={handleChangeGender}
              value="Male"
              name="radio-buttons"
              inputProps={{ "aria-label": "Male" }}
            />
            <label htmlFor="Male">Male</label>
            <Radio
              checked={genderValue === "Female"}
              onChange={handleChangeGender}
              value="Female"
              name="radio-buttons"
              inputProps={{ "aria-label": "Female" }}
            />
            <label htmlFor="Female">Female</label>
            <Radio
              checked={genderValue === "Others"}
              onChange={handleChangeGender}
              value="Others"
              name="radio-buttons"
              inputProps={{ "aria-label": "Others" }}
            />
            <label htmlFor="Others">Others</label>
          </Box>
        </div>
        <div style={{ display: "flex" }}>
          <Box>
            <InputLabel>DateOfBirth</InputLabel>
           
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={value}
                  label="Basic date picker"
                  onChange={(newValue) => handleEditEmployee('dateOfBirth',newValue,employeeDetail.id)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box>
            <InputLabel>Age</InputLabel>
            <TextField disabled={true} value="25" />
          </Box>
        </div>
        <div style={{ display: "flex" }}>
          <Box>
            <InputLabel>Code</InputLabel>
            <TextField disabled defaultValue={"+61"} />
          </Box>

          <Box>
            <InputLabel>PhoneNumber</InputLabel>

            <TextField
              placeholder={"4 _ _ _ _ _ _ _ _"}
              InputProps={{
                inputComponent: TextMaskCustom as any,
              }}
             
            />
          </Box>
        </div>
        <div style={{ display: "flex" }}>
          <Box>
            <InputLabel>Email</InputLabel>
            <TextField   onChange={(e)=>handleEditEmployee("email",e?.target?.value,employeeDetail.id)}/>
          </Box>
          <Box>
            <InputLabel>UserStatus</InputLabel>
            <IconButton
              onClick={(e) => handleEditEmployee("userStatus",(!userStatus),employeeDetail.id)}
              //onChange={(e)=>handleEditEmployee("userStatus",(!userStatus),employeeDetail.id)}
              >
              {userStatus ? <ToggleOnOutlinedIcon style={{ color: 'green', fontSize: 50 }} /> : <ToggleOffOutlinedIcon style={{ color: 'red', fontSize: 50 }} />}
              <Typography variant="body1" style={{ marginLeft: 8 }}>
                {userStatus ? 'Enabled' : 'Disabled'}
              </Typography>
            </IconButton>
          </Box>
        </div>
        <div style={{ display: "flex" }}>
          <Box>
            <InputLabel>AccountType</InputLabel>
            <Box>
              <Select
                style={{
                  width: "120%",
                  borderBottom: "1px ",
                  borderBottomColor: "#EEEFE9",
                  borderTop: "1px ",
                  borderTopColor: "#d6d3ce",
                  textAlign: "left",
                }}

                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => handleChangeAccountType(e)}
              >
                <MenuItem value={"Shared"}>Shared</MenuItem>
                <MenuItem value={"Personal"}>Personal</MenuItem>
              </Select>
            </Box>
          </Box>
        </div>
        {isSharedAccount && (
          <Box>
            <InputLabel>Password</InputLabel>
            <TextField onChange={(e) => handleEditEmployee("password",e.target.value,employeeDetail.id)} />
            <InputLabel>ConfirmPassword</InputLabel>
            <TextField />
          </Box>
        )}

        <Box>
          <Button variant="contained" style={{ margin: 5, padding: 5 }}>

            Save
          </Button>
          <Button variant="contained" style={{ margin: 5, padding: 5 }}>

            Cancel
          </Button>
        </Box>

      </Box>
    </Container>
  );
};

export default NewEmployee;
