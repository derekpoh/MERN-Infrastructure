import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';


dayjs.extend(utc)

const theme = createTheme(
  {
  breakpoints: {
    values: {
      sm: 700,
      md: 900
    },
  },
});

const HistoryPageCard = ({ bookInfo }) => {
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  
  const { collection, book, loanHistory } = bookInfo;
  const { loanDate, returnDate } = loanHistory;

  return (
    <>
    <ThemeProvider theme={theme}>
      { !isMobile ? (
      <Link to={`/books/${collection._id}`} style={{textDecoration: "none"}}> 
          <Card sx={{ marginLeft: '12%', display: 'flex', alignItems: 'center', mb: 1.5, width:"650px", height:"120px"}}>

      <CardMedia
        component="img"
          sx={{ width: '80px', height: '120px', borderRadius: '3px'}}
        image={collection.image}
        alt={collection.title}
      />
        <Grid container sx={{ p: 6 }} spacing={2}>
        <Grid item md={11}>
          <Typography variant="subtitle2" color="#595959" sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'15px', marginBottom:'20px'  }}>{collection.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '10px', fontFamily:'poppins', fontSize: '13px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '210px' }}>
            <strong>Loan Date:</strong>{' '} 
            {dayjs(new Date(loanDate)).utc().local().format('DD/MM/YYYY')}
          </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily:'poppins', fontSize: '13px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '250px' }}>
              <strong>Return Date:</strong> {' '}
            {returnDate
              ? <span>{dayjs(new Date(returnDate)).utc().local().format('DD/MM/YYYY')}</span>
              : <span style={{ color: "#f49b36", fontWeight:'bold' }}>Not yet returned</span>}
          </Typography>
        </Grid>
      </Grid>

    </Card>
    </Link>

    ) : (

      <Link to={`/books/${collection._id}`} style={{textDecoration: "none"}}> 
      <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, width:"345px", height:"120px"}}>

      <CardMedia
        component="img"
        sx={{ width: 100, height: '100%', borderRadius: '2px' }}
        image={collection.image}
        alt={collection.title}
      />
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={10} md={11}>
          <Typography variant="subtitle2" color="#595959" sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'15px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '210px', marginBottom: '25px' }}>{collection.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily:'poppins', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '210px', marginBottom: '10px' }}>
            <strong>Loan Date:</strong>{' '}
            {dayjs(new Date(loanDate)).utc().local().format('DD/MM/YYYY')}
          </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily:'poppins', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '250px' }}>
            <strong>Return Date:</strong>{' '}
            {returnDate
              ? <span>{dayjs(new Date(returnDate)).utc().local().format('DD/MM/YYYY')}</span>
              : <span style={{ color: "#f49b36", fontWeight:'bold' }}>Not yet returned</span>}
          </Typography>
        </Grid>
      </Grid>

    </Card>
    </Link>

  )}
  </ThemeProvider>
  </>       
  )
};

export default HistoryPageCard;
