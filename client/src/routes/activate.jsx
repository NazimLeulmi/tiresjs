import React from 'react';
import Letter from '../assets/letter.svg';
import { Button, Paper, Typography } from '@material-ui/core'
import { Link } from "react-router-dom";
import s from "../css/activate.module.css";


function Activate() {
  return (
    <>
      <div className={s.overlay} />
      <Paper className={s.paper}>
        <Typography variant="h4" component="h1" className={s.header}>
          Activate Account
        </Typography>
        <p className={s.text}>An activision email was sent to</p>
        <strong className={s.strong}>naz@nazimleulmi.com</strong>
        <p>Please click the link in the email to activate your account</p>
        <img src={Letter} width="150" className={s.img} alt="activate-img" />
        <div className={s.group}>
          <Button component={Link} to="/" variant="outlined" className={s.btn}>HOME</Button>
          <Button component={Link} to="/signin" className={s.btn}>SIGN IN</Button>
        </div>
      </Paper>
    </>
  )
}

export default Activate;