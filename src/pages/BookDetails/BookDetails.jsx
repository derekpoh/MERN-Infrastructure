import { Link } from "react-router-dom";

const BookDetails = ({id}) => {
    return (
        <>
        <h1>BookDetails</h1> <br/>
        <h2>(Insert Picture)</h2>
        <h2>Book Name</h2>
        <h3>Author:</h3>
        <h3>Copies Available:</h3>
        <Link to={`/books/${id}/borrow`}>
        <button>Borrow</button>
        </Link>
        <Link to={`/books/${id}/return`}>
        <button>Return</button>
        </Link>
        </>
    )
}

export default BookDetails