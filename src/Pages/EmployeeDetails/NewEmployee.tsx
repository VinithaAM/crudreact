import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MaskedInput from 'react-text-mask';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
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
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextMaskCustom from "../../Component/MobileMasking";

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
      }
      if (state.options.param.enableTwoFactor === true) {
        setEnableTwofactor(true);
      }
      if (state.options.param.dateOfBirth !== undefined) {
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
          var birthDate = value;
          var age_now = today.getFullYear() - birthDate.getFullYear();
          p.age = age_now;
          p.dateOfBirth = value;
          console.log("date", value);
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
        if (field === "password") {
          setPasswordsMatch(value === confirmPassword);
        }
      
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
    let message = "Please fill ";
    if (employeeDetail.firstName === "") {
      message += " FirstName";
    }
    if (employeeDetail.lastName === "") {
      message += "  Lastname";
    }
    if (employeeDetail.gender === "") {
      message += " Gender";
    }
    if (employeeDetail.phoneNumber === "") {
      message += "  PhoneNumber";
    }
    if (employeeDetail.email === "") {
      message += "  E-mail";
    }
    if (employeeDetail.accountType === "shared") {
      if (isValidPassword === false) {
        message += "  ValidPassword";
      }
      if (passwordsMatch === false) {
        message = "Password Not match with Password  ";
      }
    }

    toast.warning(message + " these fields are Mandatoty", {
      position: "top-center",
    });
  };
  const newData = {...employeeDetail, phoneNumber: `+61 ${employeeDetail.phoneNumber}`,createdBy:1,createdDateTime:new Date()}
  const updateData = {...employeeDetail, phoneNumber: `+61 ${employeeDetail.phoneNumber}`,modifiedBy:1,modifiedDateTime:new Date()}
  const handleSave = async () => {
    if (action === "Edit") {
      try {
        if (
          employeeDetail.firstName !== "" &&
          employeeDetail.lastName !== "" &&
          employeeDetail.phoneNumber !== "" &&
          employeeDetail.email !== "" &&
          employeeDetail.accountType !== "" 
         
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
          validateField();
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
          employeeDetail.firstName !== "" &&
          employeeDetail.lastName !== "" &&
          employeeDetail.phoneNumber !== "" &&
          employeeDetail.email !== "" &&
          employeeDetail.accountType !== "" &&
          isValidPassword === true &&
          passwordsMatch
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
          validateField();
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
  return (
    <Container>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth:"80%",
          justifyContent:"center"
        }}
      >
        <Box>
          <Typography
          className="custom-Typography"
            // className="custom-Typography"
          >
            {action === "View"
              ? "View Employee Detail"
              : action === "Edit"
              ? "Update Employee Detail"
              : "Add New Employee Detail"}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: 1,
              }}
            >
              <InputLabel>FirstName</InputLabel>

              <TextField
                type="text"
                required
                disabled={action==="View"}
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
              <InputLabel>Last Name</InputLabel>
              <TextField
                required
                disabled={action==="View"}
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
            <InputLabel>EmployeeId</InputLabel>
            <TextField
              type="text"
              className="small-textfield"
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
            <InputLabel>Gender</InputLabel>
            <Box sx={{ flexBasis: "row" }}>
              <Radio
              disabled={action==="View"}
                checked={genderValue === "Male"}
                onChange={handleChangeGender}
                value="Male"
                name="radio-buttons"
                inputProps={{ "aria-label": "Male" }}
              />
              <label htmlFor="Male">Male</label>
              <Radio
              disabled={action==="View"}
                checked={genderValue === "Female"}
                onChange={handleChangeGender}
                value="Female"
                name="radio-buttons"
                inputProps={{ "aria-label": "Female" }}
              />
              <label htmlFor="Female">Female</label>
              <Radio
              disabled={action==="View"}
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
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin: 1,
            }}
          >
            <InputLabel>DateOfBirth</InputLabel>
            <DatePicker
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
            />
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
            <InputLabel>Age</InputLabel>
            <TextField
              disabled={true}
              value={employeeDetail.age}
              className="verysmall-textfield"
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin: 1,
            }}
          >
            <InputLabel>Code</InputLabel>
            <TextField
              disabled
              defaultValue={"+61"}
              className="verysmall-textfield"
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin: 1,
            }}
          >
            <InputLabel>PhoneNumber</InputLabel>

            <TextField
            disabled={action==="View"}
              value={employeeDetail.phoneNumber}
              className="small-textfield"
              onChange={(event) =>
                handleEditEmployee(
                  "phoneNumber",
                  event.target.value,
                  employeeDetail.id
                )
              }
              InputProps={{
                inputComponent: TextMaskCustom as any,
              }}
            />
            {employeeDetail.phoneNumber === "" && (
              <span style={{ color: "red", fontSize: 12 }}>
                PhoneNumber required!!!
              </span>
            )}
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
            <InputLabel>Email</InputLabel>
            <TextField
            disabled={action==="View"}
              className="small-textfield"
              value={employeeDetail.email}
              onChange={(e) =>
                handleEditEmployee("email", e?.target?.value, employeeDetail.id)
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
          <InputLabel>UserStatus</InputLabel>
          <IconButton disabled={action==="View"}
            onClick={(e) =>
              handleEditEmployee("userStatus", !userStatus, employeeDetail.id)
            }
            //onChange={(e)=>handleEditEmployee("userStatus",(!userStatus),employeeDetail.id)}
          >
            {userStatus ? (
              <ToggleOnOutlinedIcon style={{ color: "green", fontSize: 50 }} />
            ) : (
              <ToggleOffOutlinedIcon style={{ color: "red", fontSize: 50 }} />
            )}
            <Typography variant="body1" style={{ marginLeft: 8 }}>
              {userStatus ? "Enabled" : "Disabled"}
            </Typography>
          </IconButton>
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
          <InputLabel>AccountType</InputLabel>
          <Box>
            <Select disabled={action==="View"}
              className="small-textfield"
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
        </Grid>
        <Grid item xs={6}>
                  {isSharedAccount && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputLabel>Password</InputLabel>
            <TextField disabled={action==="View"}
              className="small-textfield"
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

            <InputLabel>ConfirmPassword</InputLabel>
            <TextField disabled={action==="View"}
              value={confirmPassword}
              type={showConPassword ? "text" : "password"}
              className="small-textfield"
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
            {!passwordsMatch && (
              <span style={{ color: "red" }}>Password not Match!!</span>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                margin: 1,
              }}
            >
              <Checkbox disabled={action==="View"}
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
        </Grid>
                <Grid item xs={6}>

        <Box>
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
            {action === "View" ? "Save" : action === "Edit" ? "Update" : "Save"}
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
