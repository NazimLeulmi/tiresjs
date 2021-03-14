import React from 'react';
import s from "../css/auth.module.css";
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Car from "../assets/car.svg";


function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordc, setPasswordc] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const history = useHistory();

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handlePasswordc(event) {
    setPasswordc(event.target.value);
  }

  async function submitForm(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/signup', { email, password, passwordc });
      if (response.data.success === true) return history.push('/activate');
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
        <TextField
          name="passwordc" label="Password confirmation" required
          value={passwordc} onChange={handlePasswordc} type="password"
          error={errors.passwordc} helperText={errors.passwordc}
        />
        <Button type="submit" fullWidth> SIGN UP</Button>
        <Button variant="text" component={Link} to="/signin" color="default">
          Already have an account ? <span className={s.blue}>SIGN IN</span>
        </Button>
      </Paper>

    </div>
  )
}

export default SignUp;