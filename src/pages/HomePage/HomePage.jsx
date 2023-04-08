import LoansCarousel from "../Loans/LoansCarousel"
import RecommendedCarousel from "../Recommended/RecommendedCarousel"
import GenresCarousel from "../Genres/GenresCarousel"
import FeaturedCarousel from "../Featured/FeaturedCarousel"
import HomePageCarousel from "./HomePageCarousel"

const HomePage = ({user}) => {

    return(
        <>
        <HomePageCarousel />
        {user ? <LoansCarousel user={user} /> : ""} <br/>
        {user ? <RecommendedCarousel user={user} /> : <FeaturedCarousel />} <br/>
        <GenresCarousel />
        
        </>
    )
}

export default HomePage