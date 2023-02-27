import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../../Images/global1.png';
import user from '../../../Images/user.jpg';
import './Header.css';

import {changeLanguage, t} from "i18next";

const Header = () => {
  const navigate =useNavigate();
  const  Logout=()=>{
    debugger;
    localStorage.removeItem('token');
    navigate('/login');

  }

  const  changeLang=()=>{
      if(localStorage.getItem("lang")!=null&&localStorage.getItem("lang")=="en") {
          changeLanguage("ar").then(r => {
              localStorage.setItem("lang", "ar");
          });
      }else{
          changeLanguage("en").then(r => {
              localStorage.setItem("lang", "en");
          });


      }


  }
    const  gotoNotifications=()=>{

        navigate('/notificationsScreen');

    }
    const  gotoSearch=()=>{

        navigate('/search');

    }

    const  gotoPatientVisits=()=>{

        navigate('/patientVisits');

    }
    const gotoAppointments=()=>{

        navigate('/futureAppointment');

    }

return (
<header>
  
<nav class="navbar navbar-expand-lg nav-transparent">
<div className="container">

<a className="navbar-brand" href="#">
            <img src={logo} className="navbar-brand logo" href="#" />
          </a>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={ gotoPatientVisits}>Visits</a>
        </li>
          <li className="nav-item">
              <a className="nav-link" onClick={ gotoAppointments}>Appointments</a>
          </li>
      </ul>

      <div onClick={gotoSearch} class="search">
            <i class="fa fa-search"></i>
            <input type="text" class="form-control Search-box me-2 disabled" placeholder="Search" />
          </div>


      


      <button onClick={gotoNotifications} type="button" class="position-relative">
            <i class="fa-regular fa-bell"></i>
            <span class="position-absolute top-0 start-90 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span class="visually-hidden">New alerts</span>
            </span>
          </button>

          <ul>
              <li className="nav-item dropdown">
                  <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"
                     aria-expanded="false">
                      <img src={user}  className="user-img" />

                  </a>
                  <ul className="dropdown-menu">
                      <li><a className="dropdown-item" onClick={changeLang}>{t('Translate')}</a></li>
                      <li><a className="dropdown-item"  onClick={ Logout }>{t('Logout')}</a></li>
                  </ul>
              </li>





        </ul>
    </div>
    </div>
  </nav>
</header>


);
};

/*

*/
export default Header;