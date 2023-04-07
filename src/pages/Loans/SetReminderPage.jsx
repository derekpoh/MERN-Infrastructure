import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Container, Box} from "@mui/system";
import { Typography, Button } from "@mui/material";
import ReminderConfirmation from "../../components/ReminderConfirmation/ReminderConfirmation";


const currentDate = dayjs(new Date());                                      //add 1 month to current date
const maxDate = currentDate.add(1, "month");


const SetReminderPage = ({props, user}) => {

    const [reminder, setReminder] = useState(currentDate);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!user || (!location.state)) {
        navigate("/");
        return;
      } 
    }, [user, navigate])
    
    const book = location?.state?.book;
    const errorMessage = useMemo(() => {
        switch (error) {   
            case 'maxDate':
            case 'minDate': {
                return 'Select date/time within one month of borrow date';
            }
          case 'invalidDate': {
            return 'Enter a valid date/time';
          }
          default: {
            return '';
          }
        }
      }, [error]);


    const handleReminder = async () => {
        const response = await fetch("/api/loans/setreminder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({reminder, user, book}),
        });
        return console.log (await response.json())
    }


    return (
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "flex-start",
            minHeight: '100vh',
            paddingTop: theme => theme.spacing(4),
          }}
        >
          <img src="/favicon.png" alt="Logo" width="80" />
          <Typography component="h1" variant="h5" align="center" sx={{marginBottom:3, marginTop:1}}>
            Set A Reminder
          </Typography>
          <Typography variant="h6" align="center" sx={{marginBottom:6}}>
            for "{book?.title}"
          </Typography>
          <Typography variant="body2" align="center" sx={{marginBottom:2}}>
            Click to choose a date
          </Typography>
        <DateTimePicker 
        disablePast
        views={['year', 'month', 'day', 'hours', 'minutes']}
        value={reminder} 
        onChange={(newValue) => setReminder(newValue)} 
        onError={(newError) => setError(newError)}
        slotProps={{
            textField: {
              helperText: errorMessage
            },
          }}
          maxDate={dayjs(maxDate)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '75%', marginTop: 7 }}>
          <ReminderConfirmation book={book} handleReminder={handleReminder}></ReminderConfirmation>
          <Button
            component={Link}
            to={`/books/${book?._id}`}
            color="primary"
            variant="outlined"
            size="large"
          >
            Back
          </Button>
          </Box>
        </Box>
      </Container>
    )
}

export default SetReminderPage