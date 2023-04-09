import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { genres } from "../CarouselPictures/GenresCarouselPictures"
import GenresCarouselCard from "./GenresCarouselCard"

const GenresCarousel = () => {

  let visibleSlides = 8;
  let naturalSlideHeight = 120;
  let naturalSlideWidth = 80;
  if (window.innerWidth <= 1100) {
      visibleSlides = 3;
      naturalSlideHeight=130;
      naturalSlideWidth=60;

  } else if (window.innerWidth <= 1500) {
    visibleSlides = 4;
    naturalSlideHeight=130;
    naturalSlideWidth=80;
  } else if (window.innerWidth <= 1920) {
    visibleSlides = 5;
    naturalSlideHeight=130;
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
        <div className="title"><h2>Genres</h2></div>
        
        <CarouselProvider 
        
        naturalSlideWidth={naturalSlideWidth}
        naturalSlideHeight={naturalSlideHeight}
        totalSlides={genres.length}
        visibleSlides={visibleSlides}
      > 
         <Slider>
           {genres.map((genre, index) =>
          <Slide key={index}>
          <GenresCarouselCard genre={genre} key={index} />
          </Slide>
          )} 
        </Slider>
        </CarouselProvider>
        </>
        )
}

export default GenresCarousel