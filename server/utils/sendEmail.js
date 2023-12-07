const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "physix.app24@gmail.com",
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: "physix.app24@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email sent error: " + error);
  }
};
