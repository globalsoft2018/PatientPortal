import DoctorRepository from "../../Data/Repositories/doctor_repository.ts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DoctorCardLoading from "../DoctorCard/doctor_card_loading";
import React, {useEffect, useState} from "react";
import SpecialityCard from "./speciality_card";
import {t} from "i18next";
const SpecialityList = () => {


    const [specialitiesList, setSpecialitiesList] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect (()=>{

        const getSpecialities=  async function  ReadData(){
            debugger;
            const specialityList = await DoctorRepository.getAllSpecialityForApp();
            debugger;
            setSpecialitiesList(specialityList);
            setLoading(false);





        };

        getSpecialities().catch(console.error);



    },[]);



    return (
        <>

            <div className="clearfix px-5">
                <div className="section-title mt-4 float-start">
                    <h4>{t("Specialties")}</h4>
                </div>







            </div>

            {loading?
                (<div className="px-5 pt-0">

                       Loading

                </div>):
                (<div className="row media px-5 py-2">
                        {
                    specialitiesList.map(obj => (
                    <SpecialityCard specialtyObj={obj} />
                    ))
                        }

                </div>)
            }

        </>

    );
};

export default SpecialityList;