import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import BookCard from "../../components/BookCard/BookCard";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const theme = createTheme();

const GenresPage = ({user}) => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [favourites, setFavourites] = useState(false);

  useEffect(() => {
    fetch(`/api/books/genres/${genre}`)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, [genre]);

  useEffect(() => {
    const checkFavourites = async () => {
      if (user) {
      try {
        const response = await fetch(`/api/users/${user._id}/favourites`);
        const favourites = await response.json();
        setFavourites(favourites.showFavBooks.favouriteBooks);
      } catch (err) {
        console.error(err);
      }}
    };
    checkFavourites();
  }, [user, genre]);

  return (
    <ThemeProvider theme={theme}>
        { !isMobile ? (
        <Typography
        variant="h4"
        sx={{
            marginTop: 3,
            textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#0065CC',
            marginBottom: '1.5em',
            textShadow: '1px 1px #eee'
        }}
        >
        Genre: {genre}
        </Typography>

        ) : (
            <Typography
            variant="h6"
            sx={{
                marginTop: 3,
                textTransform: 'uppercase',
                textAlign: 'center',
                letterSpacing: '0.1em',
                color: '#0065CC',
                marginBottom: '1.5em',
                textShadow: '1px 1px #eee'
            }}
            >
            Genre: {genre}
            </Typography>
        )}  
      <Box sx={{ marginTop: 5 }}>
        <Grid container rowSpacing={4} columnSpacing={2} >
          {books.map((book) => (
            <Grid item key={book._id} xs={6} sm={6} md={3.8} lg={3} xl={2}>
                <BookCard book={book} user={user} favourites={favourites}></BookCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default GenresPage;

