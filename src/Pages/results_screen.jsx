import React, {useEffect, useState} from 'react';
import '../assets/_common.scss';
import DoctorRepository from "../Data/Repositories/doctor_repository";
import {t} from "i18next";
import {useLocation} from "react-router-dom";
import DateTimeHelper from "../Core/DateTime/date_time_helper";



const PatientResults = () => {
    const [results, setResultsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [laborRadOrRx, setLabOrRadOrRx] = useState(1);

    const params = useLocation();


    useEffect (()=>{

        const getSpecialities=  async function  ReadData(){

            debugger;
            var type=params.state.Type=="lab"?1:params.state.Type=="rad"?2:3;

            setLabOrRadOrRx(type);


            debugger;
            const resultsList = await DoctorRepository.getResults(params.state.VisitId,params.state.Type);
            debugger;
            setResultsList(resultsList);
            setLoading(false);





        };

        getSpecialities().catch(console.error);



    },[]);


    const printResult=async (id)=>{
        debugger;
        var action="";
        if(laborRadOrRx==1){
           action=`Medical/LabWorkV2/PrintRegularDeliveredLabResult?LabOrderVisitServiceId=${id}`;


        }else if(laborRadOrRx==2){


            action=`Medical/RadiologyListManagementV2/PrintReport?VisitServiceId=${id}`;



        }
        else{

            action=`Admin/Rx/PrintReport?RxId=${id}`;



        }

        window.open(localStorage.getItem('mvc_url')+action);



    }


    return (

        ( <div className='row px-5 py-5 '>{
            results.map(obj =>(
                <div  className='col-lg-4 col-md-6 py-2 px-2 my-2'>
                    <div className='visit-card py-2 px-2'>
                        <div className=' py-2 px-1'>


                            <div className='row' >
                                <h6 className='col-4 text-muted'>{t('Service Name')}</h6>
                                <h6 className='text-capitalize col-8  fw-normal' >{obj.ServiceName} </h6>
                            </div>




                            <div className='row' >
                                <h6 className='col-4 text-muted'>{t('Doctor-Name')}</h6>
                                <h6 className='text-capitalize col-8 fw-normal' >{obj.DoneDoctorName} </h6>
                            </div>


                            <div className='row' >
                                <h6 className='col-4 text-muted'>{t('ResultDate')}</h6>
                                <h6 className='text-capitalize col-8 fw-normal' >{

                                    DateTimeHelper.dayNameDayNumberMonthNameString(DateTimeHelper.dateFromString(obj.ResultDate))
                                    } </h6>
                            </div>


                        </div>
                        <input onClick={(e)=>printResult(obj.Id)} type='button' className='col-12 btn btn-success' value={t('Print Result')}/>

                    </div>

                </div>
            ))


        }</div>)



    );
};

export default PatientResults;