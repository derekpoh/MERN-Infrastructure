import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

const HistoryPageCard = ({bookInfo}) => {

    const {collection, book, loanHistory} = bookInfo
    const {loanDate, returnDate}= loanHistory

    

    return(
        <div>
            <h1>{collection.title}</h1>
            <h2>
                Loan Date: {
            dayjs(new Date(loanDate)).utc().local().format('DD/MM/YYYY, H:mm')
            }
            </h2>
            <h2>
                Return Date: { returnDate ?
            dayjs(new Date(returnDate)).utc().local().format('DD/MM/YYYY, H:mm')
            : null }
            </h2>
            <h2></h2>
        </div>
    )
}

export default HistoryPageCard