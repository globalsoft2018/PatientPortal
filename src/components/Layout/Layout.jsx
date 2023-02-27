import React from "react"
import Home from '../../Pages/home.jsx';
import Login_screen from '../../Pages/Auth/login_screen';
import Phone_confirmation from '../../Pages/Auth/CreateAccount/phone_confirmation';
import Confirmation_code from '../../Pages/Auth/CreateAccount/confirmation_code';
import Create_account from '../../Pages/Auth/CreateAccount/create_account';
import {App_Router} from "../../Core/Router/app_router";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Doctor_profile from "../../Pages/doctor_profile";
import PatientVisits from "../../Pages/visits_screen";
import VisitScreen from "../../Pages/visit_screen";
import PatientResults from "../../Pages/results_screen";
import SearchScreen from "../../Pages/search_screen";
import Notifications_Screen from "../../Pages/notifications_screen";
import FutureAppointments from "../../Pages/future_appointment";

class Layout extends React.Component {
  render(){
    return (
      <>



        <main>

        <Router>

        <Routes>
            <Route path='/' element={<App_Router children={<Home/>} needAuth={true} />} />
            <Route path='/home' element={<App_Router children={<Home/>} needAuth={true} />} />
            <Route path='/patientVisits' element={<App_Router children={<PatientVisits/>} needAuth={true} />} />
            <Route path='/search' element={<App_Router children={<SearchScreen/>} needAuth={true} />} />
            <Route path='/visitScreen' element={<App_Router children={<VisitScreen/>} needAuth={true} />} />
            <Route path='/resultScreen' element={<App_Router children={<PatientResults/>} needAuth={true} />} />
            <Route path='/doctorProfile' element={<App_Router children={<Doctor_profile/>} needAuth={true} />} />
            <Route path='/notificationsScreen' element={<App_Router children={<Notifications_Screen/>} needAuth={true} />} />
            <Route path='/futureAppointment' element={<App_Router children={<FutureAppointments/>} needAuth={true} />} />
            <Route path='/login' index={true} element={<App_Router children={<Login_screen/>} />} />
            <Route path='/phoneConfirmation' element={<App_Router children={<Phone_confirmation/>} />} />
            <Route path='/confirmationCode' element={< App_Router children={<Confirmation_code/>}  />}/>
            <Route path='/createAccount' element={< App_Router children={<Create_account/>} />} />
            <Route path='*' element={<div>Not Found</div> } />
          </Routes>
        </Router>
          </main>





      </>
    )
  }
}
export default Layout;