import { useState, useEffect } from "react";
import LoansPageCard from "./LoansPageCard";
import { Container, Typography, Grid } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(
  {
  breakpoints: {
    values: {
      sm: 600,
      md: 900
    },
  },
});

const LoansPage = ({user}) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/loans/${user._id}`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user._id])

return(
  <><ThemeProvider theme={theme}>

  { !isMobile ? (
    <Container maxWidth="md" sx={{ paddingTop: 8 }}>
    <Typography variant="h4" align="center" sx={{ left: 0, textTransform: 'uppercase',
          textAlign: 'center',
          letterSpacing: '0.1em',
          color: '#0065CC',
          marginBottom: '1.5em',
          textShadow: '1px 1px #eee'}}>Your Loans</Typography>
          {books.length === 0 ? (<h4>You have no borrowed books at the moment</h4>):(
    <Grid container spacing={10}>
      <Grid item md={12}>
        <Typography variant="h5" sx={{ marginLeft: '12%', marginBottom: 3, fontSize: "22px", fontFamily: "roboto", color:"#CB0000", textTransform:'uppercase', textDecoration: 'underline' }}>On Loan</Typography>

        {books.map((book) => 
          <LoansPageCard book={book} key={book._id} />
        )}

      </Grid>
  </Grid>)}
  </Container>

    ) : (
    <Container maxWidth="sm" sx={{ paddingTop: 4 }}>
    <Typography variant="h4" align="center" sx={{ left: 0, textTransform: 'uppercase',
        
          textAlign: 'center',
          letterSpacing: '0.1em',
          color: '#0065CC',
          marginBottom: '1.5em',
          textShadow: '1px 1px #eee', fontSize: "30px"}}>Your Loans</Typography>
          {books.length === 0 ? (<h4>You have no borrowed books at the moment</h4>):(
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontSize: "17px", fontFamily: "roboto", color:"#CB0000", textDecoration: 'underline', textTransform: 'uppercase'}}>On Loan:</Typography>

        {books.map((book) => 
          <LoansPageCard book={book} key={book._id} />
        )}

      </Grid>
  </Grid>)}
  </Container>

  )}

  </ThemeProvider> 

</>
)}


export default LoansPage