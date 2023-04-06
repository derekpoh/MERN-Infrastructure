import React from 'react';
import CarouselCard from './CarouselCard';
import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const Carousel = ({books}) => {

    let visibleSlides = 8;
    let naturalSlideHeight = 120;
    let naturalSlideWidth = 80;
    if (window.innerWidth <= 1100) {
        visibleSlides = 3;
        naturalSlideHeight=130;
        naturalSlideWidth=80;

    } else if (window.innerWidth <= 1500) {
      visibleSlides = 4;
      naturalSlideHeight=130;
      naturalSlideWidth=80;
    } else if (window.innerWidth <= 1920) {
      visibleSlides = 5;
      naturalSlideHeight=110;
      naturalSlideWidth=80;
    } else if (window.innerWidth <= 2260) {
      visibleSlides = 6;
      naturalSlideHeight=130;
      naturalSlideWidth=80;
    } else {
      visibleSlides = 8;
      naturalSlideHeight=130;
      naturalSlideWidth=80;
    }


    return(  
      <>
      {books.length === 0 ? <h4>No books at the moment</h4> : ""}

        <CarouselProvider 
        naturalSlideWidth={naturalSlideWidth}
        naturalSlideHeight={naturalSlideHeight}
        totalSlides={books.length}
        visibleSlides={visibleSlides}
      >   
        <Slider>
           {books.map((book, index) =>
          <Slide key={index} >
          <CarouselCard book={book} key={book._id} />
          
          </Slide>
          )} 
        </Slider>

      </CarouselProvider>
      </>
        )
}

export default Carousel

