import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import BookCard from "../../components/BookCard/BookCard";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const theme = createTheme();

const FeaturedPage = () => {
    const [books, setBooks] = useState([]);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        fetch("/api/books")
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [])

    const smartAlgo = books.sort(() => 0.5 - Math.random());
    const featuredBooks = smartAlgo.slice(0,16);
    
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
        Featured Books
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
            Featured Books
            </Typography>
        )}  
      <Box sx={{ marginTop: 5 }}>
        <Grid container rowSpacing={4} columnSpacing={2} >
          {featuredBooks.map((book) => (
            <Grid item key={book._id} xs={6} sm={6} md={3} lg={2.5} xl={2}>
                <BookCard book={book}></BookCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
    )
}

export default FeaturedPage