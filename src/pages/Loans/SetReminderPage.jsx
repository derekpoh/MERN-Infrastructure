import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker"
import { useState, useMemo } from "react";
import dayjs from "dayjs";


const currentDate = dayjs(new Date());                                      //add 1 month to current date
const maxDate = currentDate.add(1, "month");


const SetReminderPage = () => {

    const [reminder, setReminder] = useState(currentDate);
    const [error, setError] = useState(null);

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
            body: JSON.stringify({reminder}),
        });
        console.log(reminder)
        return console.log (await response.json())
    }


    return (
        <div>
        <h1>Pick a date and time</h1>
        <DateTimePicker 
        disablePast
        views={['year', 'month', 'day', 'hours', 'minutes']}
        value={reminder} 
        onChange={(newValue) => setReminder(newValue)} 
        onError={(newError) => setError(newError)}
        slotProps={{
            textField: {
              helperText: errorMessage,
            },
          }}
          maxDate={dayjs(maxDate)}
        /> 
        <br/><br/>
        <button onClick={handleReminder}>Set Reminder</button>
        </div>
    )
}

export default SetReminderPage