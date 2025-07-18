export class User{

  emailId: string;
  password: string;

  constructor(){
    this.emailId = '';
    this.password = '';
  }
}

export interface IUserModel{

  userId: number;
  emailId: string;
  password: string;
  createdDate: string;
  projectName: string;
  fullName: string;
  mobileNo: string;
  extraId: number;
}

export interface ResponseModel{
  message:string;
  result:boolean;
  data:any;
}
export interface ISite {
      siteId: number;
      clientId: number;
      siteName: string;
      siteCity: string;
      siteAddress: string;
      sitePinCode: string;
      totalBuildings: number;
      createdDate: string;
    }