const nodemailer = require("nodemailer");
const { google } = require("googleapis");

//OAuth2 authentication
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

//email to students with certificate
const sendEmail = async (email) => {
  try {
    //transporter object
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      secure: false,
    });

    //details of email
    let mailOptions = {
      sender: "QKUM",
      from: "edaisaku0@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<h3>Hello !</h3>
             <br/>
             <p>We're sending your certificate so you can download anytime.</p>
             `,
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendEmail };
