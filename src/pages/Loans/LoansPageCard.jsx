import {Link} from "react-router-dom"
import { useState, useEffect } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Card, CardMedia, Grid, Typography } from "@mui/material"

dayjs.extend(utc)
const EVERYDAY = 86400000


const LoansPageCard = ({book}) => {

    const [dueDays, setDueDays] = useState(dayjs(book.dueDate).diff(dayjs(new Date()), "day"));

    useEffect(() => {
      const interval = setInterval(() => {
        const daysDue = dayjs(book.dueDate).diff(dayjs(new Date()),"day");
        setDueDays(daysDue);
      }, EVERYDAY);
  
      return () => clearInterval(interval);
    }, [book.dueDate]);


    return(
        <Link to={`/books/${book._id}`} style={{textDecoration: "none", color:"black"} }  >
          <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, width:"345px", height:"120px"}}>

          <CardMedia
            component="img"
            sx={{ width: 80, height: '100%' }}
            image={book.image}
            alt={book.title}
          />
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle1">{book.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{marginTop:"5px"}}>
                Due in {dueDays} days
                </Typography>
            </Grid>
          </Grid>
  

          </Card>

        </Link>
    )
}

export default LoansPageCard



