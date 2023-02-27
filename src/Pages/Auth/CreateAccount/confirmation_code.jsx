
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../../StyleSheets/confirmation_code.css';
import AuthRepository from '../../../Data/Repositories/auth-repository.ts';
import logo from '../../../Images/logo.png';
import { useEffect } from 'react';


const  Confirmation_code = (props) => {
    const navigate = useNavigate();
    const refList = React.useRef([]);
    const [code, setCode]=useState(); 

    const [PhoneConfirmationResponse, setRespone]= useState();
    const params = useLocation();
    

    useEffect (()=>{
        debugger;
        setRespone(params.state.PhoneConfirmationResponse);
        setCode(["","","","",""]);

      },[]);

   
   


    const  handleSubmit = async function (e) {
        debugger;
        e.preventDefault();
        var enteredCode=code.join("");
        var id=PhoneConfirmationResponse.PhoneConfirmationId;
        var response=await AuthRepository.CheckConfirmationCode(enteredCode,id);
        if(response.IsError==true){
            debugger;
            alert(response.ErrorMessage);
            var newResponseCodeId=parseInt(response.SuccessMessage);
            if(newResponseCodeId){
            PhoneConfirmationResponse.PhoneConfirmationId=newResponseCodeId;
            }

        }else{
                debugger;
                let phone =PhoneConfirmationResponse.Phone;
                let PatientId =PhoneConfirmationResponse.PatientId;
                navigate('/createaccount',
                    {state: {phone,PatientId}},);

        }
        debugger;
        
    }



    const handleCodeChange = (e )=> {
        debugger
        var id=e.target.id.split("_")[2];
        var valId=parseInt(id)+1;
        code[valId-1]=e.target.value;
        setCode(code);
        if(valId!=5){
        debugger;
        refList.current[valId].focus();
        debugger;

        }

    }

    const AddRef=(el)=>{
if(el&&!refList.current.includes(el)){
    refList.current.push(el);
}

    }
    
   
    return (
        <>
            <section>
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center vh-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-4 mx-md-4">
                                            <div className="text-center">
                                            <div class="col-md-6 px-50">
                                                
                        <img  class="img-fluid" src={logo} alt="logo" />
                        </div>


                                            </div>
                                            <span className="d-flex justify-content-start">Enter The Code You Receive in Your Phone</span>
                                            <span class="d-flex justify-content-start font-weight-bold text-primary">{PhoneConfirmationResponse&&PhoneConfirmationResponse.Phone}</span>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-inrow mb-4 mt-2">




                                                        <div class="input-group row d-flex justify-content-center">
                                                        
                                                       
                                                        {code && code.map((c,index) =>

                                                        (
                                                            <div className='col-md-2' >
                                                            <input maxlength = "1" pattern= "[0-9]" min="0" max="9" onChange={handleCodeChange} key={index}  type="text" id={"input_code_"+index} ref={AddRef}  className="form-control  number-wrapper" placeholder="#" required />
                                                            </div>
                                                        )
                                                        
                                                        
                                                        
                                                        )}



                                                        </div>



                                               
                                                    
                                       
                    
                                                    
                                                

                                                <div className='d-flex justify-content-center mt-3'>
                                                    <button className="btn-primary rounded-pill btn col-md-12 ml-0" type="submit">Confirm Code
                                                        </button>
                                                </div>

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
            </section>
        </>
    );
};

export default Confirmation_code;