import { Link } from "react-router-dom";

const UserAccountPage = ({id}) => {
    return (
        <>
        <Link to={`/pages/${id}/Loans`}>
        <button>Loans</button>
        </Link>
        <Link to={`/pages/${id}/Favourites`}>
        <button>Favourites</button>
        </Link>
        <Link to={`/pages/${id}/History`}>
        <button>History</button>
        </Link>
        </>
    )
}

export default UserAccountPage