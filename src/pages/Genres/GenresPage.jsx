import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenresPageCard from "./GenresPageCard";

const GenresPage = () => {

    const {genre} = useParams()
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/books/genres/${genre}`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [genre])

    return (
        <div>
            <h1>Books With Genre "{genre}"</h1>
            <br/>
        {
            books.map((book) => 
                <GenresPageCard book={book} key={book._id} />
            )
        }
    </div>
    )
}

export default GenresPage