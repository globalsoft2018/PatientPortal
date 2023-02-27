import React, {useEffect, useState} from 'react';
import '../assets/_common.scss';
import DoctorRepository from "../Data/Repositories/doctor_repository";
import VisitCard from "../components/VisitCard/visit_card";

import {t} from "i18next";

const PatientVisits = () => {
    const [visits, setVisitsList] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect (()=>{

        const getSpecialities=  async function  ReadData(){
            debugger;


            const visitsList = await DoctorRepository.getPatientVisits();
            debugger;
            setVisitsList(visitsList);
            setLoading(false);





        };

        getSpecialities().catch(console.error);



    },[]);



    return (
        <div className="container">
            <div className="row mt-5">

           
<table className="table table-striped table-bordered">
                <thead >
                    <tr>
                    <th scope="col">Date</th>
                    <th scope="col">{t('Visit Number')}</th>
                    <th scope="col">{t('Patient Name')}</th>
                    <th scope="col">{t('Company')}</th>
                    <th scope="col">{t('Doctor-Name')}</th>
                    <th scope="col">{t('Show Visits Details')}</th>
                    </tr>
                </thead>
                <tbody>
 
        {
            visits.map(obj =>(
                <VisitCard VisitObj={obj} />
            ))


        }
        
     
    
        </tbody>
                </table>
                </div>
</div>

    );
};

export default PatientVisits;