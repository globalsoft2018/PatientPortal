
import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../../StyleSheets/Login.css';
import AuthRepository from '../../Data/Repositories/auth-repository.ts';
import {t} from "i18next";
import   "../../Consts/images_paths";
import {right_arrow, splash_img} from "../../Consts/images_paths";
import FireStoreRepository from "../../Data/Repositories/fireStore_repository";
import toast, { Toaster } from 'react-hot-toast';
import Base_api from "../../Data/Data_Sources/base_api";

const  Login_screen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hospitalsList, setHospitalsList] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState({});
    const [canLogin, setCanLogin] = useState(0);


    const handleSubmit = async function (e) {
        debugger;
        var response=await AuthRepository.login(email, password);
        console.log(response);
        debugger;
        if(response.IsError){
            debugger;
            toast.error(t("errorLogin"));

        }else{
            localStorage.setItem("token",response.Token);
            localStorage.setItem("userName",response.UserName);
            Base_api.toString();
            window.open(localStorage.getItem('mvc_url')+`AuthorizeMvcForAPI/AuthorizedMvcForAPI?User=${email}&Password=${password}`);

            navigate("/home");

        }
    }

    const handleEmailChange = e => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
    }


    useEffect (()=>{

        const getCountries=  async function  ReadCountries(){
            debugger;
            const result = await FireStoreRepository.readHospitals();
            if(result.length>0){
               if( localStorage.getItem("name_en")!=null){

                   setSelectedHospital(result.find(country => country.name_en === localStorage.getItem("name_en")));
                   setCanLogin(1);
               }else{


                    setSelectedHospital(result.at(0));
                }
            }

            setHospitalsList(result);
        };

        getCountries().catch(console.error);



    },[]);

    function createAccount(){
        navigate('/phoneConfirmation');

    }

    function confirmHospital(){
        debugger;
        localStorage.setItem("mvc_url",selectedHospital.mvc_url);
        localStorage.setItem("api_url",selectedHospital.api_url);
        localStorage.setItem("image_path",selectedHospital.image_path);
        localStorage.setItem("name_ar",selectedHospital.name_ar);
        localStorage.setItem("name_en",selectedHospital.name_en);
        setCanLogin(1);
    }

    const handleChange = event => {
     debugger;
     const hospital = hospitalsList.find(country => country.name_en === event.target.value);
     setSelectedHospital(hospital);
    };

    const removeSelectedHospital=()=>{

        localStorage.removeItem("mvc_url");
        localStorage.removeItem("api_url");
        localStorage.removeItem("image_path");
        localStorage.removeItem("name_ar");
        localStorage.removeItem("name_en");
        setCanLogin(0);
        setSelectedHospital(hospitalsList.at(0));
    }



    return ( <>
            <section>
                <div className='container'>
                    <div className="row d-flex align-items-center justify-content-center vh-100">
                        <div className="col-xl-10 ">
                            <div className="card loginForm rounded-3 text-black">
                                <div className="row g-0">

                                    <div className="col-lg-6  py-4">
                                        <div className="text-white p-md-4 mx-md-4">


                                            {canLogin==0 && <div>

                                                <img className="card-img-bottom" src={splash_img} />

                                                <p className="text-muted">{t('WelcomeLabel')}</p>

                                                {/*     <div className='d-flex justify-content-between'>

                                                    </div> */}
                                                <select  required className="form-select" onChange={handleChange} name="hospitals">
                                                    {hospitalsList && hospitalsList.map((hospital) =>
                                                        <option value={hospital.name_en}>

                                                            <img src={hospital.image} />
                                                            <span>{hospital.name_en}</span>

                                                        </option>)}
                                                </select>


                                                <div className="pt-4">

                                                    <button onClick={(e)=>confirmHospital()} type="button" className="btn btn-primary rounded-circle">
                                                    <i class="fa-solid fa-right-long center-block"></i>
                                           {/*          <i class="fa-solid fa-left-long center-block"></i> */}
                                                    </button>


                                                </div>

                                            </div>
                                            }

                                            {canLogin==1 && <div className="text-center"    >

                                                <img className="card-img-bottom" src={localStorage.getItem("image_path")} />
                                                <h2 className="text-black">{localStorage.getItem("name_en")}</h2>
                                                <p onClick={(e)=>removeSelectedHospital()} className=" text-danger fw-bold">{"Select another hospital"}</p>



                                            </div>
                                            }


                                        </div>
                                    </div>
                                    <div className="vr"></div>


                                    <div className="col-lg-5  py-4">
                                        <div className="card-body p-md-4 mx-md-4">
                                            <div className="d-flex justify-content-start row text-start">
                                                <h3 className="mt-1">{t('LoginTitle')}</h3>
                                                <p className="text-muted">{t('WelcomeLabel')}</p>
                                            </div>
                                                <div className="form-outline mb-4">
                                                <label className="form-label">Email</label>
                                                    <input  value={email} onChange={handleEmailChange} id="form2Example11" className="form-control"
                                                           placeholder="Email Address" required />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label">Password</label>
                                                    <input     value={password}
                                                                onChange={handlePasswordChange} type="password"  placeholder="Password" className="form-control" required />
                                                </div>

                                   <div className="d-flex justify-content-start  pt-1 mb-3 pb-1">
                                                    { canLogin==1&& <button className="btn btn-primary w-100 d-block rounded-pill" onClick={(e)=>handleSubmit()}>{t('Login')}</button>}
                                                    { canLogin==0&& <button className="btn btn-primary w-100 d-block disabled rounded-pill">{t('Login')}</button>}
                                                </div>

                                                <div className="d-flex justify-content-start  pt-1 pb-1">
                                                    <p className="mb-0 me-2">{t('not registered Yet ?')}</p>
                                                    <a onClick={createAccount} className="fw-bold">{t('Create an Account')}</a>
                                                </div>


                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </> );
};

export default Login_screen;