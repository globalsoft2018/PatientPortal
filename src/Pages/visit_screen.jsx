import React, {useEffect, useState} from 'react';
import '../assets/_common.scss';
import DoctorRepository from "../Data/Repositories/doctor_repository";
import {useLocation, useNavigate} from "react-router-dom";
import {t} from "i18next";
import ReactStars from "react-rating-stars-component";
import labImage  from '../Images/lab.png';
import rxImage  from '../Images/rx.png';
import radImage  from '../Images/rad.png';
import toast from "react-hot-toast";
import { render } from 'react-dom'


const VisitScreen = () => {
    const [visit, setVisit] = useState();
    const [doctorRate, setDoctorRate] = useState(0.0);
    const [canRate, setCanRate] = useState(1);
    const [loading, setLoading] = useState(true);
    const params = useLocation();

      const   getDoctorVisitRate = async (visitId)=>  {
        debugger;
       const rate = await DoctorRepository.getVisitRating(visitId);
          debugger;

          if(rate!=null){
           setCanRate(0);
           setDoctorRate(rate);

       }else{

           setCanRate(1);

       }

    }

       const  saveDoctorRate=async()=>{
          debugger;
           const response = await DoctorRepository.ratingDoctorVisit(visit.VisitId,0,doctorRate);
           debugger;

           if(response.IsError){
               debugger;
               toast.error(response.ErrorMessage);

           }else{
               toast.success(response.SuccessMessage);

               setCanRate(0);


           }
       }
       const ratingChanged = (newRating) => {
        setDoctorRate(newRating)
    }

       useEffect  ( ()=> {
        debugger;
        setVisit(params.state.visitData);
        getDoctorVisitRate(params.state.visitData.VisitId);


    },[]);



    const  navigate=useNavigate();



      const gotoResultScreen=async(resultType)=>{
          navigate('/resultScreen',
              {state:{VisitId:visit.VisitId,Type:resultType}},);

      }



        return <div className='container'>

            <div className="px-2 py-2 my-4 rate-doctor-card col-6">
                <div>
                    <h4>{t('Rate Visit Doctor')}</h4>
                    <h5>{params.state.visitData.DoctorName}</h5>

                    <div>
                        {(canRate == 0) &&
                            <div>

                            <ReactStars
                                count={5}
                                edit={false}
                                value={doctorRate}
                                size={35}
                            />


                            <input type='button' className='col-12 btn disabled' value={t('Save Rate')}/>


                        </div>}


                        {(canRate == 1) &&<div>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={35}
                                color2={'#ffd700'}/>
                            <input type='button' className='col-12 btn btn-success' value={t('Save Rate')}
                                   onClick={() => saveDoctorRate()}/>



                        </div>  }


                    </div>



                </div>

            </div>

            <div className='row container'>
                <div onClick={(e)=>gotoResultScreen("lab")} className='rate-doctor-card col-2  my-2'>
                    <img src={labImage} className='img-fluid py-4 px-4'/>
                    <h5>{t('Lab-Results')}</h5>
                </div>

                <div onClick={(e)=>gotoResultScreen("rad")} className='rate-doctor-card col-2 my-2 '>
                    <img src={radImage} className='img-fluid py-4 px-4'/>
                    <h5>{t('Rad-Results')}</h5>
                </div>

                <div onClick={(e)=>gotoResultScreen("rx")}  className='rate-doctor-card col-2 my-2 '>
                    <img src={rxImage} className='img-fluid py-4 px-4'/>
                    <h5>{t('Rx-Results')}</h5>
                </div>

            </div>


        </div>;

}

export default VisitScreen;