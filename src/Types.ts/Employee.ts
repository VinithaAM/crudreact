export interface IEmployeeDetails extends CommonFields {
    id: number;
    firstName: string;
    lastName: string;
    employeeId: string;
    dateOfBirth: Date;
    age: number;
    gender:string;
    phoneNumber:string;
    email:string;
    userStatus:boolean;
    accountType:string;
    password:string;
    enableTwoFactor:boolean;
    status:boolean;
  }
  export interface CommonFields {
    createdBy: number;
    createdDateTime: Date |undefined;
    modifiedBy: number;
    modifiedDateTime: Date |undefined;
    deletedBy: number;
    deletedDateTime: Date |undefined;
  }
  export const emptyObject:IEmployeeDetails={
    id: 0,
    firstName: "",
    lastName: "",
    employeeId: "",
    dateOfBirth: new Date(),
    age: 0,
    gender:"",
    phoneNumber:"",
    email:"",
    userStatus:true,
    accountType:"",
    password:"",
    enableTwoFactor:false,
    status:true,
    createdBy:0,
    createdDateTime:undefined,
    modifiedBy:0,
    modifiedDateTime:undefined,
    deletedBy:0,
    deletedDateTime:undefined
  }