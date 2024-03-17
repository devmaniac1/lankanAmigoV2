import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { Typography, TextField } from "@mui/material";
// import TextField from "@mui/material/TextField";
import "./App.css";
import LoginBgImg from "./images/login1.png";

import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

function Login() {
  const [signUp, setSignUp] = useState(true);

  const handleSignPage = () => {
    setSignUp(!signUp);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${LoginBgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Container
        sx={{
          width: "70%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            minWidth: 275,
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Katibeh", serif',
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "8rem",
              color: "WHITE",
              mx: 8,
            }}
          >
            Lankan Amigo
          </Typography>
          <Card variant="outlined" sx={{ width: "25vw", pb: 4, my: 4, mx: 8 }}>
            {signUp ? (
              <SignUp handleSignPage={handleSignPage} />
            ) : (
              <SignIn handleSignPage={handleSignPage} />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
}

const defaultTheme = createTheme();

function SignIn({ handleSignPage }) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const { email, password } = this.state;
    try {
      const userData = new FormData(event.currentTarget);
      const email = userData.get("email");
      const password = userData.get("password");
      console.log(email, password);
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log("Ok Logged");
      // Redirect or set authenticated state
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "green" }}
            >
              Sign In
            </Button>
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  <p onClick={handleSignPage}>Don't have an account? Sign Up</p>
                </Link>
              </Grid>

              {/* Back To Home Link in Sign Up Page */}

              <Grid item>
                <Link
                  href="/"
                  variant="Itinerary"
                  style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
                >
                  Back to home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function SignUp({ handleSignPage }) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { firstName, lastName, email, password } = this.state;
    try {
      const data = new FormData(event.currentTarget);
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const email = data.get("email");
      const password = data.get("password");
      console.log(firstName, lastName, email, password);
      // const response = await fetch("http://localhost:3001/api/users/signUp", {
      const response = await fetch(
        "https://us-central1-lankanamigo.cloudfunctions.net/api/api/users/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ firstName, lastName, email, password }),
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      // Optionally, handle successful signup, e.g., show success message
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "green" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Link href="#" variant="body2">
                  <p onClick={handleSignPage}>
                    Already have an account? Sign in
                  </p>
                </Link>
              </Grid>

              {/* Back To Home Link in Sign Up Page */}

              <Grid item>
                <Link
                  href="/"
                  variant="Itinerary"
                  style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
                >
                  Back to home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
