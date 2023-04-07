import { Image } from 'pure-react-carousel';
import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Carousel.css"

dayjs.extend(utc)
const EVERYDAY = 86400000


const CarouselCard = ({book}) => {

    const [dueDays, setDueDays] = useState(dayjs(book?.dueDate).diff(dayjs(new Date()), "day"));

    useEffect(() => {
      const interval = setInterval(() => {
        const daysDue = dayjs(book.dueDate).diff(dayjs(new Date()),"day");
        setDueDays(daysDue);
      }, EVERYDAY);
  
      return () => clearInterval(interval);
    }, [book.dueDate]);

    return (
    <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
    <div>
    <div>
    <Image className='image' src={`${book.image}`} />  
    </div>
    <div>
      <h2 className='carousel-text'>{book.title}</h2>
        <p className='carousel-author' style={{ color: book.dueDays ? '#f49b36' : 'inherit' }}>
          {book.dueDays ? `Due in ${book.dueDays} days` : book.author.name}
        </p>
    </div>
    </div>
    </Link>
)
}


export default CarouselCard