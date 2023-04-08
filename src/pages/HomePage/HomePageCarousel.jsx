import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useMediaQuery } from "@mui/material";


const images = [
  {
    src: "https://media.timeout.com/images/105623343/image.jpg",
    alt: "Image 1",
  },
  {
    src: "https://cdn.indesignlive.com/idlsg/wp-content/uploads/2017/11/web_GC_BPPL_ADULTS_CENTER-DISPLAY-01-1.jpg",
    alt: "Image 2",
  },
  {
    src: "https://www.nlb.gov.sg/main/-/media/NLBMedia/Images/Visit-Us/Libraries/CCKPL/Library-Images/Choa-Chu-Kang-Public-Library-Supplementary-Images-2-Story-Circle.jpeg",
    alt: "Image 3",
  },
];


const HomePageCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)"); 

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === images.length - 1 ? 0 : prevActiveStep + 1
    );
  };

  return (
    <Carousel
      autoPlay={true}
      animation="fade"
      timeout={20000}
      navButtonsAlwaysVisible={true}
      next={handleNext}
      activeStep={activeStep}
      sx={{height: isMobile? "250px" : "400px", width:"100%"}}
      className="homePageCarousel"

    >
      {images.map((image, index) => (

          <img key={index} src={image.src} alt={image.alt} style={{objectFit:"cover", width:"100%", maxHeight:"400px"}} />

      ))}
    </Carousel>
  );
};

export default HomePageCarousel;

