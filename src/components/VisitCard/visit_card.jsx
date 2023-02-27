import React from 'react';
import DateTimeHelper from "../../Core/DateTime/date_time_helper";

import {useNavigate} from "react-router-dom";


const VisitCard = (props) => {
    const visitData =props.VisitObj;
    const  navigate=useNavigate();


    const gotoVisitScreen=()=>{
        navigate('/visitScreen',
            {state:{visitData}},);
    }




    return (
       
                    <tr>
                    <th scope="row">{DateTimeHelper.dayNameDayNumberMonthNameString(DateTimeHelper.dateFromString(visitData.VisitStartDate))}</th>
                    <td>#{visitData.VisitNumber}</td>
                    <td>{visitData.PatientName}</td>
                    <td>{visitData.Company}</td>
                    <td>{visitData.DoctorName}</td>
                    <td>   <i onClick={gotoVisitScreen} class="fa-solid fa-eye"></i>   </td>
                    </tr>
              
             
      
        




    );
};

export default VisitCard;