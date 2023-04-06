import { useState, useEffect } from "react";
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

const FavouritesPage = ({user}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [favourites, setFavourites] = useState(false);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`/api/users/${user._id}/favourites`);
        const { showFavBooks } = await response.json();   // { showFavBooks } from showFavourites in user controller
        setFavourites(showFavBooks.favouriteBooks);   // showFavBooks contains everything, .favouriteBooks to access favouriteBook
      } catch (error) {
        console.log('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, [user._id]);  

return (
  <ThemeProvider theme={theme}>
    {!isMobile ? (
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
  Your Favourites
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
      Your Favourites
      </Typography>
  )}  
  { favourites.length > 0 ? (
    
<Box sx={{ marginTop: 15}}>
  <Grid
    container
    rowSpacing={isMobile ? 7 : 16}
    columnSpacing={isMobile ? 0 : 16}
  >


    {favourites.map((book) => (
      <Grid item key={book._id} xs={6} sm={6} md={4} lg={3} xl={2.2} xxl={2} xxxl={1.5}>
          <BookCard book={book} user={user} favourites={favourites}></BookCard>
      </Grid>
    ))}
  </Grid>
</Box>

 ) : (
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
  <img src="/sadcat.png" alt="Sad cat" style={{  width: "50%", height: "auto", marginBottom: '2rem' }} />
  <Typography variant="h6">You have no favourites yet. Add some?</Typography>
</Box>

 )}
</ThemeProvider>
)}


export default FavouritesPage; 



