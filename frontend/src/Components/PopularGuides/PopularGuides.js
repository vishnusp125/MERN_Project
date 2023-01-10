import React from 'react'
import './PopularGuides.css'
import { MdLocationOn } from 'react-icons/md'
import { BsArrowRightShort } from 'react-icons/bs'

//import image
import guide1 from '../../assets/images/guide1.jpg'
import guide2 from '../../assets/images/guide2.jpg'
import guide3 from '../../assets/images/guide3.jpg'
import guide4 from '../../assets/images/guide4.jpg'


const guides = [
    {
        id: 1,
        imgSrc: guide1,
        destTitle: 'Guanajuato',
        location: "Mexico",
        price: "Rs.1450/day"

    },
    {
        id: 2,
        imgSrc: guide2,
        destTitle: 'Guanajuato',
        location: "India",
        price: "Rs.1400/day"

    },
    {
        id: 3,
        imgSrc: guide3,
        destTitle: 'Guanajuato',
        location: "Canada",
        price: "Rs.1400/day"

    },
    {
        id: 4,
        imgSrc: guide4,
        destTitle: 'Guanajuato',
        location: "Tokyo",
        price: "Rs.1500/day"

    }


]

function PopularGuides() {
    return (
        <section className='offer container section'>
            <div className="secContainer">
                <div className="secIntro">
                    <h2 className="secTitle">
                        Popular Guides
                    </h2>
                    <p>
                        Most rated Guides
                    </p>
                </div>
                <div className="mainContent grid">
                    {
                        guides.map(({id,imgSrc,destTitle,location,price}) => {
                            return (
                                <div className="singleOffer" id={id}>
                                    <div className="destImage">
                                        <img src={imgSrc} alt="images" />
                                        {/* <span className="discount">
                                30% off
                            </span> */}
                                    </div>
                                    <div className="offerBody">
                                        <div className="price flex">
                                            <h4>
                                               {price}
                                            </h4>
                                            <span className="status">
                                                Available
                                            </span>
                                        </div>

                                        <div className="amenities flex">
                                            <div className="singleAmenity flex">
                                                <small>Sight seeing</small>
                                            </div>
                                            <div className="singleAmenity flex">
                                                <small>Trekking</small>
                                            </div>
                                            <div className="singleAmenity flex">
                                                <small>Food</small>
                                            </div>
                                        </div>

                                        <div className="location flex">
                                            <MdLocationOn className='icon' />
                                            <small>
                                            {location}
                                            </small>
                                        </div>

                                        <button className='btn flex'>
                                            View Details
                                            <BsArrowRightShort />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </section>
    )
}

export default PopularGuides