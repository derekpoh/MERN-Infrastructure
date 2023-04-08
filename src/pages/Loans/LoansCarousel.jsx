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
    <h2 style={{ marginTop: '70px' }}>Loans</h2>
    {books.length !== 0 ? (
        <h4 style={{ marginTop: '70px' }}><Link to={"/users/account/loans"}
        style={{textDecoration: "underline", color:"#0091ff"} }   
        >View All</Link></h4>
    ) : (
        <></>
    )}
    </div>
    <div><Carousel books={books}/></div>
    </>
    )
}

export default LoansCarousel