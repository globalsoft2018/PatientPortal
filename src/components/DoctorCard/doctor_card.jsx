import React, {useEffect, useState} from 'react';
import './doctor_card.css';
import ReactStars from "react-rating-stars-component";
import MDoctor from "../../Images/M_doctor.png";
import FDoctor from "../../Images/F_doctor.png";
import {useNavigate} from "react-router-dom";

const DoctorCard = (props) => {
const  navigate=useNavigate();


    const  { Id,Name, Speciality,Image,SexId,Rate,Description} = props.doctorObj;
    const doctorObj=props.doctorObj;

    const gotoDoctorProfile=()=>{
        navigate('/doctorProfile',
            {state: {doctorObj}},);

    }
    return (
        <div className="px-1" onClick={gotoDoctorProfile}>
            <div className="single-blog-card ">
                <div className="card-thumb  justify-content-center  text-center d-flex ">
                    <img className="h-50 w-50 pt-2 " src={Image??(SexId==1?MDoctor:FDoctor)} alt="" />
                </div>
                <div className="px-4 py-3 text-start">
                    <ReactStars
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        value={Rate}

                    />
                    <div className="card-meta">
                        <h6 className="doctor-name">{Name}</h6>
                        <span>{Speciality}</span>
                    </div>
                </div>
            </div>

            </div>
            );
};

export default DoctorCard;