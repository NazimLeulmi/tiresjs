import React from 'react';
import "./assets/auth.css";
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";


function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordc, setPasswordc] = React.useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handlePasswordc(event) {
    setPasswordc(event.target.value);
  }

  return (
    <Paper component="form">
      <div className="overlay" />
      <Typography variant="h4" component="h1" color="primary">
        Create an account
      </Typography>
      <TextField
        name="email" label="Email" required
        value={email} onChange={handleEmail}
      />
      <TextField
        name="password" label="Password" required
        value={password} onChange={handlePassword}
      />
      <TextField
        name="passwordc" label="Password confirmation" required
        value={passwordc} onChange={handlePasswordc}
      />
      <Button type="submit" fullWidth> SIGN UP</Button>
      <Button variant="text" component={Link} to="/signin" color="default">
        Already have an account ? <span id="blue">SIGN IN</span>
      </Button>
    </Paper>
  )
}

export default SignUp;