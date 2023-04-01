import { Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Carousel.css"


const CarouselCard = ({book}) => {

    return (
    <div>
    <div>
    <Image className='image' src={`${book.image}`} />  
    </div>
    <div>
    <h2 className='carousel-text'>{book.title}</h2>
    <p className='carousel-text'>{book.author.name}</p>
    </div>
    </div>

)
}

//  <Image tag='div' isBgImage={true} className='image' src={`${book.image}`} >  
// <div className='text'>
// <h2>{book.title}</h2>
// <p>{book.publisher}</p>
// </div>
// </Image> 


export default CarouselCard