import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Card, CardMedia, Grid, Typography } from "@mui/material"
import { useMediaQuery } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(
  {
  breakpoints: {
    values: {
      sm: 700,
      md: 900
    },
  },
});


dayjs.extend(utc)
const EVERYDAY = 86400000


const LoansPageCard = ({book}) => {
    
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  
    const [dueDays, setDueDays] = useState(dayjs(book.dueDate).diff(dayjs(new Date()), "day"));

    useEffect(() => {
      const interval = setInterval(() => {
        const daysDue = dayjs(book.dueDate).diff(dayjs(new Date()),"day");
        setDueDays(daysDue);
      }, EVERYDAY);
  
      return () => clearInterval(interval);
    }, [book.dueDate]);


    return(
      <>
      <ThemeProvider theme={theme}>
        { !isMobile ? (
        <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
          <Card sx={{ marginLeft: '12%', display: 'flex', alignItems: 'center', mb: 3, width:"650px", height:"250px"}}>

          <CardMedia
            component="img"
            sx={{ width: '160px', height: '260px', borderRadius: '3px'}}
            image={book.image}
            alt={book.title}
          />
          <Grid container sx={{ p: 7 }} spacing={2}>
            <Grid item md={11}>
              <Typography variant="subtitle2" color="#595959" sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'18px', marginBottom:'10px'  }}>{book.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily:'poppins', fontSize: '15px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '210px' }}>
                {book.author.name}
              </Typography><br/>
              <Typography variant="body2" color="#f49b36" sx={{ fontFamily:'poppins', fontSize: '15px', fontWeight:'bold', marginTop:"5px"}}>
                Due in {dueDays} days
                </Typography>
            </Grid>
          </Grid>
          </Card>
        </Link>          


        ) : (

        <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
          <Card sx={{ marginLeft: '0px', display: 'flex', alignItems: 'center', mb: 1.5, width:"345px", height:"120px"}}>

          <CardMedia
            component="img"
            sx={{ width: 100, height: '100%', borderRadius: '2px'}}
            image={book.image}
            alt={book.title}
          />
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item xs={10} md={11}>
              <Typography variant="subtitle2" color="#595959" sx={{ fontFamily:'poppins', fontWeight:'bold', fontSize:'13px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '210px' }}>{book.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily:'poppins', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '210px' }}>
                {book.author.name}
              </Typography><br/>
              <Typography variant="body2" color="#f49b36" sx={{ fontFamily:'poppins', fontSize: '13px', fontWeight:'bold', marginTop:"5px"}}>
                Due in {dueDays} days
                </Typography>
            </Grid>
          </Grid>
          </Card>
        </Link>

        )}

     </ThemeProvider>
     </>   
    )
}

export default LoansPageCard



