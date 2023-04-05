import { useState, useEffect } from "react";
import RecommendedPageCard from "./RecommendedPageCard";

const RecommendedPage = ({user}) => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/books/${user._id}/recommended`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user._id])

    return (
        <div>
        {
            books.map((book) => 

                <RecommendedPageCard book={book} key={book._id}/>
               
            )
        }
    </div>
    )
}

export default RecommendedPage