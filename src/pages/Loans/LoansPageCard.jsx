import {Link} from "react-router-dom"

const LoansPageCard = ({book}) => {

    return(
        <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
        <div>
            <h1>{book.title}</h1>
            <h2>Author: {book.author.name}</h2>
            <h3>Genre: {book.genre}</h3>
            <p>Due in {book.dueDays} days</p>
            <p>{book.description}</p>
        </div>
        </Link>
    )
}

export default LoansPageCard