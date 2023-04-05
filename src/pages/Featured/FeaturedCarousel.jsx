import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Carousel from "../../components/Carousel/Carousel"

const FeaturedCarousel = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("/api/books")
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [])
    
    return(
        <>
    <div className="title">
    <h2 >Featured</h2>
    <h4><Link to="/books/featured" 
    style={{textDecoration: "underline", color:"#0091ff"} }   
    >View All</Link></h4>
    </div>
    <div><Carousel books={books}/></div>
    </>
    )
}

export default FeaturedCarousel