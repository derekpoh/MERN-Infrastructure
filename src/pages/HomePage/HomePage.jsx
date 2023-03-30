import LoansCarousel from "../Loans/LoansCarousel"
import RecommendedCarousel from "../Recommended/RecommendedCarousel"
import GenresCarousel from "../Genres/GenresCarousel"
import FeaturedCarousel from "../Featured/FeaturedCarousel"

const HomePage = ({user}) => {

    return(
        <>
        {user ? <LoansCarousel /> : ""} <br/>
        {user ? <RecommendedCarousel /> : <FeaturedCarousel />} <br/>
        <GenresCarousel />
        </>
    )
}

export default HomePage