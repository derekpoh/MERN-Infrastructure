import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker"
import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Container, Box} from "@mui/system";
import { Typography, Button } from "@mui/material";
import ReminderConfirmation from "../../components/ReminderConfirmation/ReminderConfirmation";




const currentDate = dayjs(new Date());                                      //add 1 month to current date
const maxDate = currentDate.add(1, "month");


const SetReminderPage = ({book, user}) => {

    const [reminder, setReminder] = useState(currentDate);
    const [error, setError] = useState(null);
    const { bookId } = useParams();

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
            body: JSON.stringify({reminder, user, bookId}),
        });
        console.log(reminder)
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
            paddingTop: theme => theme.spacing(2),
          }}
        >
                    <img src="/favicon.png" alt="Logo" width="80" />
          <Typography component="h1" variant="h6" align="center" sx={{marginBottom:3}}>
            Set A Reminder
          </Typography>
          <Typography variant="body2" align="center" sx={{marginBottom:3}}>
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
        {/* <ReminderConfirmation book={book} handleReminder={handleReminder}></ReminderConfirmation> */}

        </Box>
      </Container>
    )
}

export default SetReminderPage