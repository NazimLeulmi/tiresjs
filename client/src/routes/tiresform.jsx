import React from 'react';
import s from "../css/auth.module.css";
import { Button, Paper, TextField, MenuItem, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Tires from "../assets/tires.svg";


function TiresForm() {

  const TYPES = ["P", "LT", "ST"];
  const CONDITION = ["USED", "NEW", "DAMAGED"]

  const [width, setWidth] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [diameter, setDiameter] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [type, setType] = React.useState(TYPES[0]);
  const [condition, setCondition] = React.useState(CONDITION[0]);
  const [alert, setAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState();
  const [severity, setSeverity] = React.useState("error");
  const history = useHistory();


  let handleWidth = (event) => setWidth(event.target.value);
  let handlePercentage = (event) => setPercentage(event.target.value);
  let handleDiameter = (event) => setDiameter(event.target.value);
  let handleQuantity = (event) => setQuantity(event.target.value);
  let handleType = (event) => setType(event.target.value);
  let handleBrand = (event) => setBrand(event.target.value);
  let handleCondition = (event) => setCondition(event.target.value);
  let triggerAlert = () => setAlert(!alert)

  async function submitForm(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/tires', {
        width, percentage, diameter,
        quantity, brand, condition, type
      });
      if (response.data.error) {
        setAlertText(response.data.error);
        setSeverity("error"); triggerAlert();
        return;
      }
      if (response.data.tires) {
        console.log(response.data.tires);
        setAlertText(`${quantity} tires has been added successfully`);
        setSeverity("success"); triggerAlert();
        setTimeout(() => {
          history.push("/tires");
        }, 2250);
        return;
      }
    } catch (err) { console.log(err) }
  }
  return (
    <div className={s.container}>
      <div className={s.overlay} />
      <Paper component="form" className={s.form} onSubmit={submitForm}>
        <img src={Tires} height="80" alt="car-logo" className={s.img} />
        {/* Feedback / Error Handling */}
        <Snackbar open={alert} autoHideDuration={2000} onClose={triggerAlert}>
          <Alert severity={severity}>
            {alertText}
          </Alert>
        </Snackbar>
        {/* Wheel Dimension */}
        <div className={s.grid}>
          {/* Tire width number field */}
          <TextField
            name="width" label="Width" required type="number"
            value={width} onChange={handleWidth}
            inputProps={{ max: 350, min: 150 }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
            }}
          />
          {/* Aspect ratio number field */}
          <TextField
            name="percentage" label="Percentage" required type="number"
            value={percentage} onChange={handlePercentage}
            inputProps={{ max: 99, min: 30 }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
            }}
          />

          <TextField
            name="diameter" label="Diameter" required type="number"
            value={diameter} onChange={handleDiameter}
            inputProps={{ max: 30, min: 13 }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
            }}
          />
          <TextField
            name="quantity" label="Quantity" required type="number"
            value={quantity} onChange={handleQuantity}
            inputProps={{ max: 5000, min: 1 }}

            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
            }}
          />
          <TextField
            name="brand" label="Brand" required className={s.brand}
            value={brand} onChange={handleBrand} type="text"
            inputProps={{ maxLength: 15 }}
          />
          {/* Wheel Dimension */}
          {/* Tire CONDITION : SELECT */}
          <TextField
            className={s.condition} select
            label="Condition" value={condition} onChange={handleCondition}
          >
            {CONDITION.map((tireCondition) => (
              <MenuItem key={tireCondition} value={tireCondition}>
                {tireCondition}
              </MenuItem>
            ))}
          </TextField>
          {/* Tire CONDITION : SELECT */}
          {/* Tire TYPE : SELECT */}
          <TextField
            className={s.tireCondition} select
            label="Type" value={type} onChange={handleType}
          >
            {TYPES.map((tireType) => (
              <MenuItem key={tireType} value={tireType}>
                {tireType}
              </MenuItem>
            ))}
          </TextField>
          {/* Tire TYPE : SELECT */}
        </div>
        <Button type="submit" fullWidth>ADD TIRES</Button>
      </Paper>

    </div>
  )
}

export default TiresForm;