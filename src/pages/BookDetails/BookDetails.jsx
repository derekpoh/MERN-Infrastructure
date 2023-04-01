import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import './BookDetails.css';

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
  ({ theme }) => `
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
  `,
);

const BookDetails = () => {

  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`/api/books/${id}`);
      const book = await response.json();
      setBook(book);
    };
    fetchBook();
  }, [id]);

      const publishedDate = new Date(book.publishDate);
      const formattedDate = `${publishedDate.getDate()} ${publishedDate.toLocaleString('default', { month: 'short' })} ${publishedDate.getFullYear()}`;
    
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
          <Link to="/users/account/favourites">
              <IconButton
                size="large"
                aria-label="your favourites"
                color="inherit"
                title="Add Book to Your Favourites List"
              >
                <Badge color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </Link>  
        </div>

    <hr style={{width: '65%'}} />

    <div className="borrow">   
      <h3>E-Copies Available: {book?.books?.length} ></h3> 
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
          Genre: {book.genre}<p/>
        </div>

    <p/><p/>    
    </>
    )
}

export default BookDetails;