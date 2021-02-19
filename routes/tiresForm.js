let express = require("express");
let router = express.Router();
let UserModel = require("./models").UserModel;

// CHECK AUTH GET ROUTE
router.post("/tiresForm", async (req, res) => {
  const { width, percentage, wheel,
    letter, condition, index, count, brand } = req.body;
  try {
    if (!req.session.userId) return res.json({ error: "RESTRICTED ROUTE" })
    let user = await UserModel.findById(req.session.userId);
    if (!user) return res.json({ error: "RESTRICTED ROUTE" })
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;