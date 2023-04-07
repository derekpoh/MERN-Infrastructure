import { useState, useEffect } from "react";
import LoansPageCard from "./LoansPageCard";
import { Container, Typography, Grid } from "@mui/material";


const LoansPage = ({user}) => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`/api/loans/${user._id}`)
        .then((response) => response.json())
        .then((data) => setBooks(data))
    }, [user._id])

return(
    <Container maxWidth="md" sx={{ paddingTop: 8 }}>
    <Typography variant="h4" align="center" sx={{ left: 0, textTransform: 'uppercase',
          textAlign: 'center',
          letterSpacing: '0.1em',
          color: '#0065CC',
          marginBottom: '2.5em',
          textShadow: '1px 1px #eee', }}>Your Loans</Typography>
          {books.length === 0 ? (<h4>You have no borrowed books at the moment</h4>):(
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontSize: "1.5em", fontFamily: "Poppins", color:"#CB0000" }}>On Loan:</Typography>

        {books.map((book) => 
          <LoansPageCard book={book} key={book._id} />
        )}

      </Grid>
  </Grid>)}
  </Container>

)}


export default LoansPage