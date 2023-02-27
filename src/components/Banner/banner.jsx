import './banner.css';
import React from 'react';
import shape1 from '../../Images/shapes/1.png';
import shape3 from '../../Images/shapes/3.png';
import shape4 from '../../Images/shapes/4.png';
import shape2 from '../../Images/shapes/2.png';

import shape01 from '../../Images/shapes/01.png';
import shape02 from '../../Images/1-1.png';
const banner = (props) => {
    return (


        <div className="home-page">
            <div className='home-banner mt-5'>
            <div className=" bg-shapes">
                    <img src={shape1} className="shape-01" alt="img" />
                    <img src={shape3} className="shape-03" alt="img"/>
                    <img src={shape4} className="shape-04" alt="img" />
                    <img src={shape2} className="shape-02" alt="img" />
                </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 banner-left" data-aos="fade-up">
                        <div className="banner-info">
                            <h2>Search Doctor,</h2>
                            <h2><span>Make an Appointment</span></h2>
                        </div>
                        <div className="banner-details">
                            <h4><img src={shape01} className="me-2" alt="" /> Instant Operation &amp; Appointment
                            </h4>
                            <h4><img src={shape01} className="me-2" alt="" /> 100% Expert Doctors</h4>
                            <p>Discover the best doctors, clinic &amp; hospital the city nearest to you.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12" data-aos="fade-up"><img src={shape02}
                            className="img-fluid dr-img" alt="" /></div>
                </div>
            </div>
            </div>
  
        </div>








    );
};

export default banner;