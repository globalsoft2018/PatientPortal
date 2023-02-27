import React, {useEffect, useState} from 'react';
import  doctorImage from '../Images/1.jpg'
import {useLocation} from "react-router-dom";
import {t} from "i18next";
import DoctorRepository from "../Data/Repositories/doctor_repository";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import toast from "react-hot-toast";
import DateTimeHelper from "../Core/DateTime/date_time_helper";


const DoctorProfile = () => {
    const [doctorData, setDoctorData]= useState({});
    const [selectedDate, setSelectedDate]= useState('');
    const [selectedDateObj, setSelectedDateObj]= useState('');
    const [selectedDayName, setDayName]= useState('');
    const [clinicsData, setClinicsData]= useState([]);
    const [clinicId, setClinicId]= useState(0);
    const [daysData, setDaysData]= useState([]);
    const [slotsData, setSlotsData]= useState([]);
    const [selectSlotData, setSelectSlotData]= useState('');
    const [clinicServices, setClinicServices]= useState([]);
    const [selectedServices, setSelectedServices]= useState(0);


    const params = useLocation();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     useEffect  ( ()=> {
         setDoctorData(params.state.doctorObj);
        const dateObj = new Date();
        dateString(dateObj);
        getClinics();


     },[]);

    const  dateString=(dateObj)=>{
      const fff= [ "jan", "feb","mar", "apr","may", "jun","jul", "aug","sep", "oct", "nov","dec"];
        const week=[
            "Monday",
            "Tuesday",
            "Wednesday" ,
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",];
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const dayNameNumber=dateObj.getDay();
        setDayName(t(week.at(dayNameNumber-1)));
        const data=  day + " " + t(fff.at(month-1)) + " " + year;
        setSelectedDate(data);
        debugger;
        setSelectedDateObj(DateTimeHelper.dateToString(dateObj));
        return data;
    }

    const dateFromString=(stringDate)=>{
        const ccc=new Date(stringDate);
       return  dayMonthString(ccc);
    }

    const dayNameFromString=(stringDate)=>{
        const ccc=new Date(stringDate);
        const week=[
            "Monday",
            "Tuesday",
            "Wednesday" ,
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",];
        const dayNameNumber=ccc.getDay();

        return t(week.at(dayNameNumber-1).substring(0,3));
    }

    const YearFromString=(stringDate)=>{
        const ccc=new Date(stringDate);
        const year = ccc.getUTCFullYear();
        return  year;
    }

    function  dayMonthString(dateObj){
        const fff= [ "jan", "feb","mar", "apr","may", "jun","jul", "aug","sep", "oct", "nov","dec"];
        const week=[
            "Monday",
            "Tuesday",
            "Wednesday" ,
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",];
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();

        return  day + " " + t(fff.at(month-1));
    }


    const getClinics =async()=>{
        const clinics= await  DoctorRepository.getDoctorClinicsByEmployeeId(params.state.doctorObj.Id);
        debugger;
        setSelectedClinicId(clinics[0].Id);
        setClinicsData(clinics);

    }

    async function  setSelectedClinicId (clinicsId){
        setClinicId(clinicsId);
         readDays(clinicsId);
    }

    const  readDays =async ( clinicsId)=>{
        const days= await  DoctorRepository.getDaysWorkByEmployeeIdAndClinicId(params.state.doctorObj.Id,clinicsId);
        setDaysData(days);
        let date = new Date();
        debugger;

        days.forEach(item=>{
            if(item.Status!=0){

                date=new Date(item.DateTimeDay);

            }
        });

          getSlots(clinicsId,date);
    }
    async function onDayClicked(DateTimeDay){
        const date=new Date(DateTimeDay);
        getSlots(clinicId,date);

    }

    async function getSlots( clinicsId,date){
        dateString(date);

        const slots= await  DoctorRepository.getReservationTimeSlots(params.state.doctorObj.Id,clinicsId,date);
        debugger;
        setSlotsData(slots);

    }
    async function  onSlotClicked(slot){
        setSelectSlotData(slot);
        const Services= await  DoctorRepository.getClinicServices(clinicId);
        setClinicServices(Services);
        debugger;
        setSelectedServices(Services.at(0).Id);

        handleShow();
    }
    const handleChangeServices = event => {


        debugger;
        setSelectedServices(event.target.value);
        debugger;
    };

    async function  NewAppointment(){
        debugger;

        const appointmentModel = {
            ClinicId :clinicId,
            DoctorId :doctorData.Id,
            SlotString :selectSlotData,
            AppointmentDate :selectedDateObj,
            ServiceId :selectedServices,
            StatusCode:0
        };
        const response= await  DoctorRepository.newAppointment(appointmentModel);
        handleClose();

        if(response.IsError){
            debugger;
            toast.error(response.ErrorMessage);

        }else{
            toast.success(response.SuccessMessage);


        }


    }
    return (
        <>
            <section className="light mt-5">
                <div className="container py-2">

                    <article className="postcard light red">
                        <div className="row">
                            <div className="col-lg-4">
                                <a className="postcard-img" href="#">
                                    <img src={doctorImage} className="card-img-top postcard_img" alt="Image Title" />
                                </a>
                            </div>
                            <div className="col-lg-8">
                                <div className="postcard-text">
                                    <div className="clearfix">
                                        <div className="float-start">
                                            <h1 className="postcard__title  "><a href="#">{doctorData.Name}</a></h1>
                                            <div className="postcard__subtitle small">
                                            </div>
                                            <p>{doctorData.Speciality}</p>
                                        </div>


                                        <div className="float-end d-grid gap-2">
                                                    <button type="button" className="btn btn-primary d-block rounded-pill">Book An Appointment</button>
                                                    <div className="ratings ">
                                                        <i className="fa fa-star rating-color">{doctorData.Rate}<span className="rating-text">Rating</span></i>
                                                        <span className="review-count">30 Review</span>
                                                    </div>
                                                    </div>

                           
                                    </div>


                                    <div className="postcard__bar"></div>
                                    <p className="mb-0">{doctorData.Description}

                                        Doctors, also known as physicians, are licensed health professionals who maintain and restore human
                                        health through the practice of medicine. They examine patients, review their
                                        medical history, diagnose illnesses or injuries, administer treatment



                                    </p>

                                    <ul className="postcard__tagbox">
                                        <li className={(doctorData.IsGreen?"tag-item rounded-pill":"tag-itemRed rounded-pill")}><i className="fas fa-clock mx-1 my-1"></i>{doctorData.AvailabilityLabel}</li>
                                    </ul>


                                    <div className="row">



                                    </div>






                                </div>
                            </div>
                        </div>


                    </article>

                    <div className="mt-5">
                        <div className="row">
                            <div className="col-12 col-sm-4 col-md-6">
                                <h4 className="mb-1">{t('Doctor Clinics')}</h4>
                                <p className="text-muted">select clinic to esay appointment</p>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                        <div className="card post-tag">
                            <div className="row px-5 py-2">
                                <ul className="postcard__tagbox mb-0">

                                    {
                                        clinicsData.map(obj => (


                                            <li onClick={() => setSelectedClinicId(obj.Id)}  className={'p-2 m-2 '+((obj.Id==clinicId)?'tag-itemSelected rounded-pill':'tag-item')}>
                                                <p className="mb-0">{obj.Name}</p>

                                            </li>

                                        ))

                                    }
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="row">
                            <div className="col-12 col-sm-4 col-md-6">
                                <h4 className="mb-1">{selectedDate}</h4>
                                <p className="text-muted">{selectedDayName}</p>
                            </div>

                        </div>
                    </div>

                    <div className="schedule">
                        <div className="card booking-schedule schedule-widget">
                            <div className="schedule-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="day-slot">
                                            <ul>
                                                {
                                                    daysData.map(obj => (

                                                <li  onClick={() => onDayClicked(obj.DateTimeDay)} className={obj.Status==0?"disabled":""}><span>


                                                    {dayNameFromString(obj.DateTimeDay)}


                                                </span>
                                                    <span className="slot-date">
                                                    {dateFromString(obj.DateTimeDay)}
                                                      <small className="slot-year">
                                                 {YearFromString(obj.DateTimeDay)}
                                                          </small></span>

                                                </li>
                                                        ))}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="schedule-cont">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="time-slot">
                                            <ul className="clearfix">


                                                {
                                                    slotsData.map(obj => (

                                                <li><a className={"timing " +(obj.From==selectSlotData?"selected":"")} onClick={()=>onSlotClicked(obj.From)}><span>{obj.From}</span></a></li>
                                                    ))
                                                }



                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

            </section>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>  {t('Confirm Appointment')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <select  required className="form-select" onChange={handleChangeServices} name="hospitals">
                        {clinicServices && clinicServices.map((hospital) =>
                            <option value={hospital.Id}>

                                <span>{hospital.Name}</span>

                            </option>)}
                    </select>




                </Modal.Body>
                <Modal.Footer>

                    <Button className='col-lg-5 rounded-pill' variant="primary" onClick={NewAppointment}>
                        {t('Confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
};

export default DoctorProfile;