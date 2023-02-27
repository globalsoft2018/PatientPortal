import React, {useEffect, useState} from 'react';
import '../assets/_common.scss';
import DoctorRepository from "../Data/Repositories/doctor_repository";
import {t} from "i18next";
import {useLocation} from "react-router-dom";
import DateTimeHelper from "../Core/DateTime/date_time_helper";



const Notifications_Screen = () => {
    const [results, setResultsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (()=>{

        const getNotifications=  async function  getNotifications(){

            debugger;
            const resultsList = await DoctorRepository.getUserNotifications();
            setResultsList(resultsList);
            setLoading(false);
        };
        getNotifications().catch(console.error);



    },[]);

    return ( <div className='row px-5 py-5 '>{
            results.map(obj =>(
                <div  className='col-lg-12 col-md-12 py-2 px-2 my-2'>
                    <div className='visit-card py-2 px-2 alert alert-warning'>
                        <div className=' py-2 px-1'>


                            <div className='row' >
                                <h6 className='text-capitalize col-8  fw-normal' >{obj.TitleEn} </h6>
                            </div>

                            <div className='row' >
                                <h6 className='text-capitalize col-8  fw-normal' >{obj.DescEn} </h6>
                            </div>



                        </div>

                    </div>

                </div>
            ))


        }</div>)



    ;
};

export default Notifications_Screen;