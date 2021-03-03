import React from 'react';
import "./assets/auth.css";
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";


function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <Paper component="form">
      <div className="overlay" />
      <Typography variant="h4" component="h1" color="primary">
        Sign in
      </Typography>
      <TextField
        name="email" label="Email" required
        value={email} onChange={handleEmail}
      />
      <TextField
        name="password" label="Password" required
        value={password} onChange={handlePassword}
      />
      <Button type="submit" fullWidth> SIGN IN</Button>
      <Button variant="text" component={Link} to="/signup" color="default">
        Don't have an account ? <span id="blue">SIGN UP</span>
      </Button>
    </Paper>
  )
}

export default SignIn;