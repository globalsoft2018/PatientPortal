import React, {useEffect, useState} from 'react';
import '../assets/_common.scss';
import DoctorRepository from "../Data/Repositories/doctor_repository";
import VisitCard from "../components/VisitCard/visit_card";
import DateTimeHelper from "../Core/DateTime/date_time_helper";
import {t} from "i18next";



const FutureAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect (()=>{

        const getSpecialities=  async function  ReadData(){
            debugger;


            const appointmentsList = await DoctorRepository.getPatientAppointments();
            debugger;
            setAppointments(appointmentsList);
            setLoading(false);





        };

        getSpecialities().catch(console.error);



    },[]);


    return (
        <div>

     
        <div className="container">
        <div className="row d-flex align-items-center justify-content-center  mt-5">
        <table className="table table-striped  table-bordered ">
        <thead >
                    <tr>
                    <th scope="col">Date</th>
                    <th scope="col">{t('Service Name')}</th>
                    <th scope="col">{t('Company')}</th>
                    <th scope="col"> {t('Doctor')}</th>
                    <th scope="col"> {t('Clinic')}</th>
                    </tr>
                </thead>
                
                <tbody>
             
             {
            appointments.map(obj =>(
                <tr>
                <th scope="row">{DateTimeHelper.dayNameDayNumberMonthNameString(DateTimeHelper.dateFromString(obj.AppointmentDate))}</th>
                <td>{obj.ServiceName}</td>
                <td>{obj.AppointmentDate}</td>
                <td>{obj.DoctorName}</td>
                <td>{obj.ClinicName}</td>
                </tr>
            ))
            

        }
     
    
                </tbody>
         </table>
        </div>
        </div>

    

</div>

    );
};

export default FutureAppointments;
