import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BookDetails = () => {

  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`/api/books/${id}`);
      const book = await response.json();
      setBook(book);
    };
    fetchBook();
  }, [id]);

    return (
        <>
        {book.title}
        {/* <h1>BookDetails</h1> <br/>
        <h2>(Insert Picture)</h2>
        <h2>Book Name</h2>
        <h3>Author:</h3>
        <h3>Copies Available:</h3>
        <Link to={`/books/${id}/borrow`}>
        <button>Borrow</button>
        </Link>
        <Link to={`/books/${id}/return`}>
        <button>Return</button>
        </Link> */}
        </>
    )
}

export default BookDetails;