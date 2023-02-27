
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../../StyleSheets/phone_confirmation.css';
import FireStoreRepository from '../../../Data/Repositories/fireStore_repository.ts';
import AuthRepository from '../../../Data/Repositories/auth-repository.ts';
import { useEffect } from 'react';
import {t} from "i18next";

const  Phone_confirmation = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [countriesList, setCountriesList] = useState();
    const [selectedCountry, setSelectedCountry] = useState();
    //ReadCountries ();
    

    useEffect (()=>{
        
      const getCountries=  async function  ReadCountries(){
            debugger;
            const result = await FireStoreRepository.ReadCountries();
            setCountriesList(result);
            setSelectedCountry(result.find(s=>true)); 
        };

        getCountries().catch(console.error);



    },[]);


   


    const handleSubmit = async function (e) {
        debugger;
        e.preventDefault();
        var PhoneConfirmationResponse=await AuthRepository.phoneConfirmation(phone);
        debugger;
        console.log(PhoneConfirmationResponse);

        if(PhoneConfirmationResponse.ToNext){
          

        navigate('/confirmationCode',
            {state: {PhoneConfirmationResponse}},);

        }
    }



    const handlePhoneChange = e => {
        debugger;
        setPhone(e.target.value)

    }

     

    const handleChange = event => {


        debugger;
        var xx=countriesList.find(country=>country.code===event.target.value);
        setSelectedCountry(xx);
      };

    


   
  

    
    return (
        <>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center vh-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row d-flex bd-highlight">
                                    <div className="col-lg-6 align-self-center p-2 bd-highlight">
                                        <div className="card-body p-md-4 mx-md-4">
                                            <div className="">
                                            <h2 className="d-flex justify-content-start">{t('PhoneConfirmation')}</h2>
                                            <span className="d-flex justify-content-start font-weight-normal text-secondary mb-3">
                                               {t('PhoneConfirmationHint')}</span>



                                            </div>




                                            <form className="row" onSubmit={handleSubmit}>
                              
                                    
                                                        
                                                        <div class="col-lg-6">
                                                                <select  required className="form-select border-radius-0" onChange={handleChange} name="fruits" id="fruit-select">
                                                                {countriesList && countriesList.map((country) =>
                                                                <option value={country.code}>{country.name_en} {country.code}</option>)}</select>
                                                        </div>

                                                        <div class="col-lg-6">
                                                            <input onBlur={handlePhoneChange}  id="form2Example11" className="form-control border-radius-0" placeholder={t("Phone")} required />

                                                        </div>
                                                 



                                               
                                                    
                                                <div className="d-flex justify-content-start form-inrow mt-2">

                                                <span class="font-weight-normal small text-secondary">{t('Example')}</span>

                                                 <span class="small font-weight-bold text-dark">{selectedCountry&&selectedCountry.example}</span>

                                                </div>
                    
                                                    
                                                

                                                <div className='d-flex justify-content-start mt-3'>
                                                    <button className="btn-primary btn rounded-pill col-md-12 ml-0" type="submit">Send Code
                                                        </button>
                                                </div>

                                       
                                                    
                                                
                                               



                                                

                                               

                                            </form>

                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 d-flex align-items-center">
                                    <div class="vr"></div>
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <img className="col-lg-12" src='https://img.freepik.com/premium-vector/login-password-verification-code-push-message_212005-37.jpg?w=2000'/>
                                           
                                           
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

        </>
    );
};

export default Phone_confirmation;