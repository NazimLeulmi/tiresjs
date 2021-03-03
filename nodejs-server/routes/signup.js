let express = require("express");
let hash = require("bcrypt").hash;
let randomBytes = require("crypto").randomBytes;
let sendMail = require("./mail");
let isAlphanumeric = require("validator").isAlphanumeric;
let isEmail = require("validator").isEmail;
let isLength = require("validator").isLength;
let isEmpty = require("validator").isEmpty;

let UserModel = require("../models").UserModel;
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
  } else if (passwordc === undefined || isEmpty(passwordc)) {
    errors.passwordc = "The password confirmation is required to sign up";
  } else if (!isAlphanumeric(password)) {
    errors.password = "The password must be alphanumeric";
  } else if (!isLength(password, { min: 8, max: 100 })) {
    errors.password = "The password must be 8~100 characters";
  }
  if (passwordc && password && password !== passwordc) {
    errors.passwordc = "The password confirmation doesn't match";
  }
  let isValid = errors && Object.keys(errors).length === 0 && errors.constructor === Object;
  req.validation = { isValid, errors };
  next();
}

router.post("/signup", validation, async (req, res) => {
  try {
    let { isValid, errors } = req.validation;
    if (!isValid) return res.json({ errors: errors });
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) return res.json({ errors: { email: "The email address is taken" } });
    let hashed = await hash(req.body.password, 10);
    let buffer = await randomBytes(48);
    let token = buffer.toString("hex");
    user = new UserModel({
      email: req.body.email,
      pass: hashed,
      token: token,
    });
    let userSaved = await user.save();
    let url = "http://localhost:2323/activate/" + token;
    let mailres = await sendMail(url);
    req.session.activate = user.email;
    return res.json({ success: true });
  } catch (err) {
    throw err;
  }
});
module.exports = router;