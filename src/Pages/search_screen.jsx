import React, {useEffect, useRef, useState} from 'react';
import {t} from "i18next";
import DoctorRepository from "../Data/Repositories/doctor_repository";
import DoctorCard from "../components/DoctorCard/doctor_card";
import DoctorCardLoading from "../components/DoctorCard/doctor_card_loading";
import {Container} from "react-bootstrap";
import {useLocation} from "react-router-dom";
const SearchScreen = () => {


    let [DoctorsList, setDoctorsList] = useState([]);
    let [doctorName, setDoctorName] = useState("");
    let [doctorCategory, setDoctorCategory] = useState(null);
    let [filterType, setFilterType] = useState(1);
    let [PageIndex, setPageIndex] = useState(0);
    let [loading, setLoading] = useState(true);
    let [hasNext, setHasNext] = useState(true);
    let [specialitiesList, setSpecialitiesList] = useState([]);

    const listInnerRef = useRef();
    const params = useLocation();

    const onScroll = async () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight&&loading===false&&hasNext===true) {
                PageIndex=PageIndex+1;
                setPageIndex(PageIndex);
                await search();

            }
        }
    };

    async function searchClick(){
        DoctorsList=[];
        PageIndex=0;
        setPageIndex(PageIndex);
        setDoctorsList(DoctorsList);
        setLoading(true);
        await search();
    }
    async function  search(){
        debugger;
        const filterDoctors = {
            BestRating: (filterType==2)?true:false,
            ISAvailableNow: (filterType==3)?true:false,
            PageIndex: PageIndex,
            SpecialityId:doctorCategory,
            PageSize:20,
            Name:doctorName };

        const doctors = await DoctorRepository.getAllDoctorForPatientApp(filterDoctors);
        DoctorsList=DoctorsList.concat(doctors);
        setDoctorsList(DoctorsList);
        setLoading(false);
        if(doctors.length===20){
            setHasNext(true);

        }else{

            setHasNext(false);
        }
    }

    async function start(){
        const specialityList = await DoctorRepository.getAllSpecialityForApp();
        specialitiesList=[].concat(specialityList);
        setSpecialitiesList(specialitiesList);
        await search();

    }

    useEffect (()=>{

        start().then(value => {}).catch(console.error); },[]);

    function  onChangeType(e){
        debugger;
        setFilterType(parseInt(e.target.value));
    }
    const handleNameChange = e => {
        setDoctorName(e.target.value)
    }

    const handleCategoryChange = e => {
        setDoctorCategory(e.target.value)
    }

    const  clear=()=>{
        doctorName="";
        setDoctorName("");
        doctorCategory=null;
        setDoctorCategory(doctorCategory);
        filterType=1;
        setFilterType(filterType);
        searchClick();
    }


    return (<div>

            <div className="py-3  px-2 mx-4 my-4 filter-div row text-center media">
                <div className="col-md-2">


                    <div className="col-md-12">
                    <input className="form-control" value={doctorName} onChange={handleNameChange}  placeholder="Doctor Name"/>
                    </div>
                </div>
                <div className="col-md-2 ">


                    <select   value={doctorCategory} className="form-select" onChange={handleCategoryChange} name="categories">

                        <option value={null}></option>
                        {specialitiesList && specialitiesList.map((cat) =>
                            <option value={cat.Id}>

                                <span>{cat.Name}</span>

                            </option>)}
                    </select>
                </div>
                <div className="col-md-5 row mt-2">

                    <div className="col-md-4 row">
                        <div className="col-md-8">
                            <p className="text-black">All</p>
                        </div>

                        <div className="col-md-4">
                            <input type="radio" value={"1"} onClick={onChangeType} name="type" checked={filterType==1}/>
                        </div>
                    </div>

                    <div className="col-md-4 row">
                        <div className="col-md-9">
                            <p className="text-black">Best Rated</p>
                        </div>

                        <div className="col-md-3">
                            <input value={"2"}  onClick={onChangeType} type="radio" name="type" checked={filterType==2}/>
                        </div>
                    </div>

                    <div className="col-md-4 row">
                        <div className="col-md-8">
                            <p className="text-black">Available</p>
                        </div>

                        <div className="col-md-4">
                            <input value={"3"}  onClick={onChangeType} type="radio" name="type" checked={filterType==3}/>
                        </div>
                    </div>



                </div>
                <div className="col-md-3 row ">
                    <input type="button" onClick={searchClick} value="Search" className="btn btn-primary rounded-pill col-md-5 mx-1"  />
                    <input type="button" value="clear" onClick={clear} className="btn btn-danger rounded-pill col-md-5 mx-1"  />
                </div>
            </div>
            <div className="px-4 row search-screen-inner " onScroll= {onScroll}
                  ref={listInnerRef} >

            {loading?
                (

                        [1,2,4,4,4,4,4,3,2,4,5,5,5,5,5,5].map(doctor => (
                            <div className="col-3">
                            <DoctorCardLoading />
                            </div>
                        ))
                    ):
                (

                    DoctorsList.map(doctor => (
                        <div className="col-3">
                            <DoctorCard key={doctor.id} doctorObj={doctor} />
                        </div>
                        ))

              )
            }

</div>
        </div>);
};

export default SearchScreen;