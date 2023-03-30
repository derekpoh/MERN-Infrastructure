import {Link} from "react-router-dom"

const LoansCarousel = ({id}) => {
    return(
    <>
    <h1>Loans</h1>
    <Link to={`/pages/${id}/Loans`}>View All</Link>
    <div>Insert LoansCarousel</div>
    </>
    )
}

export default LoansCarousel