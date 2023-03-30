import {Link} from "react-router-dom"

const RecommendedCarousel = ({id}) => {
    return(
        <>
    <h1>Recommended</h1>
    <Link to={`/pages/${id}/Recommended`}>View All</Link>
    <div>Insert RecommendedCarousel</div>
    </>
    )
}

export default RecommendedCarousel