const express = require('express');
const router = express.Router();

// Get all tires
router.get('/tires', function (req, res) {
  res.render('tires', { stylesheet: 'tires.css', path: "/tires" });
});

// Post Tires
router.post("/tires", async (req, res) => {
  const { width, percentage, wheel,
    letter, condition, index, count, brand } = req.body;
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

