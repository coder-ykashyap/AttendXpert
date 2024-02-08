const nodemailer = require('nodemailer');

const send_email = async (client,data)=>{
// console.log(typeof(data));
// console.log(data);

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "business.yogeshkashyap@gmail.com",
    pass: "khvq uika yxtx hfmh",
},
});

// Email options
const mailOptions = {
  from: 'abc@gmail.com',
  to: client,
  subject: 'Attendance Report',
  html : data,
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      console.error(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}


module.exports = send_email;
