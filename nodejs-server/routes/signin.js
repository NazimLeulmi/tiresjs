let express = require("express");
let compare = require("bcrypt").compare;
let isAlphanumeric = require("validator").isAlphanumeric;
let isEmail = require("validator").isEmail;
let isLength = require("validator").isLength;
let isEmpty = require("validator").isEmpty;

let UserModel = require("../models.js").UserModel;
let router = express.Router();




function validation(req, res, next) {
  let { email, password, passwordc } = req.body;
  let errors = {};
  // 1) Email Validation
  if (email === undefined || email === null || isEmpty(email)) {
    errors.email = "The email is required to sign up";
  } else if (!isEmail(email)) {
    errors.email = "The email is invalid";
  } else if (!isLength(email, { min: 8, max: 50 })) {
    errors.email = "The email must be 8~50 characters";
  }
  // 2) Password Validation
  if (password === undefined || password === null || isEmpty(password)) {
    return res.json({ error: "The password is required to sign up" });
    errors.password = "The password is required to sign up";
  } else if (!isAlphanumeric(password)) {
    errors.password = "The password is invalid";
  } else if (!isLength(password, { min: 8, max: 100 })) {
    errors.password = "The password is invalid";
  }
  let isValid = errors && Object.keys(errors).length === 0 && errors.constructor === Object;
  req.validation = { isValid, errors };
  next();
}

router.post("/signin", validation, async (req, res) => {
  try {
    let { isValid, errors } = req.validation;
    if (!isValid) {
      return res.render('signin', {
        errors: errors, email: req.body.email,
        stylesheet: "forms.css", password: req.body.password
      });
    }
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.json({ errors: { password: "Invalid email or password" } })
    const isCorrect = await compare(req.body.password, user.pass);
    if (!isCorrect) return res.json({ errors: { password: "Invalid email or password" } })
    if (!user.active) return res.json({ errors: { password: "Your account is not active" } })
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    return res.json({ success: true })
  } catch (err) {
    throw err;
  }
});

module.exports = router;