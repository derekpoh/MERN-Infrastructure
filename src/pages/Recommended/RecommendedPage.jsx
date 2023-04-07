import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import BookCard from "../../components/BookCard/BookCard";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const theme = createTheme(
  {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1000,
      xl: 1380,
      xxl: 1900,
      xxxl: 2200
    },
  },
});

const RecommendedPage = ({user}) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [favourites, setFavourites] = useState(false);
    
    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        fetch(`/api/books/${user._id}/recommended`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user, navigate])

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
    }, [user]);

    const smartAlgo = books.sort(() => 0.5 - Math.random());
    const recommendedBooks = smartAlgo.slice(0,16);

    return (
        <ThemeProvider theme={theme}>
        { !isMobile ? (
        <Typography
        variant="h4"
        sx={{
            marginTop: 8,
            textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#0065CC',
            marginBottom: '4.5em',
            textShadow: '1px 1px #eee',
        }}
        >
        Your Recommended Books
        </Typography>

        ) : (
            <Typography
            variant="h6"
            sx={{
                marginTop: 4,
                textTransform: 'uppercase',
                textAlign: 'center',
                letterSpacing: '0.1em',
                color: '#0065CC',
                marginBottom: '6em',
                textShadow: '1px 1px #eee'
            }}
            >
            Your Recommended Books
            </Typography>
        )}  

      <Box sx={{ marginTop: 15}}>
        <Grid
          container
          rowSpacing={isMobile ? 7 : 16}
          columnSpacing={isMobile ? 0 : 16}
        >

          {recommendedBooks.map((book) => (
            <Grid item key={book._id} xs={6} sm={6} md={4} lg={3} xl={2.2} xxl={2} xxxl={1.5}>
                <BookCard book={book}></BookCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
    )
}

export default RecommendedPage