const express = require('express');
const router = express.Router();
const UserModel = require("../models").UserModel;
const TireModel = require("../models").TireModel;
const randomBytes = require("crypto").randomBytes;
const isNumeric = require("validator").isNumeric;
const isAlpha = require("validator").isAlpha;

function validation(req, res, next) {
  const { width, percentage, diameter,
    type, condition, quantity, brand } = req.body;
  // Tire width validation 
  if (!width) return res.json({ error: "Tire width is required to add tires" })
  else if (!isNumeric(width)) return res.json({ error: "Tire width must be a number" })
  else if (width < 150 || width > 350) {
    return res.json({ error: "Tire width must be 150~350mm" })
  }
  // Tire aspect ratio validation 
  if (!percentage) return res.json({ error: "Tire aspect ratio is required to add tires" })
  else if (!isNumeric(percentage)) return res.json({ error: "Tire percentage must be a number" })
  else if (percentage < 30 || percentage > 99) {
    return res.json({ error: "Tire percentage must be 30~99%" })
  }
  // Wheel diameter validation 
  if (!diameter) return res.json({ error: "Wheel diameter is required to add tires" })
  else if (!isNumeric(diameter)) return res.json({ error: "Wheel diameter must be a number" })
  else if (diameter < 13 || diameter > 30) {
    return res.json({ error: "Wheel diameter must be 13~30 inches" })
  }
  // Tires quantity validation 
  if (!quantity) return res.json({ error: "Tires quantity is required to add tires" })
  else if (!isNumeric(quantity)) return res.json({ error: "Tires quantity must be a number" })
  else if (quantity < 1 || quantity > 5000) return res.json({ error: "Tires quantity must be 1~5000 tires" })
  // Tire type  validation 
  if (!type) return res.json({ error: "Tire type is required to add tires" })
  else if (!isAlpha(type)) return res.json({ error: "Tire type must contain letters only" })
  else if (type.length > 2) return res.json({ error: "Tire type must be 1~2 letters" })
  // Tires condition  validation 
  if (!condition) return res.json({ error: "Tires condition is required to add tires" })
  else if (!isAlpha(condition)) return res.json({ error: "Tires condition must contain letters only" })
  else if (condition.length < 3 || condition.length > 6) return res.json({ error: "Tire type must be 3~6 letters" })
  // Tires brand  validation 
  if (!brand) return res.json({ error: "Tires brand is required to add tires" })
  else if (!isAlpha(brand)) return res.json({ error: "Tires brand must contain letters only" })
  else if (brand.length < 3 || brand.length > 25) return res.json({ error: "Tire brand must be 3~25 letters" })
  next();
}

// Post Tires
router.post("/tires", validation, async (req, res) => {
  const { width, percentage, diameter,
    type, condition, quantity, brand } = req.body;
  try {
    if (!req.session.userId) return console.log("RESTRICTED ROUTE")
    let user = await UserModel.findById(req.session.userId);
    if (!user) return res.json({ error: "RESTRICTED ROUTE" })
    // Add Single tire
    if (parseInt(quantity) === 1) {
      let NewTire = new TireModel({
        width, percentage, diameter, type, group: NULL,
        quantity, brand, condition, group_index: 1,
      })
      let savedTire = await NewTire.save();
      return res.json({ tires: [savedTire] })
    }
    // Add multiple tires
    let buffer = await randomBytes(12);
    let group = buffer.toString("hex");
    let tires = [];
    for (let i = 0; i < quantity; i++) {
      let NewTire = new TireModel({
        width, percentage, diameter, type, group,
        quantity, brand, condition, group_index: i + 1,
      })
      let savedTire = await NewTire.save();
      tires.push(savedTire);
    }
    return res.json({ tires: tires })
  } catch (err) {
    console.log(err);
  }
});

router.get("/tires", async (req, res) => {
  try {
    console.log("getting tires");
    if (!req.session.userId) return console.log("RESTRICTED ROUTE")
    let user = await UserModel.findById(req.session.userId);
    if (!user) return res.json({ error: "RESTRICTED ROUTE" })
    const tires = await TireModel.find();
    return res.json(tires);
  } catch (err) { console.log(err) }
})

module.exports = router;

