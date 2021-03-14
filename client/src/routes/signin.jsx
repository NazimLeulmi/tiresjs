import React from 'react';
import s from "../css/auth.module.css";
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Car from "../assets/car.svg";


function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const history = useHistory();

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function submitForm(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/signin', { email, password });
      if (response.data.success === true) return history.push('/tires');
      setErrors(response.data.errors);
      return;
    } catch (err) { console.log(err) }
  }
  return (
    <div className={s.container}>
      <div className={s.overlay} />
      <Paper component="form" className={s.form} onSubmit={submitForm}>
        <img src={Car} height="80" alt="car-logo" className={s.img} />
        <TextField
          name="email" label="Email" required type="email"
          value={email} onChange={handleEmail}
          error={errors.email} helperText={errors.email}
        />
        <TextField
          name="password" label="Password" required type="password"
          value={password} onChange={handlePassword}
          error={errors.password} helperText={errors.password}
        />
        <Button type="submit" fullWidth> SIGN IN</Button>
        <Button variant="text" component={Link} to="/signup" color="default">
          Don't have an account ? <span className={s.blue}>SIGN UP</span>
        </Button>
      </Paper>

    </div>
  )
}

export default SignIn;