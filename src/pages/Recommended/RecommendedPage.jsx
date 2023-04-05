import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import BookCard from "../../components/BookCard/BookCard";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const theme = createTheme();

const RecommendedPage = ({user}) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        fetch(`/api/books/${user._id}/recommended`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user, navigate])

    const smartAlgo = books.sort(() => 0.5 - Math.random());
    const recommendedBooks = smartAlgo.slice(0,16);

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
        Your Recommended Books
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
            Your Recommended Books
            </Typography>
        )}  
      <Box sx={{ marginTop: 5 }}>
        <Grid container rowSpacing={4} columnSpacing={2} >
          {recommendedBooks.map((book) => (
            <Grid item key={book._id} xs={6} sm={6} md={3} lg={2} xl={1.5}>
                <BookCard book={book}></BookCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
    )
}

export default RecommendedPage