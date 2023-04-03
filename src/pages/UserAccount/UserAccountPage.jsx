import { Link } from "react-router-dom";

const UserAccountPage = ({id}) => {
    return (
        <>
        <Link to={"/users/account/preferences"}>
        <button>Preferences</button>
        </Link>
        <Link to={`/users/account/loans`}>
        <button>Loans</button>
        </Link>
        <Link to={`/users/account/favourites`}>
        <button>Favourites</button>
        </Link>
        <Link to={`/pages/${id}/History`}>
        <button>History</button>
        </Link>
        </>
    )
}

export default UserAccountPage