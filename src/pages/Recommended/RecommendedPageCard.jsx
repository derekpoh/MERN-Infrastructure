import {Link} from "react-router-dom"

const RecommendedPageCard = ({book}) => {
    
    return(
        <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
        <div>
            <h1>{book.title}</h1>
            <h2>Author: {book.author.name}</h2>
            <h3>Genre: {book.genre}</h3>
            <p>{book.description}</p>
        </div>
        </Link>
    )
}

export default RecommendedPageCard