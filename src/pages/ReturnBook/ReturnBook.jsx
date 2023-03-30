import { Link } from "react-router-dom";

const ReturnBook = ({book, id}) => {
    return (
        <>
        <h1>Return Book</h1> <br/>
        <h2>Proceed to return?</h2>
        <h2>You are about to return {book} </h2>
        <Link to={`/books/${id}/return`}>
        <button>Borrow</button>
        </Link>
        <Link to={`/books/${id}`}>
        <button>Cancel</button>
        </Link>
        </>
    )
}

export default ReturnBook