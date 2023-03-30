import { Link } from "react-router-dom";

const BorrowBook = ({book, id}) => {
    return (
        <>
        <h1>Borrow Book</h1> <br/>
        <h2>Proceed to borrow?</h2>
        <h2>You are about to borrow {book} </h2>
        <Link to={`/books/${id}/borrow`}>
        <button>Borrow</button>
        </Link>
        <Link to={`/books/${id}`}>
        <button>Cancel</button>
        </Link>
        </>
    )
}

export default BorrowBook