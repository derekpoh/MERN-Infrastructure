import React from 'react';
import './HomePageCarousel.css'

const HomePageCarousel = () => {
  const images = [
    "https://media.timeout.com/images/105623343/image.jpg",
    // "https://cdn.indesignlive.com/idlsg/wp-content/uploads/2017/11/web_GC_BPPL_ADULTS_CENTER-DISPLAY-01-1.jpg",
    // "https://www.nlb.gov.sg/main/-/media/NLBMedia/Images/Visit-Us/Libraries/CCKPL/Library-Images/Choa-Chu-Kang-Public-Library-Supplementary-Images-2-Story-Circle.jpeg",
  ];

  return (
            <div className="each-slide">
            <div>
                <img src={images[0]} />
            </div>
            <span className="image-caption">Credit: Unsplash/Fahrul Azmi</span>
            <p><img className="nlb-logo" src="https://i.ibb.co/KqcnGH7/nlblogo.jpg"></img>
            </p>
            </div>

  );
};

export default HomePageCarousel;






