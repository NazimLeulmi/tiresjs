import React from 'react';
import Car from './assets/car.svg';
import Logo from './assets/tires.svg';
import "./assets/home.css";
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";


function Home() {
  return (
    <main >
      <section>
        <header>
          <img src={Logo} alt="Brand Logo" height={50} />
          <h2>LEUTIRES</h2>
        </header>
        <h1>Inventory management</h1>
        <p>
          Inventory management saves you money and allows you to fulfill your
          customers' needs. In other words, it enables successful cost control of
          operations. Knowing what you have, what is in your warehouse, and
          how to manage the supply chain properly is the backbone of business.
        </p>
        <Button component={Link} to="/signin">GET STARTED</Button>
      </section>
      <aside>
        <img src={Car} alt="car" width="80%" />
      </aside>
    </main>
  )
}

export default Home;