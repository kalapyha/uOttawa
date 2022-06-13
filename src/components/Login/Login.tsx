import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import Copyright from "../Copyrights/Copyrights";
import { Link, Navigate } from "react-router-dom";
import icon from "../../assets/uOttawa.svg";
import { isValidEmail } from "../../utils/helpers";
import { useGlobalContext } from "../../context/ContextProvider";
import { Challenge } from "../../types";
import axios from "axios";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [redirectToMFA, setRedirectToMFA] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //@ts-ignore context type
  const { logInUser, saveUserEmailforMFA } = useGlobalContext();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsCorrectEmail(isValidEmail(email));
  };

  // Need to handle in case user chose an email from the previous entered options
  const handleBlurChange = () => {
    setIsCorrectEmail(isValidEmail(email));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    try {
      const response = await axios.post("auth", {
        email,
        password,
      });

      // Redirects
      if (
        response.data.challenge === Challenge.MFA &&
        !response.data.identity
      ) {
        saveUserEmailforMFA(email);
        setRedirectToMFA(true);
      } else {
        logInUser();
        setRedirect(true);
      }
    } catch (error) {
      // Handle 400
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  if (redirect) {
    return <Navigate to="/portal" />;
  }

  if (redirectToMFA) {
    return <Navigate to="/auth/mfa" />;
  }

  return (
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
        {showAlert ? (
          <Alert variant="filled" severity="error">
            Invalid email or password! Please check your credentials.
          </Alert>
        ) : (
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={icon} />
        )}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!isCorrectEmail}
            helperText={!isCorrectEmail ? "Incorrect entry." : ""}
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlurChange}
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
            sx={{ mt: 3, mb: 1 }}
            disabled={!isCorrectEmail}
          >
            Sign In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled
            sx={{ mt: 1, mb: 1 }}
            endIcon={<GoogleIcon />}
          >
            Sign In with google
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled
            sx={{ mt: 1, mb: 3 }}
            endIcon={<EmailIcon />}
          >
            Sign In with microsoft
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/reset">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                <Typography
                  variant="body1"
                  color="darkblue"
                  sx={{ textTransform: "capitalize" }}
                >
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
