import React, {useEffect, useState} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import DoctorCard from '../DoctorCard/doctor_card';
import DoctorRepository from "../../Data/Repositories/doctor_repository.ts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


import DoctorCardLoading from "../DoctorCard/doctor_card_loading";
import {t} from "i18next";
const DoctorSliders = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay:true,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const [BestDoctorsList, setBestDoctorsList] = useState([]);
    const [BestDoctorsLoading, setBestDoctorsLoading] = useState(true);
    const [availableNowDoctorsList, setAvailableNowDoctorsList] = useState([]);
    const [availableNowDoctorsLoading, setAvailableNowDoctorsLoading] = useState([]);


    useEffect (()=>{

        const getDoctors=  async function  ReadBestRated(){
            debugger;
            const filterBestDoctors = {
                BestRating: true,
                PageIndex: 0,
                PageSize:20,
                Name:"" };

            const BestDoctors = await DoctorRepository.getAllDoctorForPatientApp(filterBestDoctors);
            debugger;
            setBestDoctorsList(BestDoctors);
            console.log(BestDoctors);
            setBestDoctorsLoading(false);

            const filterAvailableNowDoctors = {
                ISAvailableNow: true,
                PageIndex: 0,
                PageSize:20,
                Name:"" };

            const AvailableNowDoctors = await DoctorRepository.getAllDoctorForPatientApp(filterAvailableNowDoctors);
            debugger;
            setAvailableNowDoctorsList(AvailableNowDoctors);
            setAvailableNowDoctorsLoading(false);


        };

        getDoctors().catch(console.error);



    },[]);



    return (
        <>

            <div className="clearfix px-5">
                <div className="section-title mt-4 float-start">
                    <h4>{t("Best Rated Doctors")}</h4>
                </div>




                <div className="section-title mt-4 float-end">
                    <h5>{t('More')}</h5>
                </div>


            </div>




            {BestDoctorsLoading?
            (<Slider className="px-5 pt-0" {...settings}>
                {
                    [1,2,34,4].map(doctor => (

                        <DoctorCardLoading />

                    ))
                }
            </Slider>):
            (<Slider className="px-5 pt-0" {...settings}>
                    {
                        BestDoctorsList.map(doctor => (
                            <DoctorCard key={doctor.id} doctorObj={doctor} />
                        ))
                    }
                    </Slider>)
            }




            <div className="clearfix px-5">
                <div className="section-title mt-4 float-start">
                    <h4>{t("Doctors Available Now")}</h4>
                </div>




                <div className="section-title mt-4 float-end">
                    <h5>{t("More")}</h5>
                </div>


            </div>

            {availableNowDoctorsLoading&&
                (<Slider className="px-5 pt-0" {...settings}>
                    {
                        [1,2,34,4].map(doctor => (

                            <DoctorCardLoading />

                        ))
                    }
                </Slider>)}



            {!availableNowDoctorsLoading&&
                (<Slider className="px-5 pt-0" {...settings}>
                    {
                        availableNowDoctorsList.map(doctor => (
                            <DoctorCard key={doctor.id} doctorObj={doctor} />
                        ))
                    }
                </Slider>)
            }


        </>

    );
};

export default DoctorSliders;