import axios from "axios";
import { BASE_APIURL } from "../Constants/config";
import { IEmployeeDetails } from "../Types.ts/Employee";

export const createNewEmployee = (saveDetails: IEmployeeDetails) => {
    return axios.post(`${BASE_APIURL}/User/Create`, saveDetails);
  };
  export const getUserDetails=()=>{
    return axios.get(`${BASE_APIURL}/User/GetUsers`)
  }
  export const getUserDetailsById=(id:number)=>{
    return axios.get(`${BASE_APIURL}/User/GetUserById?id=${id}`)
  }
  export const updateEmployeeDetails=(updateDetails:IEmployeeDetails)=>{
    return axios.put(`${BASE_APIURL}/User/Update`,updateDetails)
  }
  export const deleteEmployeeDetails=(id:number)=>{
    return axios.delete(`${BASE_APIURL}/User/Delete?id=${id}`)
  }