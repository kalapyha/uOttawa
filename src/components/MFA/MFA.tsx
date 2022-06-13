import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../Copyrights/Copyrights";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/ContextProvider";
import icon from "../../assets/uOttawa.svg";
import axios from "axios";

export default function Login(): JSX.Element {
  const [showAlert, setShowAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);
  //@ts-ignore context type
  const { logInUser, getUserEmailforMFA } = useGlobalContext();
  const email = getUserEmailforMFA();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post("auth/mfa", {
        code: data.get("code"),
        email: email.userEmail,
      });
      logInUser();
      setRedirect(true);
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
            Invalid email or verification code! Please check your credentials.
          </Alert>
        ) : (
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} src={icon} />
        )}
        <Typography component="h1" variant="h5">
          Multi-factor Authentication
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="MFA code"
            name="code"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
