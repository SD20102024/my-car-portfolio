//
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 📩 API endpoint to send email
app.post("/send-contact", async (req, res) => {
    const { contactName, contactNumber } = req.body;

    // Setup Nodemailer transporter with Gmail
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "psinathd@gmail.com",         // replace with your Gmail
            pass: "oxdr gajz uslb rmrw",      // replace with App Password
        },
    });

    // Define email content
    let mailOptions = {
        from: "psinathd@gmail.com",
        to: "psinathd@gmail.com",             // recipient (can be your same Gmail or another)
        subject: "New Contact Form Submission",
        text: `You received a new contact:\n\nName: ${contactName}\nPhone: ${contactNumber}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Email send failed:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`📡 Server running on port ${PORT}`));
