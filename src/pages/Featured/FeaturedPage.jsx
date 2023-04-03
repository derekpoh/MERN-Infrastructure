import { useState, useEffect } from "react";
import FeaturedPageCard from "./FeaturedPageCard";

const FeaturedPage = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("/api/books")
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [])

    return (
        <div>
        {
            books.map((book) => 
                <FeaturedPageCard book={book} key={book._id} />
            )
        }
    </div>
    )
}

export default FeaturedPage