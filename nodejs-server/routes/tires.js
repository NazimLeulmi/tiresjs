const express = require('express');
const router = express.Router();
const UserModel = require("../models").UserModel;



// Post Tires
router.post("/add-tires", async (req, res) => {
  const { width, percentage, wheel,
    letter, condition, quantity, brand } = req.body;
  try {
    if (!req.session.userId) return res.json({ error: "RESTRICTED ROUTE" })
    let user = await UserModel.findById(req.session.userId);
    if (!user) return res.json({ error: "RESTRICTED ROUTE" })
    // CREATE TIRE / TIRES
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

