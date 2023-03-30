import { Link } from "react-router-dom";
import { Container, Box, Typography, Button, TextField, Grid } from '@mui/material';
import RegisterForm from "./RegisterForm";

export default function RegisterPage({setUser}) {

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
          <Typography component="h1" variant="h5" align="center">
            Sign Up
          </Typography>
          <RegisterForm setUser={setUser} />
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" align="center">
                Already have an account?
              </Typography>
            </Grid>
          </Grid>
          <Button
            component={Link}
            to="/users/login"
            color="primary"
            variant="outlined"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </Box>
      </Container>
    );
}