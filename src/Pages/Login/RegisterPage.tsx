import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material/";
import React, { useContext } from "react";

//CONTEXT

const Registration=()  => {
  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 18);
  return (
    <Stack spacing={1}>
      <Box display={"flex"}alignItems={"center"} justifyContent={"center"}>
        <Typography>Register Here</Typography>
      </Box>  
    <Grid  container spacing={1} >
    <Grid item xs={6}>
        <TextField
          placeholder='Type your name here'
          name='name'
          label='Name'
         // value={user.username}
          // variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          required
          inputProps={{
            minLength: 3,
            maxLength: 20
          }}
         // error={!!errors["username"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          placeholder='Type your username here'
          name='username'
          label='Username'
         // value={user.username}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          required
          inputProps={{
            minLength: 3,
            maxLength: 20
          }}
         // error={!!errors["username"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          placeholder='Type your email here'
          name='email'
          label='Email'
          //value={user.email}
          type='email'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          //error={!!errors["email"]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type='date'
          name='birthdate'
          id='birthdate'
          label='Birthdate'
          //defaultValue={user.birthdate}
          helperText='You need to be at least 18 years old'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: "1920-01-01",
            max: dateLimit.toISOString().slice(0, 10)
          }}
          //error={"birthdate"}
          required
          //fullWidth={isWidthDown("sm")}
        />
      </Grid>

      <Grid item xs={6} >
        <TextField
          placeholder='Type your password here'
          name='password'
          label='Password'
          //value={user.password}
          type='password'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          required
          //error={!!errors["password"]}
          inputProps={{
            minLength: 6,
            maxLength: 20
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6} >
        <TextField
          placeholder='Re-type your password here'
          label='Password'
          name='confirmPassword'
         // value={user.confirmPassword}
          type='password'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          //error={!!errors["confirmPassword"]}
          inputProps={{
            minLength: 6,
            maxLength: 20
          }}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} >
        <Box display={"flex"} justifyContent={"center"} >
        <Button variant="contained" color="success" style={{
                  margin: 5,
                  padding: 5,
                  textTransform: "capitalize",
                 
                }} >
         Save
        </Button>
        <Button variant="contained" color="warning" style={{
                  margin: 5,
                  padding: 5,
                  textTransform: "capitalize",
                 
                }}>
         Clear
        </Button>
        </Box>
        
      </Grid>
    </Grid>
    </Stack>
  );
};
export default Registration