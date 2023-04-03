import { useState, useEffect } from "react";
import LoansPageCard from "./LoansPageCard";


const LoansPage = ({user}) => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/loans/${user._id}`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user._id])

return(
    <div>
        {
            books.map((book) => 
                <LoansPageCard book={book} key={book._id} />
            )
        }
    </div>
)}


export default LoansPage