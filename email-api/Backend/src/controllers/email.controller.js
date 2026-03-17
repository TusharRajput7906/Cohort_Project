import transporter from "../config/mail.config.js";

export async function sendEmail(req, res) {
  const { to, subject, text } = req.body;
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "Email send Successfully",
    });
  } catch (err) {
     console.log(err);
    res.status(500).json({
      message: "Email sending failed",
    });
  }
}
