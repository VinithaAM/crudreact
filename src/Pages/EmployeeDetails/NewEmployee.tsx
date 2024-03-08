import {
  Box,
  Button,
  Container,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
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

const NewEmployee = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [genderValue, setGenderValue] = useState("");
  const [userStatus, setUserStatus]=useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderValue(event.target.value);
    console.log(genderValue, event.target.value);
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
          mask="(#00) 000-0000"
          definitions={{
            "#": /[1-9]/,
          }}
          inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
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
        <Stack spacing={1}>
          <Box>
            <h3>Add New Employee Detail</h3>
          </Box>
          <div style={{ display: "flex" }}>
            <Box sx={{ marginRight: 2 }}>
              <InputLabel>FirstName</InputLabel>
              <TextField type="text" />
            </Box>
            <Box sx={{ marginRight: 2 }}>
              <InputLabel>LastName</InputLabel>
              <TextField type="text" />
            </Box>
          </div>
          <div style={{ display: "flex" }}>
            <Box>
              <InputLabel>EmployeeId</InputLabel>
              <TextField />
            </Box>
            <Box>
              <InputLabel>Gender</InputLabel>
              <Radio
                checked={genderValue === "Male"}
                onChange={handleChange}
                value="Male"
                name="radio-buttons"
                inputProps={{ "aria-label": "Male" }}
              />
              <label htmlFor="Male">Male</label>
              <Radio
                checked={genderValue === "Female"}
                onChange={handleChange}
                value="Female"
                name="radio-buttons"
                inputProps={{ "aria-label": "Female" }}
              />
              <label htmlFor="Female">Female</label>
              <Radio
                checked={genderValue === "Others"}
                onChange={handleChange}
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
              {/* <DateField /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={value}
                    label="Basic date picker"
                    onChange={(newValue) => setValue(newValue)}
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
                defaultValue={"4 _ _ _ _ _ _ _ _"}
                InputProps={{
                  inputComponent: TextMaskCustom as any,
                }}
              />
            </Box>
          </div>
          <div style={{ display: "flex" }}>
            <Box>
              <InputLabel>Email</InputLabel>
              <TextField />
            </Box>
            <Box>
              <InputLabel>UserStatus</InputLabel>
              <IconButton  
              onClick={() => setUserStatus(!userStatus)}>
      {userStatus ? <ToggleOnOutlinedIcon  style={{ color:  'green', fontSize: 50 }} /> : <ToggleOffOutlinedIcon  style={{ color:  'red', fontSize: 50 }}/>}
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
                  <MenuItem value={10}>Shared</MenuItem>
                  <MenuItem value={20}>Personal</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box>
              <InputLabel>Status</InputLabel>
              <TextField />
            </Box>
          </div>
          <Box>
            <InputLabel>Password</InputLabel>
            <TextField />
            <InputLabel>ConfirmPassword</InputLabel>
            <TextField />
          </Box>
          <Box>
            <Button variant="contained" style={{ margin: 5, padding: 5 }}>
              {" "}
              Save
            </Button>
            <Button variant="contained" style={{ margin: 5, padding: 5 }}>
              {" "}
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default NewEmployee;
