let express = require("express");
let isAlphanumeric = require("validator").isAlphanumeric;
let isLength = require("validator").isLength;
let isEmpty = require("validator").isEmpty;

let UserModel = require("../models").UserModel;
let router = express.Router();


function validation(req, res, next) {
  let {token} = req.body;
  if (token === undefined || token === null || isEmpty(token)) {
    return res.json({ error: "The token is required to activate the account" });
  } else if (!isAlphanumeric(token)) {
    return res.json({ error: "The token must be alphanumeric" });
  } else if (!isLength(token, { min: 96, max: 96 })) {
    return res.json({ error: "The token must be 96 characters" });
  }
  next();
}

// Activate User Account
router.put("/activate", validation, async (req, res) => {
  try {
    let user = await UserModel.findOneAndUpdate(
      { token: req.body.token },
      { token: null, active: true }
    );
    if (!user) return res.json({ error: "The token is invalid" });
    return res.json({ activated: true, email: user.email })
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;