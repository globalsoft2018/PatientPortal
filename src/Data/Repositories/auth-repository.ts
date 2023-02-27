import loginResponse from "../Models/Lookup/login_respone";
//@ts-ignore
import http from "../Data_Sources/base_api.ts";

export default  class AuthRepository{
  static controller="/Auth/";
   static  async  login  (userName: string,password:string) {
  return await http.post<loginResponse>(`${this.controller}LogIn`,{'Email': userName, 
    'Password': password}); 
};

   static  async  phoneConfirmation  (phone: string) {
  return await http.get(`${this.controller}PhoneConfirmation?phone=${phone}`,); 
};

   static  async  CheckConfirmationCode  (code: string,id:number) {
  return await http.get(`${this.controller}CheckConfirmationCode?PhoneConfirmationId=${id}&Code=${code}`,); 
}

   static  async  signUp  (user: any) {
  return await http.post<loginResponse>(`${this.controller}Signup`,user); 
}


};

