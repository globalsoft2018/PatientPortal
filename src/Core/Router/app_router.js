
import {Navigate, Route} from 'react-router-dom';
import React from "react";
import Header from "../../components/Layout/Header/Header";


export  const  App_Router= ({children ,needAuth},) =>{
    if(needAuth&&localStorage.getItem("token")==null){
      return <Navigate to='/login'/>;

    }


    return <>
        {needAuth&&localStorage.getItem("token")?<Header /> : <div></div>}
        {children}


    </>
     ;


}