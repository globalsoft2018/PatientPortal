import './speciality_card.css';
import NoImage  from '../../Images/noImage.jpg'
const SpecialityCard = (props) => {

    const { Image, Name} = props.specialtyObj;


    return (
<>

    <div className="speciality-card py-2 px-2  mx-lg-2" >
        <div className="center-block">
            <img className="card-img-bottom card"
                 src={Image??NoImage}/>
            <span > {Name} </span>

        </div>

    </div>


</>


    );
};

export default SpecialityCard;