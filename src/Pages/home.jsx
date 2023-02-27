import React from 'react';
import DoctorsSliders from '../components/DoctorSliders/DoctorsSliders';
import SpecialityList from "../components/Specialities/speciality_list";
import Banner from "../components/Banner/banner";

const Home = () => {

    return (
        <>
           <Banner />
           <SpecialityList />
           <DoctorsSliders />
        </>
    );
};

export default Home;