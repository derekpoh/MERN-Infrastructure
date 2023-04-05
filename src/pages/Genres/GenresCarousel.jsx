import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { genres } from "../CarouselPictures/GenresCarouselPictures"
import GenresCarouselCard from "./GenresCarouselCard"

const GenresCarousel = () => {

    return(
        <>
        <div className="title"><h2>Genres</h2></div>
        
        <CarouselProvider 
        naturalSlideWidth={55}
        naturalSlideHeight={38}
        totalSlides={genres.length}
        visibleSlides={6}
      > 
         <Slider style>
           {genres.map((genre, index) =>
          <Slide key={index} >
          <GenresCarouselCard genre={genre} key={index} />
          </Slide>
          )} 
        </Slider>
        <div className="buttons">
        <ButtonBack className="button">⇽</ButtonBack>
        <ButtonNext className="button">⇾</ButtonNext>
        </div>
        </CarouselProvider>
        </>
        )
}

export default GenresCarousel