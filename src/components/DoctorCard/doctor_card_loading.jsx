import './doctor_card.css';
import React from 'react';
import Placeholder from 'react-bootstrap/Placeholder';



const DoctorCardLoading = () => {



    return (
        <div className="px-2 pt-2">
            <div className="col-12 ">
                <div>
                    <Placeholder
                                 animation="glow">
                        <Placeholder  className="Placeholder-Img"/>
                    </Placeholder>


                </div>
                <div className=" py-2 text-start">
                    <div>
                        <Placeholder  animation="glow">
                            <Placeholder xs={8} />
                            <Placeholder xs={10} />
                            <Placeholder xs={6} />
                        </Placeholder>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DoctorCardLoading;