const contactSchema = require("../validations/contactValidation");
const nodemailer = require("nodemailer");
const Contact = require('../models/contact');

const sendContactMessage = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, message } = req.body;

    //first thing we will need to save it into the database first
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    //and then sending email to me with this message
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      replyTo: email,               
      to: process.env.EMAIL_USER,   
      subject: `[Message from contact me on your website]`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: "Message sent and saved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports={sendContactMessage};