import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import './BookDetails.css';
import BorrowConfirmation from "../../components/BorrowConfirmation/BorrowConfirmation";
import ReturnConfirmation from "../../components/ReturnConfirmation/ReturnConfirmation";
import { Container, Box, Typography, Button, TextField, Grid } from '@mui/material';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  100: '#eaeef2',
  300: '#afb8c1',
  900: '#24292f',
};

const CustomButton = styled(ButtonUnstyled)(
  ({ theme, disabled }) => `
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 0.7rem;
  background-color: ${blue[500]};
  padding: 10px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 50px ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
  text-decoration: none;

  &:hover {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  `,
);

const BookDetails = ({user}) => {

  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
      const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        const book = await response.json();
        setBook(book);
      const borrowedBook = book.books.find(b=>b.loanHistory.find(u=>u.loanUser?.toString()===user?._id && !u.returnDate))
      setIsBorrowed(!!borrowedBook)
      } catch (err) {
        console.error(err);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const checkFavourite = async () => {
      try {
        const response = await fetch('/api/users/account/favourites');
        const favourites = await response.json();
        setIsFavourite(favourites.includes(id));
      } catch (err) {
        console.error(err);
      }
    };
    checkFavourite();
  }, [id]);

  const handleFavouriteClick = async () => {
    try {
      const method = isFavourite ? 'DELETE' : 'POST';
      await fetch(`/api/users/favourites/${id}`, { method });
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.error(err);
    }
  };
    const publishedDate = new Date(book.publishDate);
    const formattedDate = `${publishedDate.getDate()} ${publishedDate.toLocaleString('default', { month: 'short' })} ${publishedDate.getFullYear()}`;
    
    const handleBorrow = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch(`/api/books/${id}/borrow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const fetchBook = async () => {
            const response = await fetch(`/api/books/${id}`);
            const book = await response.json();
            setBook(book);
            const borrowedBook = book.books.find(b=>b.loanHistory.find(u=>u.loanUser.toString()===user?._id && !u.returnDate))
            setIsBorrowed(!!borrowedBook);
          };
          fetchBook();
          console.log("borrow ok!")
        } else {
          throw new Error("Failed to borrow book");
        }
      } catch (error) {
        console.error(error);
      }
    }

    const handleReturn = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch(`/api/books/${id}/return`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const fetchBook = async () => {
            const response = await fetch(`/api/books/${id}`);
            const book = await response.json();
            setBook(book);
            const borrowedBook = book.books.find(b=>b.loanHistory.some(u=>u.loanUser.toString()===user?._id && !u.returnDate))
            setIsBorrowed(!!borrowedBook);
          };
          fetchBook();
          console.log("return ok!")
        } else {
          throw new Error("Failed to return book");
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
    <>
        <div className="aboutBook">About this book</div>
        <img src={book.image} alt="Book cover image" style=
          {{
            display: 'block',
            margin: 'auto',
            maxWidth: '250px',
            maxHeight: '350px',
          }}
        />
        <div className="aboutTitle">{book.title}</div>
        <div className="aboutAuthor">
          <span className="authorName">{book?.author?.name}</span>
              <IconButton
                size="large"
                aria-label="your favourites"
                color='inherit'
                title="Add Book to Your Favourites List"
                onClick={handleFavouriteClick}
              >
                  {isFavourite ? (
                  <>
                  <FavoriteIcon color='error' />
                  <span className="addedText">Added!</span></>
                  ) : <FavoriteBorderIcon color='inherit' />}
              </IconButton>
        </div>
    <hr style={{width: '65%'}} />
    <div className="borrow">   
      <h3 className="e-copies">E-Copies Available: {book?.books?.filter(b=>b.loanStatus==="Available").length}/{book?.books?.length}</h3> 

        { !user ? (
          <></>
        ) : (
          <Stack spacing={2} direction="row">
            { book?.books?.filter(b=>b.loanStatus==="Available").length === 0 ? (
              <>
                <CustomButton disabled>Borrow</CustomButton>
              </>
            ) : isBorrowed ? (
              <>
              <ReturnConfirmation book={book} handleReturn={handleReturn}/>
              </>
            ) : (
              <>
              <BorrowConfirmation book={book} handleBorrow={handleBorrow}/>
              </>
            )}
          </Stack>     
        )}
     </div>








































    <hr style={{width: '65%'}} />

        <div className="summary">
          <h3>Summary</h3>
          {book.description} <p/>
        </div>
    <hr style={{width: '65%'}} />

        <div className="summary">
          <h3>Details</h3>
          Publisher: {book.publisher}<p/>
          Published: {formattedDate}<p/>
          Language: {book.language}<p/>
          ISBN: {book.isbn}<p/>
          Category: {book.category}<p/>
          Genre: {book?.genre?.join(', ')}<p/>
        </div>
    <hr style={{width: '65%'}} />
    <p/><p/>    
    </>
    )
}

export default BookDetails;  






















    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    














    <div className="borrow">   
      <h3>E-Copies Available: {book?.books?.length}</h3> 
        <Link to={`/books/${id}/borrow`}>
          <Stack spacing={2} direction="row">
            <CustomButton>Borrow</CustomButton>
          </Stack>
        </Link>          
    </div> 

    <hr style={{width: '65%'}} />

        <div className="summary">
          <h3>Summary</h3>
          {book.description} <p/>
        </div>

    <hr style={{width: '65%'}} />

        <div className="summary">
          <h3>Details</h3>
          Publisher: {book.publisher}<p/>
          Published: {formattedDate}<p/>
          Language: {book.language}<p/>
          ISBN: {book.isbn}<p/>
          Category: {book.category}<p/>
          Genre: {book?.genre?.join(', ')}<p/>
        </div>
    <hr style={{width: '65%'}} />
    <p/><p/>    
    </>
    )
}

export default BookDetails;  






















    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
