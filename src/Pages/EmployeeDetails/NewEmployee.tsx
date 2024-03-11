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
          <Typography>
            {action === "View"
              ? "View Employee Detail"
              : action === "Edit"
              ? "Update Employee Detail"
              : "Add New Employee Detail"}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className="styles.classNameFromCSS">
              <InputLabel>FirstName</InputLabel>
            </div>

            <TextField
              type="text"
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
          {/* </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          > */}
            <InputLabel>Last Name</InputLabel>
            <TextField
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
        </Box>
        <div style={{ display: "flex" }}>
          <Box>
            <InputLabel>EmployeeId</InputLabel>
            <TextField
              type="text"
              className="small-textfield"
              value={employeeDetail.employeeId}
              disabled={true}
            />
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

          <Box>
            <InputLabel>Age</InputLabel>
            <TextField disabled={true} value={employeeDetail.age} className="verysmall-textfield"/>
          </Box>
        </div>
        <div style={{ display: "flex" }}>
          <Box>
            <InputLabel>Code</InputLabel>
            <TextField disabled defaultValue={"+61"} className="verysmall-textfield" />
          </Box>

          <Box>
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
        </div>
        <div style={{ display: "flex" }}>
          <Box>
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
          <Box>
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
        </div>
        <div style={{ display: "flex" }}>
          <Box>
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
        </div>
        {isSharedAccount && (
          <Box
            sx={{
              display: "flex",
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
        )}

        <Box>
          <Button
            variant="contained"
            style={{ margin: 5, padding: 5 }}
            disabled={action === "View"}
            onClick={handleSave}
          >
            {action === "View" ? "Save" : action === "Edit" ? "Update" : "Save"}
          </Button>
          <Button variant="contained"  onClick={handlecancel} style={{ margin: 5, padding: 5 }}>
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
