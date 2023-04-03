import { Image } from 'pure-react-carousel';
import {Link} from "react-router-dom"
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Carousel.css"


const CarouselCard = ({book}) => {

    return (
    <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
    <div>
    <div>
    <Image className='image' src={`${book.image}`} />  
    </div>
    <div>
    <h2 className='carousel-text'>{book.title}</h2>
    <p className='carousel-text'>{book.author.name}</p>
    </div>
    </div>
    </Link>
)
}


export default CarouselCard