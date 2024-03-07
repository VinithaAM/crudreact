
import './App.css';
import { Box, Container, Typography } from '@mui/material';
import Header from './Layout/Header';
import EmployeeDetails from './Pages/EmployeeDetails/EmployeeDetails';
import NewEmployee from './Pages/EmployeeDetails/NewEmployee';

function App() {
  return (
    <>
    <Header />
    {/* <EmployeeDetails /> */}
    <NewEmployee />
    {/* <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Material UI Create React App example in TypeScript
      </Typography>
    </Box>
 
  </Container> */}
  </>
  );
}

export default App;
