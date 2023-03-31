import { useState, useEffect } from "react";
import { Box, Typography, Grid, Chip, Button } from '@mui/material';
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";


export default function Preferences({user, setUser}) {
    const genres = [
        'Romance', 'Mystery', 'Thriller', 'Science', 'Fantasy',
        'Academic', 'Reference', 'Fitness', 'Health', 'Food',
        'Cooking', 'Art', 'Finance', 'Self-Help'
    ];

    const [selectedGenres, setSelectedGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            setSelectedGenres(user.preferredGenres);
        };
        fetchGenres();
    }, []);

    const handleGenreChange = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/users/preferences", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({userId: user._id, preferredGenres: selectedGenres}),
          });
          if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            navigate("/");
          } else {
            throw new Error("Failed to update preferences");
          }
        } catch (error) {
          console.error(error);
        }
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const welcomeMessage = `Welcome, ${capitalize(user.name)}!`;

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
        <Typography variant="h4" sx={{color:"#FD9833", margin: "30px"}}>
            {welcomeMessage}
        </Typography>
        <Typography variant="h6" align="center">
          What are some genres you are interested in?
        </Typography>
        <Grid container spacing={2} sx={{marginTop: "30px"}}>
          {genres.map((genre, index) => (
            <Grid item key={index}>
              <Chip
                label={genre}
                clickable
                color={selectedGenres.includes(genre) ? "primary" : "default"}
                onClick={() => handleGenreChange(genre)}
              />
            </Grid>
          ))}
        </Grid>
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={handleSubmit}
        >
        Save Preferences
        </Button>
        </Box>
        </Container>
    );
  }
