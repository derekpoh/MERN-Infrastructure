import LoansCarousel from "../Loans/LoansCarousel"
import RecommendedCarousel from "../Recommended/RecommendedCarousel"
import CategoriesCarousel from "../Categories/CategoriesCarousel"
import FeaturedCarousel from "../Featured/FeaturedCarousel"

const HomePage = ({user}) => {

    return(
        <>
        {user ? <LoansCarousel /> : ""} <br/>
        {user ? <RecommendedCarousel /> : <FeaturedCarousel />} <br/>
        <CategoriesCarousel />
        </>
    )
}

export default HomePage