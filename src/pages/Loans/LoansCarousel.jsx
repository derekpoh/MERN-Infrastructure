import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Carousel from "../../components/Carousel/Carousel"

const LoansCarousel = ({user}) => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/books/${user._id}/loans`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user._id])

    return(
    <>
    <div className="title">
    <h2>Loans</h2>
    <h4><Link to={"/users/account/loans"}>View All</Link></h4>
    </div>
    <div><Carousel books={books}/></div>
    </>
    )
}

export default LoansCarousel