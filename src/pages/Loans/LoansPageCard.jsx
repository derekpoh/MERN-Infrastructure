import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
const EVERYDAY = 86400000


const LoansPageCard = ({book}) => {

    const [dueDays, setDueDays] = useState(dayjs(book.dueDate).diff(dayjs(new Date()), "day"));

    useEffect(() => {
      const interval = setInterval(() => {
        const daysDue = dayjs(book.dueDate).diff(dayjs(new Date()),"day");
        setDueDays(daysDue);
      }, EVERYDAY);
  
      return () => clearInterval(interval);
    }, [book.dueDate]);


    return(
        <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
        <div>
            <h1>{book.title}</h1>
            <h2>Author: {book.author.name}</h2>
            <h3>Genre: {book.genre}</h3>
            <p>Due in {dueDays} days</p>
            <p>{book.description}</p>
        </div>
        </Link>
    )
}

export default LoansPageCard



