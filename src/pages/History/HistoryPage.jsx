import { useState, useEffect } from "react";
import HistoryPageCard from "./HistoryPageCard";
import { Container, Grid, Typography } from "@mui/material";

const HistoryPage = ({user}) => {

  const [books, setBooks] = useState({
    returned: [],
    unReturned: [],
  });

  useEffect(() => {
    fetch(`/api/loans/${user._id}/history`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
  }, [user._id])

  const { returned, unReturned } = books;
  const sortedUnReturned = unReturned.sort((a, b) => new Date(a.loanHistory.loanDate) - new Date(b.loanHistory.loanDate));
  const sortedReturned = returned.sort((a, b) => new Date(b.loanHistory.loanDate) - new Date(a.loanHistory.loanDate));


  return (
    <Container maxWidth="md" sx={{ paddingTop: 8 }}>
      <Typography variant="h4" align="center" sx={{ left: 0, textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#0065CC',
            marginBottom: '2.5em',
            textShadow: '1px 1px #eee', }}>Loan History</Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ marginBottom: 2, fontSize: "1.5em", fontFamily: "Poppins", color:"#CB0000" }}>On Loan:</Typography>

          {sortedUnReturned.map((bookInfo, index) => 
            <HistoryPageCard bookInfo={bookInfo} key={index} />
          )}

        </Grid>
    </Grid>
    <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 2, fontSize: "1.5em", fontFamily: "Poppins", color:"#0000ff" }}>Returned:</Typography>
          {sortedReturned.map((bookInfo, index) => 
            <HistoryPageCard bookInfo={bookInfo} key={index} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default HistoryPage;
