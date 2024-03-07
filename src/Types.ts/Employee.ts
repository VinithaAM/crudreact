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
    createdDateTime: Date;
    modifiedBy: number;
    modifiedDateTime: Date;
    deletedBy: number;
    deletedDateTime: Date;
  }