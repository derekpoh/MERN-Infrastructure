import { useState } from "react";

const LoansPage2 = () => {
    const currentDate = new Date();
    const [reminder, setReminder] = useState("");

    const handleReminder = async () => {
        const response = await fetch("/api/loans/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({reminder}),
        });
        const reply = await response.json()
        console.log(reply)
    }

    return (
        <div>
        <input value={reminder} onChange={(event) => setReminder(event.target.value)} />
        <button onClick={handleReminder}>Set Reminder</button>
        </div>
    )
}

export default LoansPage2