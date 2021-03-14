const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(link) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.nazimleulmi.com",
      secure: true,
      auth: {
        user: "naz@nazimleulmi.com",
        pass: "CP3exv8AR32cyn",
      },
    });
    // send mail with defined transport object
    transporter.sendMail({
      from: '"Tirejs 👻" <naz@nazimleulmi.com>',
      to: 'naz@nazimleulmi.com',
      subject: "Account Activision",
      html: `
        <p> Click on this link to activate the account </p>
        <a href="${link}">Activision Link</a>
        <p>
          Inventory management saves you money and allows you to fulfill your
          customers' needs. In other words, it enables successful cost control of
          operations. Knowing what you have, what is in your warehouse, and
          how to manage the supply chain properly is the backbone of business.
        </p>
    `,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = main;
