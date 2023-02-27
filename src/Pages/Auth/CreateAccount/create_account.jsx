
import React, { useState } from 'react';
import { useNavigate ,useLocation } from "react-router-dom";
import '../../../StyleSheets/CreateAccount.css';
import AuthRepository from '../../../Data/Repositories/auth-repository.ts';
import { useEffect } from 'react';
import FireStoreRepository from "../../../Data/Repositories/fireStore_repository";
import DoctorRepository from "../../../Data/Repositories/doctor_repository";
import DateTimeHelper from "../../../Core/DateTime/date_time_helper";
import toast from "react-hot-toast";
import {t} from "i18next";


const  CreateAccount = () => {
    const navigate = useNavigate();
    const params = useLocation();

    const [PatientId, setPatientId] = useState(0);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(getToday());
    const [sex, setSex] = useState(1);
    const [age, setAge] = useState(1);

    useEffect (()=>{
        debugger;
        setPhone(params.state.phone);
        setPatientId(params.state.PatientId);
        if(params.state.PatientId!= 0&&params.state.PatientId!=null) {
            getPatient(params.state.PatientId);
        }

      },[]);

    async function  getPatient(patientId){
        debugger;
        let patient=await  DoctorRepository.getPatientAppByPatientId(patientId);
        setUserName(patient.FullName);
        setSex(patient.Gender);
        let BD=DateTimeHelper.dateFromString(patient.BirthDate).toISOString().slice(0, 10).toString();
        setBirthDate(BD);
        getAge(DateTimeHelper.dateFromString(patient.BirthDate));
        debugger

    }

    const handleSubmit = async function (e) {
        debugger;
        e.preventDefault();
        const user = {
            Id: 0,
            FullName: userName,
            Email: email,
            Phone: phone,
            Password: password,
            Gender: sex,
            BirthDate: birthDate,
            PatientId:PatientId


        };
        let result=await AuthRepository.signUp(user);
        if(result.IsError){
            toast.error(result.ErrorMessage);


        }else{

            toast.success(result.SuccessMessage);
            navigate('/login');


        }
    }
    

    const handleUserNameChange = e => {
        setUserName(e.target.value)
    }


    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    
    const handlePasswordChange = e => {
        debugger;
        setPassword(e.target.value);
    }


    const handleBirthDateChange = e => {
       debugger;
       if(e.target.value!=""){
           const enteredBirthDate = new Date(e.target.value);
           const age = getAge(enteredBirthDate);
           setAge(age);
       setBirthDate(e.target.value);
       }else{

        setAge(`${1}`);

       }
    }


    const handleAgeChange = e => {
        debugger;
        if(e.target.value!=""){
            const age = e.target.value;
            setAge(age);
            const birthDate = getBirthDate(age);
            setBirthDate(birthDate.toString());
        }else{
            setAge("");
        }
     }
     

     function getBirthDate(age){
         const ageInMillis = age * 365 * 24 * 60 * 60 * 1000;
         const dateOfBirth = new Date(new Date().getTime() - ageInMillis);
         return dateOfBirth.toISOString().slice(0, 10).toString();


     }


    function getAge(dateString) {
        debugger;
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age);
        return age;

    }


    const handleSexChange = e => {
        debugger;
        setSex(parseInt(e.target.value))
    }
    

     function getToday(){
    return new Date().toISOString().slice(0, 10).toString();
    }


    return (
        <>
            <section className="h-100 pb-5">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-5">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-12">
                                        <div className="card-body p-md-5 mx-md-3">
                                            
                                            <h2 className="d-flex justify-content-start">Create New Account</h2>
                                            <span className="d-flex justify-content-start font-weight-normal text-secondary">Enter The Code You Receive in Your Phone</span>



                                            <form onSubmit={handleSubmit}>

                                                <div className="form-outline mb-3 mt-4">
                                                    <input onChange={handleUserNameChange} value={userName} type="text" className="form-control"
                                                        placeholder="User Full Name" required />
                                                </div>

                                                <div className="form-outline mb-3">
                                                    <input onChange={handleEmailChange} value={email} type="email"  className="form-control"
                                                        placeholder="Email Address" required />
                                                </div>


                                                <div className="form-outline mb-3">
                                                    <input  type="text" className="form-control"
                                                    value={phone} disabled
                                                        placeholder="Phone Number" required />
                                                </div>
 
                                                <div className="form-outline mb-3">
                                                    <input onChange={handlePasswordChange} type="password"  value={password} placeholder="Password" className="form-control" required />
                                                </div>

                                                <div className="form-inrow row">

                                                    <div className='col-md-8'>
                                                    <input onChange={handleBirthDateChange} type="date" value={birthDate} placeholder="Birth Date" className="form-control" required />
                                                    </div>

                                                    <div className='col-md-4'>
                                                    <input onChange={handleAgeChange}  pattern="[0-9]+"  type="text"
                                                      placeholder="Age" value={age} className="form-control" required />
                                                    </div>
                                                    
                                                </div>
                                                <div className='d-flex justify-content-start mt-3'>     
                                                    <input class="form-check-input mx-2" type="radio" onBlur={handleSexChange} checked  name="fav_language" value="1"/>
                                                    <label className="" for="male">Male</label>
                                                    <div className='col-md-1'></div>
                                                    <input class="form-check-input mx-2" type="radio" onBlur={handleSexChange}  name="fav_language" value="2"/>
                                                    <label className="" for="female">Female</label>
                                                    
                                                </div>
                                                <div className='d-flex justify-content-start mt-3'>
                                                    <button className="btn btn-primary w-100 d-block rounded-pill" type="submit">Create an Account
                                                        </button>
                                                </div>

                                               

                                            </form>

                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default CreateAccount;