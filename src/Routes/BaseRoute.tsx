import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PATH } from '../Constants/Path';



const Login = lazy(()=>import ('../Pages/Login/LoginPage'));
const Register = lazy(()=>import ('../Pages/Login/RegisterPage'));
const EmployeeDetails = lazy(()=>import ('../Pages/EmployeeDetails/EmployeeDetails'));
const NewEmployeeDetail = lazy(()=>import ('../Pages/EmployeeDetails/NewEmployee'));

const BaseRoute = () => {
  return (
    <BrowserRouter>
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <Routes>
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.EMPLOYEE_DETAILS} element={<EmployeeDetails />} />
          <Route path={PATH.EMPLOYEE_DETAILS_NEW} element={<NewEmployeeDetail />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default BaseRoute
