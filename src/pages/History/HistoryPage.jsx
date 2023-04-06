import { useState, useEffect } from "react";
import HistoryPageCard from "./HistoryPageCard";

const HistoryPage = ({user}) => {

    const [books, setBooks] = useState({
        returned: [],
        unReturned: [],
      });

    useEffect(() => {
        fetch(`/api/loans/${user._id}/history`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user._id])

    const { returned, unReturned } = books

    returned.sort((a,b) => 
    new Date(b.loanHistory.loanDate) - new Date(a.loanHistory.loanDate)
    )

    unReturned.sort((a,b) => 
    new Date(b.loanHistory.loanDate) - new Date(a.loanHistory.loanDate)
    )

    return (
        <>
        <div>
        <h1>On Loan:</h1>
    {
        unReturned.map((bookInfo, index) => 
            <HistoryPageCard bookInfo={bookInfo} key={index} />
        )
    }
</div>
        <div>
            <h1>Returned:</h1>
        {
            returned.map((bookInfo, index) => 
                <HistoryPageCard bookInfo={bookInfo} key={index} />
            )
        }
    </div>
    </>
    )
}

export default HistoryPage