import { Avatar, Box, Button, Container, CssBaseline, Grid, IconButton, Link, TextField, ThemeProvider, Typography } from '@mui/material'
import theme from '../../theme';
import { ToastContainer, toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // const navigate = useNavigate();
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [showPassword,setShowPassword]=useState(false)

    const handleSignIn =()=>{
        if(userName ==="AdminIntergy@gmail.com" && password ==='Admin@123'){
            
        }
        else{
            toast("Please provide valid Login details")
        }
    }
    const onHandleUserName=(event:any)=>{
        setUserName(event.target.value)
    }
    const onHandlePassword=(event:any)=>{
        setPassword(event.target.value)
    }
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputProps={{ maxLength: 30 }}
            value={userName}
            onChange={onHandleUserName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            inputProps={{ maxLength: 20 }}
            InputProps={{
                endAdornment:  <IconButton onClick={()=>setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>,
              }}
            onChange={onHandlePassword} />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
           onClick={handleSignIn}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer
     className="toast-container"
     toastClassName="custom-toast"
     bodyClassName="custom-toast-body"
     progressClassName="custom-toast-progress" />
    </Container>
     
       </ThemeProvider>
  )
}

export default LoginPage
