import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Card, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";

dayjs.extend(utc)


const HistoryPageCard = ({ bookInfo }) => {
  const { collection, book, loanHistory } = bookInfo;
  const { loanDate, returnDate } = loanHistory;

  return (
    <Link to={`/books/${collection._id}`} style={{textDecoration: "none"}}> 
    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, width:"345px", height:"120px"}}>

      <CardMedia
        component="img"
        sx={{ width: 80, height: '100%' }}
        image={collection.image}
        alt={collection.title}
      />
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1">{book.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            Loan Date:{' '}
            {dayjs(new Date(loanDate)).utc().local().format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{marginTop:"5px"}}>
            Return Date:{' '}
            {returnDate
              ? dayjs(new Date(returnDate)).utc().local().format('DD/MM/YYYY')
              : 'Not yet returned'}
          </Typography>
        </Grid>
      </Grid>

    </Card>
    </Link>
  );
};

export default HistoryPageCard;
