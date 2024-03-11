import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import DatePicker from "react-datepicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { forwardRef, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import "./styles.css";
import { IEmployeeDetails, emptyObject } from "../../Types.ts/Employee";
import { useLocation, useNavigate } from "react-router-dom";
import { getRandomNumber } from "../../Constants/RandomNumber";
import { createNewEmployee, updateEmployeeDetails } from "../../Services/EmployeeService";
import { ToastContainer, toast } from "react-toastify";
import PasswordChecklist from "react-password-checklist"
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const NewEmployee = (prop: IEmployeeDetails) => {
  const navigation=useNavigate();
  const location = useLocation();
  const state = location.state;
  const [employeeDetail, setEmplyeeDetails] = useState<IEmployeeDetails>(emptyObject);
  const [dob, setDob] = useState(null);
  const [genderValue, setGenderValue] = useState("");
  const [userStatus, setUserStatus] = useState(true);
  const [enableTwofactor, setEnableTwofactor] = useState(false);
  const [isSharedAccount, setIsSharedAccount] = useState(false);
  const [action, setAction] = useState("");
  const [confirmPassword,setConfirmPassword]=useState('')
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (state?.options !== null && state?.options != undefined) {
      setEmplyeeDetails(state.options.param);
      setAction(state.options.action);
      setGenderValue(state.options.param.gender);
      setUserStatus(state.options.param.userStatus);
      setConfirmPassword(state.options.param.password)
      if (state.options.param.accountType === "Shared") {
        setIsSharedAccount(true);
      }
      if (state.options.param.enableTwoFactor === true) {
        setEnableTwofactor(true);
      }
      if(state.options.param.dateOfBirth !==undefined){
        setDob(state.options.param.dateOfBirth)
      }
      if (state.options.param.phoneNumber !== undefined && state.options.param.phoneNumber !== null) {
        let phoneNumberParts = state.options.param.phoneNumber.split(" ");
        setEmplyeeDetails({
          ...state.options.param,
          phoneNumber: phoneNumberParts[1],
        });
      }
    } else {
      setEmplyeeDetails({
        ...employeeDetail,
        employeeId: handleEmployeeIdGeneration(),
      });
    }
  }, []);
  const handleEditEmployee = (field: string, value: any, id: number) => {
    setEmplyeeDetails((p) => {
      if (p.id === id) {
        if (field === "dateOfBirth") {
          setDob(value);
           var today = new Date();
          var birthDate = value;
           var age_now = today.getFullYear() - birthDate.getFullYear();
           p.age = age_now;
           p.dateOfBirth = value;
          console.log("date",value)
        }
        if (field === "userStatus") {
          setUserStatus(!userStatus);
        }
        if (field === "enableTwoFactor") {
          setEnableTwofactor(value);
        }
        if(field==="email"){
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(value);
          setIsValid(isValidEmail);
        }
        console.log("de",employeeDetail)
        return { ...p, [field]: value };
      }
      return p;

    });
  };
  const handleEmployeeIdGeneration = () => {
    const randomNumber = getRandomNumber(1, 100000);
    const employeeNUmber = "ABC" + randomNumber;
    return employeeNUmber;
  };
 const handlecancel =()=>{
        navigation("/employeedetails")
 }
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue(event.target.value);
    handleEditEmployee("gender", event.target.value, employeeDetail.id);
  };
  const handleChangeAccountType = (event: any) => {
    // setAccountType(event.target.value);
    if (event.target.value === "Shared") {
      setIsSharedAccount(true);
    } else {
      setIsSharedAccount(false);
    }
    handleEditEmployee("accountType", event.target.value, employeeDetail.id);
  };
  const saveValue=async ()=>{
    // await setEmplyeeDetails((p) => {
    //   ...employeeDetail,
    //   createdBy: 1,
    //   createdDateTime: new Date(),
    //  // phoneNumber: ("+61 " + employeeDetail.phoneNumber)
    // })
  }
  const handleSave = async()=>{
    if(action==="Edit"){
      setEmplyeeDetails({
        ...employeeDetail,
        modifiedBy: 1,
        modifiedDateTime: new Date(),
        phoneNumber: "+61 " + (employeeDetail.phoneNumber ?? "")
      })
        try{
          
          console.log(employeeDetail)
          updateEmployeeDetails(employeeDetail).then(result=>{
            if(result.data.status==="Success"){
              toast(result.data.message)
              navigation("/employeedetails")
            }
          }).catch(error=>{
            console.log(error)
          })
        }
        catch(error){
          console.log(error);
          navigation("/")
        }
    }
    else{
      setEmplyeeDetails({
        ...employeeDetail,
        createdBy: 1,
        createdDateTime: new Date(),
        phoneNumber: "+61 " + (employeeDetail.phoneNumber ?? "")
      })
        try{
          
          console.log(employeeDetail)
         await createNewEmployee(employeeDetail).then(result=>{
            if(result.data.status==="Success"){
              toast(result.data.message)
              navigation("/employeedetails")
            }
          }).catch(error=>{
            console.log(error)
          })
        }
        catch(error){
          console.log(error);
          navigation("/")
        }
    }
   
  }
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
          definitions={{ "#": /[1-9]/ }}
          onAccept={(value) =>
            handleEditEmployee("phoneNumber", value, employeeDetail.id)
          }
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
          <Typography >
            {action === "View"
              ? "View Employee Detail"
              : action === "Edit"
              ? "Update Employee Detail"
              : "Add New Employee Detail"}
          </Typography>
        </Box>
        {/* <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin:5
          }}
        > */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin:1
            }}
          >
          
              <InputLabel>FirstName</InputLabel>
           

            <TextField
              type="text"
              required
              className="small-textfield"
              inputProps={{ maxLength: 100 }}
              value={employeeDetail.firstName}
              onChange={(e) =>
                handleEditEmployee(
                  "firstName",
                  e?.target?.value,
                  employeeDetail.id
                )
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin:1
            }}
          >
            <InputLabel>Last Name</InputLabel>
            <TextField
            required
              type="text"
              inputProps={{ maxLength: 100 }}
              className="small-textfield"
              value={employeeDetail.lastName}
              onChange={(e) =>
                handleEditEmployee(
                  "lastName",
                  e?.target?.value,
                  employeeDetail.id
                )
              }
            />
          </Box>
    
          <Box  sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin:1
            }}>
            <InputLabel>EmployeeId</InputLabel>
            <TextField
              type="text"
              className="small-textfield"
              value={employeeDetail.employeeId}
              disabled={true}
            />
          </Box>
          <Box  sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              margin:1
            }}>

            <InputLabel>Gender</InputLabel>
            <Box sx={{flexBasis:"row"}}>
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
          </Box>
      
       
          <Box  sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin:1
            }}>
            <InputLabel>DateOfBirth</InputLabel>
            <DatePicker onChange={(e)=>handleEditEmployee("dateOfBirth",e,employeeDetail.id)} value={dob}    />
              {/* <div style={{ overflow: 'hidden' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DemoContainer components={["DatePicker"]} >
                <DatePicker className="datepicker"
                  value={dob}
                  label="Select DOB"
                  onChange={(newValue) =>
                    handleEditEmployee(
                      "dateOfBirth",
                      newValue,
                      employeeDetail.id
                    )
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
            </div> */}
          </Box>

          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin:1}}>
            <InputLabel>Age</InputLabel>
            <TextField disabled={true} value={employeeDetail.age} className="verysmall-textfield"/>
          </Box>
       
    
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin:1}}
              >
            <InputLabel>Code</InputLabel>
            <TextField disabled defaultValue={"+61"} className="verysmall-textfield" />
          </Box>

          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin:1}}>
            <InputLabel>PhoneNumber</InputLabel>

            <TextField
              value={employeeDetail.phoneNumber}
              className="small-textfield"
              onChange={(event) =>
                handleEditEmployee(
                  "phoneNumber",
                  event.target.value,
                  employeeDetail.id
                )
              }
              // InputProps={{
              //   inputComponent: TextMaskCustom as any,
              // }}
            />
          </Box>
      
  
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin:1}} >
            <InputLabel>Email</InputLabel>
            <TextField className="small-textfield"
              value={employeeDetail.email}
              onChange={(e) =>
                handleEditEmployee("email", e?.target?.value, employeeDetail.id)
              }
            />
            {!isValid && 
        <span style={{ color: 'red' }}>Invalid email address</span>
      }
          </Box>
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin:1}}>
            <InputLabel>UserStatus</InputLabel>
            <IconButton
              onClick={(e) =>
                handleEditEmployee("userStatus", !userStatus, employeeDetail.id)
              }
              //onChange={(e)=>handleEditEmployee("userStatus",(!userStatus),employeeDetail.id)}
            >
              {userStatus ? (
                <ToggleOnOutlinedIcon
                  style={{ color: "green", fontSize: 50 }}
                />
              ) : (
                <ToggleOffOutlinedIcon style={{ color: "red", fontSize: 50 }} />
              )}
              <Typography variant="body1" style={{ marginLeft: 8 }}>
                {userStatus ? "Enabled" : "Disabled"}
              </Typography>
            </IconButton>
          </Box>
        
    
          <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin:1}}>
            <InputLabel>AccountType</InputLabel>
            <Box>
              <Select className="small-textfield"
                style={{
                  width: "120%",
                  borderBottom: "1px ",
                  borderBottomColor: "#EEEFE9",
                  borderTop: "1px ",
                  borderTopColor: "#d6d3ce",
                  textAlign: "left",
                }}
                value={employeeDetail.accountType}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => handleChangeAccountType(e)}
              >
                <MenuItem value={"Shared"}>Shared</MenuItem>
                <MenuItem value={"Personal"}>Personal</MenuItem>
              </Select>
            </Box>
          </Box>
     
        {isSharedAccount && (
          <Box
            sx={{
              display: "flex",
              flexDirection:"column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputLabel>Password</InputLabel>
            <TextField className="small-textfield"
              value={employeeDetail.password}
              onChange={(e) =>
                handleEditEmployee(
                  "password",
                  e.target.value,
                  employeeDetail.id
                )
              }
            />
           
            <InputLabel>ConfirmPassword</InputLabel>
            <TextField value={confirmPassword} className="small-textfield"/>  <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match","notEmpty"]}
				minLength={8}
				value={employeeDetail.password}
				//valueAgain={confirmPassword}
				onChange={(isValid) => {}}
			/>
      <Box sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin:1}}>
            <Checkbox
              checked={enableTwofactor}
              onChange={(e) =>
                handleEditEmployee(
                  "enableTwoFactor",
                  e.target.checked,
                  employeeDetail.id
                )
              }
            />
            <InputLabel>Enable TwoFactor Authendication</InputLabel>
          </Box>
          </Box>
        )}

        <Box>
          <Button
            variant="contained"
            style={{ margin: 5, padding: 5 ,textTransform:"capitalize",backgroundColor:"green"}}
            disabled={action === "View"}
            onClick={handleSave}
          >
            {action === "View" ? "Save" : action === "Edit" ? "Update" : "Save"}
          </Button>
          <Button variant="contained"  onClick={handlecancel} style={{ margin: 5, padding: 5,textTransform:"capitalize",backgroundColor:"gray" }}>
            Cancel
          </Button>
        </Box>
      </Box>
      <ToastContainer
      className="toast-container"
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
      progressClassName="custom-toast-progress" 
   />
    </Container>
  );
};

export default NewEmployee;
