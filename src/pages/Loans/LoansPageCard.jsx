

const LoansPageCard = ({book}) => {

    return(
        <div>
            <h1>{book.title}</h1>
            <h2>Author: {book.author}</h2>
            <h3>Genre: {book.genre}</h3>
            <p>{book.description}</p>
        </div>
    )
}

export default LoansPageCard