import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import MaskedInput from "react-text-mask";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, startTransition, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import "./styles.css";
import { IEmployeeDetails, emptyObject } from "../../Types.ts/Employee";
import { useLocation, useNavigate } from "react-router-dom";
import { getRandomNumber } from "../../Constants/RandomNumber";
import {
  createNewEmployee,
  updateEmployeeDetails,
} from "../../Services/EmployeeService";
import { ToastContainer, toast } from "react-toastify";
import PasswordChecklist from "react-password-checklist";
// import DatePicker from "react-date-picker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextMaskCustom from "../../Component/MobileMasking";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Search } from "@mui/icons-material";

const NewEmployee = (prop: IEmployeeDetails) => {
  const navigation = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [employeeDetail, setEmplyeeDetails] =
    useState<IEmployeeDetails>(emptyObject);
  const [dob, setDob] = useState(null);
  const [genderValue, setGenderValue] = useState("");
  const [userStatus, setUserStatus] = useState(true);
  const [enableTwofactor, setEnableTwofactor] = useState(false);
  const [isSharedAccount, setIsSharedAccount] = useState(false);
  const [action, setAction] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  useEffect(() => {
    if (state?.options !== null && state?.options != undefined) {
      setEmplyeeDetails(state.options.param);
      setAction(state.options.action);
      setGenderValue(state.options.param.gender);
      setUserStatus(state.options.param.userStatus);
      setConfirmPassword(state.options.param.password);
      if (state.options.param.accountType === "Shared") {
        setIsSharedAccount(true);
        setPasswordsMatch(true)
      }
      if (state.options.param.enableTwoFactor === true) {
        setEnableTwofactor(true);
      }
      if (state.options.param.dateOfBirth !== undefined) {
        console.log(state.options.param.dateOfBirth);
        setDob(state.options.param.dateOfBirth);
      }
      if (
        state.options.param.phoneNumber !== undefined &&
        state.options.param.phoneNumber !== null
      ) {
        let phoneNumberParts = state.options.param.phoneNumber.split("+61");
        setEmplyeeDetails({
          ...state.options.param,
          phoneNumber: phoneNumberParts[1],
        });
      }
      if (
        state.options.param.email !== undefined &&
        state.options.param.email !== null
      ) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(state.options.param.email);
        setIsValid(isValidEmail);
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
          var birthDate = value.$d;
          var age_now = today.getFullYear() - birthDate.getFullYear();
          p.age = age_now;
          p.dateOfBirth = value.$d;
        }
        if (field === "userStatus") {
          setUserStatus(!userStatus);
        }
        if (field === "enableTwoFactor") {
          setEnableTwofactor(value);
        }
        if (field === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(value);
          setIsValid(isValidEmail);
        }
        if(field ==="firstName"){
          const nameRegex=/[^a-zA-Z\s\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
          const i = nameRegex.test(value);
          console.log("email",i)
        }
        if (field === "password") {
          setPasswordsMatch(value === confirmPassword);
        }
        console.log("to", employeeDetail);
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
  const handlecancel = () => {
    startTransition(() => {
      navigation("/employeedetails");
    });
  };
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue(event.target.value);
    handleEditEmployee("gender", event.target.value, employeeDetail.id);
  };
  const handleChangeAccountType = (event: any) => {
    if (event.target.value === "Shared") {
      setIsSharedAccount(true);
    } else {
      setIsSharedAccount(false);
    }
    handleEditEmployee("accountType", event.target.value, employeeDetail.id);
  };
  const validateField = () => {
    let message = "Empty field in form ";
    let passMessage="";
    let emailvalidationMessage="";
    let error = false;
    if (employeeDetail.firstName === "") {
      message += " FirstName,";
      error = true;
    } 
    if (employeeDetail.lastName === "") {
      message += "  Lastname,";
      error = true;
    } 
    if (employeeDetail.gender === "") {
      message += " Gender,";
      error = true;
    } 
    if (employeeDetail.phoneNumber === "") {
      message += "  PhoneNumber,";
      error = true;
    }
    if (employeeDetail.email === "") {
      message += "  E-mail ,";
      error = true;
    } 
    if (employeeDetail.accountType === "") {
      message += "  AccountType ";
      error = true;
    } 
    if(!isValid){
      error = true;
      emailvalidationMessage="E-mail Address not valid format"
    }
    if (employeeDetail.accountType.toLocaleLowerCase() === "shared") {
      if (!isValidPassword) {
        error = true;
        passMessage = "Password Not Valid!!!";
      }
      if (!passwordsMatch) {
        error = true;
        passMessage = "Confirm Password Not match with Password  ";
      } 
    }
    if (error ) {
       if(passMessage !== '' || message !=="" || emailvalidationMessage){
        // message = message.slice(0, -2);
       
        let errorMessage=message+" " + passMessage+" " + emailvalidationMessage
      
        toast.error(errorMessage,{
          position:"top-right"
        })
      }
      else  if(passMessage !==""){
        toast.error(passMessage, {
          position: "top-right",
        });
      }
      else  if(emailvalidationMessage !==""){
        toast.error(emailvalidationMessage, {
          position: "top-right",
        });
      }
      else{
        message = message.slice(0, -2);
        toast.error(message ,{
          position:"top-right"
        })
      }
      
     
      return error;
    } 
  };
  const newData = {
    ...employeeDetail,
    phoneNumber: `+61 ${employeeDetail.phoneNumber}`,
    createdBy: 1,
    createdDateTime: new Date(),
  };
  const updateData = {
    ...employeeDetail,
    phoneNumber: `+61 ${employeeDetail.phoneNumber}`,
    modifiedBy: 1,
    modifiedDateTime: new Date(),
  };
  const handleSave = async () => {
    if (action === "Edit") {
      try {
        if (
          // employeeDetail.firstName !== "" &&
          // employeeDetail.lastName !== "" &&
          // employeeDetail.phoneNumber !== "" &&
          // employeeDetail.email !== "" &&
          // employeeDetail.accountType !== ""
          (validateField() !== true)
        ) {
          setEmplyeeDetails({
            ...employeeDetail,
            modifiedBy: 1,
            modifiedDateTime: new Date(),
            phoneNumber: "+61 " + (employeeDetail.phoneNumber ?? ""),
          });
          console.log(employeeDetail);
          updateEmployeeDetails(updateData)
            .then((result) => {
              if (result.data.status === "Success") {
                toast(result.data.message);
                navigation("/employeedetails");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          //validateField();
          // toast.warning("Please fill the mandatory field",
          // {
          //   position: "top-center"
          // })
        }
      } catch (error) {
        console.log(error);
        navigation("/");
      }
    } else {
      try {
        if (
          // employeeDetail.firstName !== "" &&
          // employeeDetail.lastName !== "" &&
          // employeeDetail.phoneNumber !== "" &&
          // employeeDetail.email !== "" &&
          // employeeDetail.accountType !== "" &&
          // isValidPassword === true &&
          // passwordsMatch
          (validateField() !== true)
        ) {
          setEmplyeeDetails({
            ...employeeDetail,
            createdBy: 1,
            createdDateTime: new Date(),
            phoneNumber: "+61 " + (employeeDetail.phoneNumber ?? ""),
          });
          console.log(newData);
          await createNewEmployee(newData)
            .then((result) => {
              if (result.data.status === "Success") {
                toast(result.data.message);
                navigation("/employeedetails");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
         // validateField();
          // toast.warning("Please fill the mandatory field",
          // {
          //   position: "top-center"
          // })
        }
      } catch (error) {
        console.log(error);
        navigation("/");
      }
    }
  };

  function handleConfirmPassword(event: any) {
    setConfirmPassword(event);
    setPasswordsMatch(employeeDetail.password === event);
  }
  const handlepasswordrule = (isvalid: boolean, passwordrule: string[]) => {
    console.log("rule", isvalid, passwordrule);
    setIsValidPassword(isvalid);
  };
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url(${"../assets/download.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "80%",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography style={{ alignContent: "center", fontWeight: 900 }}>
                {action === "View"
                  ? "View Employee Detail"
                  : action === "Edit"
                  ? "Update Employee Detail"
                  : "Add New Employee Detail"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                First Name
              </InputLabel>

              <TextField
                type="text"
                size="small"
                required
                disabled={action === "View"}
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
              {employeeDetail.firstName === "" && (
                <span style={{ color: "red" }}>Firstname required!!!</span>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                Last Name
              </InputLabel>
              <TextField
                size="small"
                required
                disabled={action === "View"}
                type="text"
                inputProps={{ maxLength: 100 }}
                value={employeeDetail.lastName}
                onChange={(e) =>
                  handleEditEmployee(
                    "lastName",
                    e?.target?.value,
                    employeeDetail.id
                  )
                }
              />
              {}
              {employeeDetail.lastName === "" && (
                <span style={{ color: "red" }}>Lastname required!!!</span>
              )}
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                Employee Id
              </InputLabel>
              <TextField
                size="small"
                type="text"
                value={employeeDetail.employeeId}
                disabled={true}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                Gender
              </InputLabel>
              <Box sx={{ flexBasis: "row" }}>
                <Radio
                  disabled={action === "View"}
                  checked={genderValue === "Male"}
                  onChange={handleChangeGender}
                  value="Male"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Male" }}
                />
                <label htmlFor="Male">Male</label>
                <Radio
                  disabled={action === "View"}
                  checked={genderValue === "Female"}
                  onChange={handleChangeGender}
                  value="Female"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Female" }}
                />
                <label htmlFor="Female">Female</label>
                <Radio
                  disabled={action === "View"}
                  checked={genderValue === "Others"}
                  onChange={handleChangeGender}
                  value="Others"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Others" }}
                />
                <label htmlFor="Others">Others</label>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                DOB
              </InputLabel>
              {/* <DatePicker
            disabled={action==="View"}
              onChange={(e) =>
                handleEditEmployee("dateOfBirth", e, employeeDetail.id)
              }
              value={dob}
              calendarClassName="customCalendar"
              dayPlaceholder="dd"
              monthPlaceholder="MM"
              yearPlaceholder="yyyy"
              maxDate={new Date()}
              clearIcon={false}
            /> */}

              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={["DatePicker"]} sx={{paddingTop: 0,}}>
                  <DatePicker
                  className="custom-datepicker"
                    slotProps={{ textField: { size: "small" } }}
                    disabled={action === "View"}
                    value={dayjs(dob)}
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
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                Age
              </InputLabel>
              <TextField
                size="small"
                disabled={true}
                value={employeeDetail.age}
              />
            </Box>
          </Grid>
          {/* <Grid item xs={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                Code
              </InputLabel>
              <TextField  size="small"
                disabled
                defaultValue={"+61"}
                className="verysmall-textfield"
              />
            </Box>
          </Grid> */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                Phone Number
              </InputLabel>

              <TextField
                size="small"
                disabled={action === "View"}
                value={employeeDetail.phoneNumber}
                onChange={(event) =>
                  handleEditEmployee(
                    "phoneNumber",
                    event.target.value,
                    employeeDetail.id
                  )
                }
                InputProps={{
                  inputComponent: TextMaskCustom as any,
                  startAdornment: (
                    <InputAdornment position="start">+61</InputAdornment>
                  ),
                }}
              />
              {employeeDetail.phoneNumber === "" && (
                <span style={{ color: "red", fontSize: 12 }}>
                  PhoneNumber required!!!
                </span>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                E-mail
              </InputLabel>
              <TextField
                size="small"
                disabled={action === "View"}
                value={employeeDetail.email}
                onChange={(e) =>
                  handleEditEmployee(
                    "email",
                    e?.target?.value,
                    employeeDetail.id
                  )
                }
                inputProps={{ maxLength: 80 }}
              />
              <div style={{ flexDirection: "row" }}>
                {employeeDetail.email === "" && (
                  <span style={{ color: "red", fontSize: 12 }}>
                    E-mail required!!!{" "}
                  </span>
                )}
                {!isValid && (
                  <span style={{ color: "red", fontSize: 12 }}>
                    Invalid email address
                  </span>
                )}
              </div>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                Account Type
              </InputLabel>
              <Box>
                <Select
                  size="small"
                  disabled={action === "View"}
                  
                  //className="small-textfield"
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                   
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
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <InputLabel style={{ color: "black", fontWeight: 500 }}>
                User Status
              </InputLabel>
              <Switch
              disabled={action === "View"}
                checked={userStatus}
                onChange={(e) =>
                  handleEditEmployee(
                    "userStatus",
                    !userStatus,
                    employeeDetail.id
                  )
                }
                inputProps={{ "aria-label": "controlled" }}
              />
              {/* <IconButton
                disabled={action === "View"}
                onClick={(e) =>
                  handleEditEmployee(
                    "userStatus",
                    !userStatus,
                    employeeDetail.id
                  )
                }
                //onChange={(e)=>handleEditEmployee("userStatus",(!userStatus),employeeDetail.id)}
              >
                {userStatus ? (
                  <ToggleOnOutlinedIcon
                    style={{ color: "green", fontSize: 50 }}
                  />
                ) : (
                  <ToggleOffOutlinedIcon
                    style={{ color: "red", fontSize: 50 }}
                  />
                )}
                <Typography variant="body1" style={{ marginLeft: 8 }}>
                  {userStatus ? "Enabled" : "Disabled"}
                </Typography>
              </IconButton> */}
            </Box>
          </Grid>

          {isSharedAccount && (
            <Grid item xs={12} style={{ display: "flex" }}>
              <Grid item xs={4}>
                {/* <Box sx={{display:"flex", flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,}}
              > */}
                <InputLabel style={{ color: "black", fontWeight: 500 }}>
                  Password
                </InputLabel>
                <TextField
                  size="small"
                  disabled={action === "View"}
                  type={showPassword ? "text" : "password"}
                  value={employeeDetail.password}
                  onChange={(e) =>
                    handleEditEmployee(
                      "password",
                      e.target.value,
                      employeeDetail.id
                    )
                  }
                  inputProps={{ maxLength: 25 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon style={{ fontSize: 12 }} />
                        ) : (
                          <VisibilityOffIcon style={{ fontSize: 12 }} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <PasswordChecklist
                  rules={["minLength", "specialChar", "number", "capital"]}
                  minLength={8}
                  value={employeeDetail.password}
                  maxLength={20}
                  onChange={(isValid: boolean, failedRules: string[]) => {
                    handlepasswordrule(isValid, failedRules);
                  }}
                />
                {/* </Box> */}
              </Grid>
              {/* <Box sx={{display:"flex", flexDirection: "column",
                justifyContent: "space-evenly",
                margin: 1,}}> */}
              <Grid item xs={4}>
                <InputLabel
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    color: "black",
                    fontWeight: 500,
                  }}
                >
                  Confirm Password
                </InputLabel>
                <TextField
                  size="small"
                  disabled={action === "View"}
                  value={confirmPassword}
                  type={showConPassword ? "text" : "password"}
                  onChange={(e) => handleConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowConPassword(!showConPassword)}
                        edge="end"
                      >
                        {showConPassword ? (
                          <VisibilityIcon style={{ fontSize: 12 }} />
                        ) : (
                          <VisibilityOffIcon style={{ fontSize: 12 }} />
                        )}
                      </IconButton>
                    ),
                  }}
                  inputProps={{ maxLength: 25 }}
                />
                <div>
                {!passwordsMatch && (
                  <span style={{ color: "red" }}>Password not Match!!</span>
                )}
                </div>
              </Grid>
              {/* </Box> */}
              <Grid item xs={4}>
                {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    // margin: 1,
                  }}
                > */}
                <InputLabel
                  style={{
                    display: "flex",
                    color: "black",
                    fontWeight: 500,
                  }}
                >
                  Enable TwoFactor Authendication
                </InputLabel>
                <Switch
                disabled={action === "View"}
                checked={enableTwofactor}
                onChange={(e) =>
                  handleEditEmployee(
                    "enableTwoFactor",
                    !enableTwofactor,
                    employeeDetail.id
                  )
                }
                inputProps={{ "aria-label": "controlled" }}
              />
                {/* <Checkbox
                  disabled={action === "View"}
                  checked={enableTwofactor}
                  onChange={(e) =>
                    handleEditEmployee(
                      "enableTwoFactor",
                      e.target.checked,
                      employeeDetail.id
                    )
                  }
                /> */}

                {/* </Box> */}
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                style={{
                  margin: 5,
                  padding: 5,
                  textTransform: "capitalize",
                  backgroundColor: "green",
                }}
                disabled={action === "View"}
                onClick={handleSave}
              >
                {action === "View"
                  ? "Save"
                  : action === "Edit"
                  ? "Update"
                  : "Save"}
              </Button>
              <Button
                variant="contained"
                onClick={handlecancel}
                style={{
                  margin: 5,
                  padding: 5,
                  textTransform: "capitalize",
                  backgroundColor: "gray",
                }}
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
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
