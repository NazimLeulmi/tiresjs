import React, { useEffect } from 'react';
import Letter from '../assets/activated.svg';
import { Button, Paper, Typography } from '@material-ui/core'
import { Link, useHistory, useParams } from "react-router-dom";
import s from "../css/activate.module.css";
import axios from "axios";


function Activated() {
  let { token } = useParams();
  let history = useHistory();

  async function activate() {
    console.log(token);
    if (!token) history.push("/");
    try {
      const response = await axios.put("/activate", { token })
      if (response.data.error) history.push("/")
    } catch (err) { console.log(err) }
  }

  useEffect(() => {
    activate();
  })

  return (
    <>
      <div className={s.overlay} />
      <Paper className={s.paper}>
        <Typography variant="h4" component="h1" className={s.header}>
          Activate Account
        </Typography>
        <p>Your account has been activated</p>
        <img src={Letter} width="160" className={s.img} alt="activated-img" />
        <div className={s.group}>
          <Button component={Link} to="/" variant="outlined" className={s.btn}>HOME</Button>
          <Button component={Link} to="/signin" className={s.btn}>SIGN IN</Button>
        </div>
      </Paper>
    </>
  )
}

export default Activated;