import { useState, useEffect } from "react";
import HistoryPageCard from "./HistoryPageCard";
import { Container, Grid, Typography } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const theme = createTheme(
  {
  breakpoints: {
    values: {
      sm: 600,
      md: 900
    },
  },
});

const HistoryPage = ({user}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [books, setBooks] = useState({
    returned: [],
    unReturned: [],
  });

  useEffect(() => {
      if (!user) {
        navigate("/");
        return;
        }  
    fetch(`/api/loans/${user._id}/history`)
      .then((response) => response.json())
      .then((data) => setBooks(data))
  }, [user, navigate])

  const { returned, unReturned } = books;
  const sortedUnReturned = unReturned.sort((a, b) => new Date(a.loanHistory.loanDate) - new Date(b.loanHistory.loanDate));
  const sortedReturned = returned.sort((a, b) => new Date(b.loanHistory.loanDate) - new Date(a.loanHistory.loanDate));


  return (
    <><ThemeProvider theme={theme}>

    { !isMobile ? (
    <Container maxWidth="md" sx={{ paddingTop: 8 }}>
    <Typography variant="h4" align="center" sx={{ left: 0, textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#0065CC',
            marginBottom: '1.5em',
            textShadow: '1px 1px #eee'}}>Loan History</Typography>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ marginLeft: '12%', marginBottom: 3, fontSize: "22px", fontFamily: "roboto", color:"#CB0000", textTransform:'uppercase', textDecoration: 'underline' }}>On Loan</Typography>

        {sortedUnReturned.length > 0 ? (
          sortedUnReturned.map((bookInfo, index) => 
        <HistoryPageCard bookInfo={bookInfo} key={index} />
        )
      ) : (
      <Typography variant="body1" sx={{ marginLeft: '12%', marginTop: '20px', marginBottom: '50px', fontSize: '15px', fontFamily:'Poppins', width:"500px" }}>You have no borrowed books at the moment.</Typography>
      )}

        </Grid>
    </Grid>
    <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ marginLeft: '12%', marginTop: 2, marginBottom: 2, fontSize: "22px", fontFamily: "roboto", color:"#0000ff", textTransform:'uppercase', textDecoration: 'underline' }}>Returned:</Typography>
          {sortedReturned.map((bookInfo, index) => 
            <HistoryPageCard bookInfo={bookInfo} key={index} />
          )}
        </Grid>
      </Grid>
    </Container>

    ) : (

      <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" align="center" sx={{ left: 0, textTransform: 'uppercase',
            textAlign: 'center',
            letterSpacing: '0.1em',
            color: '#0065CC',
            marginBottom: '2.5em',
            textShadow: '1px 1px #eee', fontSize: '30px' }}>Loan History</Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ marginTop: -3, marginBottom: 2, fontSize: "16px", fontFamily: "roboto", color:"#CB0000", textDecoration: 'underline', textTransform: 'uppercase'}}>On Loan:</Typography>

        {sortedUnReturned.length > 0 ? (
          sortedUnReturned.map((bookInfo, index) => 
        <HistoryPageCard bookInfo={bookInfo} key={index} />
        )
      ) : (
      <Typography variant="body1" sx={{ marginTop: '20px', marginBottom: '20px', fontSize: '13px', fontFamily:'Poppins' }}>You have no borrowed books at the moment.</Typography>
      )}

        </Grid>
    </Grid>
    <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ marginTop: 2, marginBottom: 2, fontSize: "17px", fontFamily: "roboto", color:"#0000ff", textDecoration: 'underline', textTransform: 'uppercase'}}>Returned:</Typography>
         
          {sortedReturned.map((bookInfo, index) => 
            <HistoryPageCard bookInfo={bookInfo} key={index} />
          )}
        </Grid>
      </Grid>
    </Container>
    )}
  </ThemeProvider></>  
  );
}

export default HistoryPage;
