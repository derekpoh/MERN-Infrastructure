import { CarouselProvider, Slider, Slide} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { genres } from "../CarouselPictures/GenresCarouselPictures"
import GenresCarouselCard from "./GenresCarouselCard"

const GenresCarousel = () => {

    let visibleSlides = 5;
    let naturalSlideHeight = 130;
    let naturalSlideWidth = 80;
    if (window.innerWidth <= 600) {
        visibleSlides = 3;
        naturalSlideHeight=150;
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