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
        <p/>
        {book.title}<p/>
        <img src={book.image} alt="Book cover image" /><p/>
        {book.description} <p/>
        {book.category} <p/>
        {book.genre}, {book.language}, {book.isbn} <p/>
        {book.publishDate} by {book.publisher}<p/>
        {book?.author?.name}    
      <p/>

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

export default BookDetails;