import { Link, useNavigate } from "react-router-dom";
import { Grid, Button, Container, Box, Typography } from "@mui/material";
import { useEffect } from "react";



const UserAccountPage = ({user}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
    }, [user, navigate])

    return (
        <>
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
          <Typography component="h1" variant="h5" align="center" sx={{marginBottom:7, marginTop:1}}>
            User Account
          </Typography>
        <Grid container rowSpacing={5} align="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
            <Button component={Link}
            to={`/users/account/loans`}
            color="primary"
            variant="contained"
            size="large"
            sx={{ width: "100%"}}
            >Loans</Button>
        </Grid>
        <Grid item xs={6}>
        <Button component={Link}
            to={`/users/account/favourites`}
            color="primary"
            variant="contained"
            size="large"
            sx={{ width: "100%"}}
            >Favourites</Button>
        </Grid>
        <Grid item xs={6}>
        <Button component={Link}
            to={`/users/account/history`}
            color="primary"
            variant="contained"
            size="large"
            sx={{ width: "100%"}}
            >History</Button>
        </Grid>
        <Grid item xs={6}>
        <Button component={Link}
            to={`/users/account/preferences`}
            color="primary"
            variant="contained"
            size="large"
            sx={{ width: "100%"}}
            >Preferences</Button>
        </Grid>
        </Grid>
        </Box>
        </Container>

        </>
    )
}

export default UserAccountPage