import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography } from '@material-ui/core';
import Car from "../assets/car.svg";
import Tires from "../assets/tires.svg";
import s from "../css/tires.module.css";



export default function Bar() {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <img src={Tires} height="40" className={s.logo} />
        <Typography variant="h6" className={s.header}>LEUTIRES</Typography>
        <img src={Car} height="65" className={s.car} />
      </Toolbar>
    </AppBar>
  );
}