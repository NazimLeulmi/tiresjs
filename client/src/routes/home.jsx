import React from 'react';
import Car from '../assets/car.svg';
import Logo from '../assets/tires.svg';
import s from "../css/home.module.css";
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";


function Home() {
  return (
    <main className={s.grid} >
      <section className={s.intro}>
        <header className={s.logo}>
          <img src={Logo} alt="Brand Logo" height={50} />
          <h2 className={s.brand}>LEUTIRES</h2>
        </header>
        <h1 className={s.header}>Inventory management</h1>
        <p className={s.text}>
          Inventory management saves you money and allows you to fulfill your
          customers' needs. In other words, it enables successful cost control of
          operations. Knowing what you have, what is in your warehouse, and
          how to manage the supply chain properly is the backbone of business.
        </p>
        <Button component={Link} to="/signin" className={s.btn}>GET STARTED</Button>
      </section>
      <aside className={s.side}>
        <img src={Car} alt="car" width="80%" />
      </aside>
    </main>
  )
}

export default Home;