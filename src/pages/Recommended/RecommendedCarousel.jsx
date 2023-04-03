import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Carousel from "../../components/Carousel/Carousel"

const RecommendedCarousel = ({user}) => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/books/${user._id}/recommended`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user._id])

    return(
        <>
    <div className="title">
    <h2>Recommended</h2>
    <h4><Link to={"/books/recommended"}
    style={{textDecoration: "none", color:"blue"} }   
    >View All</Link></h4>
    </div>
    <div><Carousel books={books}/></div>
    </>
    )
}

export default RecommendedCarousel