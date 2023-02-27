//@ts-ignore
import http from "../Data_Sources/base_api.ts";
import loginResponse from "../Models/Lookup/login_respone";

export default  class DoctorRepository{
  static controller="/PatientApp/";

  static getAllDoctorForPatientApp = async (filter:any) => await http.post(`${this.controller}GetAllDoctorsForPatientApp`, filter);
  static async getDoctorClinicsByEmployeeId(employeeId:number ){

  return await http.get(`${this.controller}GetDoctorClinicsByEmployeeId?EmployeeId=${employeeId}`); 
}
  static async getDaysWorkByEmployeeIdAndClinicId (employeeId:number,clinicId:number){
      return await http.get(`${this.controller}GetDaysWorkByEmployeeIdAndClinicId?EmployeeId=${employeeId}&ClinicId=${clinicId}`);}
  static async getReservationTimeSlots ( employeeId:number, clinicId:number, dateTime:Date){
  return await http.get(`${this.controller}ReservationTimeSlot?DoctorId=${employeeId}&ClinicId=${clinicId}&SelectedClinicDoctorId=0&reservationDate=${dateTime.toDateString()}`);
  
}
  static async getClinicServices( clinicId:number){
  return await http.get(`${this.controller}GetClinicServices?ClinicId=${clinicId}`);}
  static async newAppointment(appointmentModel:any){
    debugger;
    return await http.post(`${this.controller}NewAppointment`,appointmentModel);}
  static async ratingDoctorVisit( visitId:number,  doctorId:number,  rate:number){
  debugger;
  var response=await http.post(`${this.controller}RatingDoctorVisit`,{
    "DoctorId":doctorId,
    "Rate":rate,
    "VisitId":visitId,
    "Review":""



  });
  return response;
}
  static async getResults( visitId:number, type:string){
  const response=await http.get(`${this.controller}Get${type}Results?VisitId=${visitId}`);
  return response;}
  static async getVisitRating(visitId:number){

  return  await http.get(`${this.controller}GetVisitRating?visitId=${visitId}`);
}
  static async  getAllSpecialityForApp(){

    const [response] = await Promise.all([http.get(`${this.controller}GetAllSpecialityForApp`)]);
    return response;
  }
  static async getPatientVisits(){

    const [response] = await Promise.all([http.get(`${this.controller}GetPatientVisits`)]);
    return response;
}

  static async getPatientAppointments(){

    const [response] = await Promise.all([http.post(`${this.controller}GetPatientAppointments`)]);
    return response;
  }

  static async getUserNotifications(){

    const [response] = await Promise.all([http.get(`${this.controller}GetUserNotifications`)]);
    return response;
  }

  static async getPatientAppByPatientId(patientId:number){

    const [response] = await Promise.all([http.get(`${this.controller}GetPatientAppByPatientId?PatientId=${patientId}`)]);
    return response;
  }
};
