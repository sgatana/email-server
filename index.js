const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.post('/send', (req, res) => {
  const { body } = req;
  try {
    const msg = {
      to: process.env.CAMPANY_EMAIL,
      from: body.email,
      subject: body.subject,
      html: `<p>Hello ${process.env.CAMPANY_NAME}, <br />
      I am <strong>${body.name}</strong>. ${body.message}</p>`
    };
    sgMail.send(msg);
    res.json({
      message: 'email sent'
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {});
