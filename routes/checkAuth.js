let express = require("express");
let router = express.Router();
let UserModel = require("./models").UserModel;

// CHECK AUTH GET ROUTE
router.get("/checkAuth", async (req, res) => {
  try {
    console.log("Checking Auth")
    if (!req.session.userId) return res.json({ auth: false });
    let user = await UserModel.findById(req.session.userId);
    if (user) return res.json({ auth: true })
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;